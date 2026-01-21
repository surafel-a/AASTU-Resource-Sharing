import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoutes);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;