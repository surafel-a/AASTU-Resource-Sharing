import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import Report from "../models/report.model.js";

// ─── SUBMIT A REPORT (user) ───────────────────────────────────────────────────
// POST /api/v1/reports
export const createReport = async (req, res, next) => {
  try {
    const { targetType, targetId, reason, description } = req.body;

    const report = await Report.create({
      reportedBy: req.user?._id || null, // null = anonymous
      targetType,
      targetId,
      reason,
      description: description || "",
    });

    res.status(201).json({
      status: "success",
      data: { report },
    });
  } catch (error) {
    // Unique index violation — user already reported this content
    if (error.code === 11000) {
      return next(new AppError("You have already reported this content.", 409));
    }
    return next(new AppError(error.message, 500));
  }
};

// ─── GET ALL REPORTS (admin) ──────────────────────────────────────────────────
// GET /api/v1/reports
// Supports: ?status=New&targetType=Resource&sort=-createdAt&page=1&limit=10
export const getAllReports = async (req, res, next) => {
  try {
    const features = new APIFeatures(Report.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const reports = await features.query
      .populate("reportedBy", "name universityId department photo")
      .populate("resolvedBy", "name")
      .populate({
        path: "targetId",
        // populate both possible refs — only one will resolve per report
        select: "title name content universityId",
      });

    const total = await Report.countDocuments(
      new APIFeatures(Report.find(), req.query).filter().query.getFilter(),
    );

    res.status(200).json({
      status: "success",
      results: reports.length,
      total,
      data: { reports },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── GET SINGLE REPORT (admin) ────────────────────────────────────────────────
// GET /api/v1/reports/:id
export const getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("reportedBy", "name universityId department photo")
      .populate("resolvedBy", "name")
      .populate({
        path: "targetId",
        select: "title name content universityId",
      });

    if (!report) {
      return next(new AppError("No report found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { report },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── UPDATE REPORT STATUS (admin) ────────────────────────────────────────────
// PATCH /api/v1/reports/:id/status
// body: { status: "Under Review" | "Resolved" | "Dismissed", resolutionNote: "..." }
export const updateReportStatus = async (req, res, next) => {
  try {
    const { status, resolutionNote } = req.body;

    const allowedStatuses = ["New", "Under Review", "Resolved", "Dismissed"];
    if (!allowedStatuses.includes(status)) {
      return next(new AppError("Invalid status value", 400));
    }

    const updateData = { status };

    // If resolving or dismissing, record who did it and when
    if (status === "Resolved" || status === "Dismissed") {
      updateData.resolvedBy = req.user._id;
      updateData.resolvedAt = new Date();
      updateData.resolutionNote = resolutionNote || "";
    }

    const report = await Report.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("reportedBy", "name universityId");

    if (!report) {
      return next(new AppError("No report found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { report },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── DELETE REPORT (admin) ────────────────────────────────────────────────────
// DELETE /api/v1/reports/:id
export const deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return next(new AppError("No report found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── GET REPORT STATS (admin dashboard) ──────────────────────────────────────
// GET /api/v1/reports/stats
// Returns: total active, high priority count, resolved today
export const getReportStats = async (req, res, next) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [activeCount, highPriorityCount, resolvedTodayCount] =
      await Promise.all([
        // Total active = New + Under Review
        Report.countDocuments({ status: { $in: ["New", "Under Review"] } }),

        // High priority = Harassment + Inappropriate Content that are still New
        Report.countDocuments({
          status: "New",
          reason: { $in: ["Harassment", "Inappropriate Content"] },
        }),

        // Resolved today
        Report.countDocuments({
          status: { $in: ["Resolved", "Dismissed"] },
          resolvedAt: { $gte: todayStart },
        }),
      ]);

    const totalResolved = await Report.countDocuments({
      status: { $in: ["Resolved", "Dismissed"] },
    });

    const efficiencyRate =
      totalResolved + activeCount > 0
        ? Math.round((totalResolved / (totalResolved + activeCount)) * 100)
        : 0;

    res.status(200).json({
      status: "success",
      data: {
        activeReports: activeCount,
        highPriority: highPriorityCount,
        resolvedToday: resolvedTodayCount,
        efficiencyRate,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
