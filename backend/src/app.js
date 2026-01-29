import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import reviewRouter from './routes/review.routes.js';
import resourceRouter from './routes/resource.routes.js';
import bookmarkRouter from './routes/bookmark.routes.js';

import { globalErrorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/resources', resourceRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookmarks', bookmarkRouter);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;