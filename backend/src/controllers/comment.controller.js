import AppError from "../utils/appError.js";
import Comment from "../models/comment.model.js";

// ─── GET ALL COMMENTS FOR A RESOURCE ─────────────────────────────────────────
// GET /api/v1/comments/:resourceId
// Returns only top-level comments; replies are fetched separately
export const getComments = async (req, res, next) => {
  try {
    const { resourceId } = req.params;

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({
      resource: resourceId,
      parentComment: null, // top-level only
      isDeleted: false,
    })
      .populate("author", "name photo department")
      .populate("replyCount") // virtual count of replies
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({
      resource: resourceId,
      parentComment: null,
      isDeleted: false,
    });

    res.status(200).json({
      status: "success",
      results: comments.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: { comments },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── GET REPLIES FOR A COMMENT ────────────────────────────────────────────────
// GET /api/v1/comments/:commentId/replies
export const getReplies = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const replies = await Comment.find({
      parentComment: commentId,
      isDeleted: false,
    })
      .populate("author", "name photo department")
      .sort({ createdAt: 1 }); // oldest first for replies

    res.status(200).json({
      status: "success",
      results: replies.length,
      data: { replies },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── CREATE COMMENT ───────────────────────────────────────────────────────────
// POST /api/v1/comments/:resourceId
export const createComment = async (req, res, next) => {
  try {
    const { resourceId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return next(new AppError("Comment content cannot be empty", 400));
    }

    const comment = await Comment.create({
      resource: resourceId,
      author: req.user._id,
      content: content.trim(),
      parentComment: null,
    });

    // Populate author before returning so frontend can display immediately
    await comment.populate("author", "name photo department");

    res.status(201).json({
      status: "success",
      data: { comment },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── CREATE REPLY ─────────────────────────────────────────────────────────────
// POST /api/v1/comments/:commentId/replies
export const createReply = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return next(new AppError("Reply content cannot be empty", 400));
    }

    // Make sure the parent comment exists and isn't deleted
    const parentComment = await Comment.findById(commentId);
    if (!parentComment || parentComment.isDeleted) {
      return next(new AppError("No comment found with that ID", 404));
    }

    // Replies can only be one level deep — no reply-to-a-reply
    if (parentComment.parentComment) {
      return next(new AppError("Cannot reply to a reply", 400));
    }

    const reply = await Comment.create({
      resource: parentComment.resource,
      author: req.user._id,
      content: content.trim(),
      parentComment: commentId,
    });

    await reply.populate("author", "name photo department");

    res.status(201).json({
      status: "success",
      data: { reply },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── TOGGLE LIKE / DISLIKE ON A COMMENT ──────────────────────────────────────
// POST /api/v1/comments/:commentId/react
// body: { reaction: "like" | "dislike" }
export const toggleCommentReaction = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { reaction } = req.body;
    const userId = req.user._id;

    if (!["like", "dislike"].includes(reaction)) {
      return next(new AppError('Reaction must be "like" or "dislike"', 400));
    }

    const comment = await Comment.findById(commentId);
    if (!comment || comment.isDeleted) {
      return next(new AppError("No comment found with that ID", 404));
    }

    const hasLiked = comment.likes.includes(userId);
    const hasDisliked = comment.dislikes.includes(userId);

    if (reaction === "like") {
      if (hasLiked) {
        // Toggle off like
        comment.likes.pull(userId);
      } else {
        comment.likes.push(userId);
        comment.dislikes.pull(userId); // remove dislike if switching
      }
    } else {
      if (hasDisliked) {
        // Toggle off dislike
        comment.dislikes.pull(userId);
      } else {
        comment.dislikes.push(userId);
        comment.likes.pull(userId); // remove like if switching
      }
    }

    await comment.save();

    res.status(200).json({
      status: "success",
      data: {
        likes: comment.likes.length,
        dislikes: comment.dislikes.length,
        userReaction: comment.likes.includes(userId)
          ? "like"
          : comment.dislikes.includes(userId)
            ? "dislike"
            : null,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// ─── DELETE COMMENT (soft delete) ────────────────────────────────────────────
// DELETE /api/v1/comments/:commentId
// Owner or admin can delete
export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment || comment.isDeleted) {
      return next(new AppError("No comment found with that ID", 404));
    }

    // Only the author or an admin can delete
    const isAuthor = comment.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return next(
        new AppError("You do not have permission to delete this comment", 403),
      );
    }

    // Soft delete — keeps it in DB but hides from users
    comment.isDeleted = true;
    comment.content = "[This comment has been removed]";
    await comment.save();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
