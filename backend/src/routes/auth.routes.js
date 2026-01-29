import express from 'express';

import { changePassword, forgotPassword, login, logout, register, resetPassword } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.post('/change-password', protect, changePassword);

router.post('/api/v1/auth/forget-password', protect, forgotPassword);
router.patch('/api/v1/auth/reset-password/:token', protect, resetPassword);



export default router;