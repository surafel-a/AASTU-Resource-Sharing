import crypto from "crypto";

import AppError from "../utils/appError.js";
import createSendToken from "../utils/createSendToken.js";
import sendEmail from "../utils/email.js";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      universityId: req.body.universityId,
      phoneNumber: req.body.phoneNumber,
      yearOfStudy: req.body.yearOfStudy,
      department: req.body.department
    });

    createSendToken(newUser, 201, res);

  } catch (err) {
    next(err);
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password){
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if(!user || !(await user.correctPassword(password, user.password))){
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
}

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ status: 'success' })
}

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if(!user){
    return next(new AppError('No user found with that email', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;
  const message = `
    Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n If you didn\'t forget your password, please ignore this email!
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Reset token sent to email!'
    })
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(error);

    return next(new AppError('Email counld not be sent. Try again later.', 500));
  }
}

export const resetPassword = async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if(!user){
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
}

export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if(!(await user.correctPassword(req.body.currentPassword, user.password))){
      return next(new AppError('Your current password is wrong.', 401));
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();

    createSendToken(user, 200, res);
    
  } catch (error) {
     return next(new AppError('Failed to change password', 500));
  }
}