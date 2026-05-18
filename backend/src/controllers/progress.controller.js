import Progress from "../models/progress.model.js";

// SAVE / UPDATE PROGRESS
export const saveProgress = async (req, res) => {
  try {
    const { resourceId, progress, totalPages } = req.body;

    const updatedProgress = await Progress.findOneAndUpdate(
      {
        user: req.user._id,
        resource: resourceId,
      },
      {
        $set: {
          progress,
          ...(totalPages && { totalPages }),
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        progress: updatedProgress,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET ALL USER PROGRESS
export const getAllProgress = async (req, res) => {
  try {
    const progresses = await Progress.find({
      user: req.user._id,
    }).populate("resource");

    res.status(200).json({
      status: "success",
      results: progresses.length,
      data: {
        progresses,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET SINGLE RESOURCE PROGRESS
export const getSingleProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user._id,
      resource: req.params.resourceId,
    });

    res.status(200).json({
      status: "success",
      data: {
        progress,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// DELETE progress by resource (used when resource is deleted)
export const deleteProgressByResource = async (req, res) => {
  try {
    const { resourceId } = req.params;

    await Progress.deleteMany({
      resource: resourceId,
    });

    res.status(200).json({
      status: "success",
      message: "Progress deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
