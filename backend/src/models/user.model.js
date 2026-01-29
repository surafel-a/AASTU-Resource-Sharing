import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(el){
        const regex = /^[a-z]+(\.[a-z]+)@aastustudent\.edu\.et$/;
        return regex.test(el);
      },
      message: "Email must be a valid university email (e.g. abebe.kebede@aastustudent.edu.et)"
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el){
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  universityId: {
    type: String,
    required: [true, 'Please provide your university ID'],
    unique: true,
    match: [/^ETS\d+\/\d{2}$/, 'Please provide a valid university ID (e.g., ETS1234/14)'],
  },
  phoneNumber: {
    type: String, // Stored as string to preserve leading zeros and to match specific formats
    required: [true, 'Please provide your phone number'],
    unique: true,
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
  },
  yearOfStudy: {
    type: Number,
    required: [true, 'Please provide your year of study'],
    min: [1, 'Year of study must be at least 1'],
    max: [6, 'Year of study cannot be more than 6']
  },
  department: {
    type: String,
    required: [true, 'Please provide your department'],
    enum: {
      values: ['Electrical Engineering', 'Electromechanical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Software Engineering', 'Environmental Engineering', 'Architecture', 'Mining Engineering', 'Biotechnology', 'Food Science'],
      message: 'Please select a valid department'
    }
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  photo: {
    type: String,
    default: ''
  },
  photoId: {
    type: String,
    default: ''
  },
  passwordResetToken: String,
  passwordResetExpires: Date
}, { timestamps: true });

userSchema.pre('save', async function(){
  if(!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}

const User = mongoose.model('User', userSchema);

export default User;