import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import reviewRouter from "./routes/review.routes.js";
import resourceRouter from "./routes/resource.routes.js";
import bookmarkRouter from "./routes/bookmark.routes.js";
import progressRouter from "./routes/progress.routes.js";
import commentRouter from "./routes/comment.routes.js";
import reportRouter from "./routes/report.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import adminSettingsRouter from "./routes/adminSettings.routes.js";

import { globalErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/resources", resourceRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/reports", reportRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/admin/settings", adminSettingsRouter);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
