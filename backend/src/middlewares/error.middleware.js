import AppError from "../../utils/appError.js";

export const globalErrorHandler = (err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Mogoose Validation Error
  if(err.name === 'ValidationError'){
    const messages = Object.values(err.errors).map(el => el.message).join(', ');
    err = new AppError(messages, 400);
  }

  console.log(err)
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}