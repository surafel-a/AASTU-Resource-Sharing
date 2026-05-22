import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faReply,
  faTrash,
  faSpinner,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpRegular,
  faThumbsDown as faThumbsDownRegular,
} from "@fortawesome/free-regular-svg-icons";
import { useComment } from "../contexts/CommentContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const formatRelativeTime = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const CommentItem = ({ comment, onDelete }) => {
  const { getReplies, createReply, toggleCommentReaction } = useComment();
  const { user, isAuthenticated } = useAuth();

  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);

  // Local like/dislike counts so UI updates instantly
  const [likes, setLikes] = useState(comment.likes?.length ?? 0);
  const [dislikes, setDislikes] = useState(comment.dislikes?.length ?? 0);
  const [userReaction, setUserReaction] = useState(
    comment._userReaction ??
      (comment.likes?.some((id) => id === user?._id || id?._id === user?._id)
        ? "like"
        : comment.dislikes?.some(
              (id) => id === user?._id || id?._id === user?._id,
            )
          ? "dislike"
          : null),
  );

  const replyCount = comment.replyCount ?? 0;
  const isOwner = user?._id === (comment.author?._id || comment.author);
  const isAdmin = user?.role === "admin";

  const handleToggleReplies = async () => {
    if (!showReplies && replies.length === 0) {
      setRepliesLoading(true);
      try {
        const fetched = await getReplies(comment._id);
        setReplies(fetched);
      } catch {
        toast.error("Failed to load replies");
      } finally {
        setRepliesLoading(false);
      }
    }
    setShowReplies((prev) => !prev);
  };

  const handleReaction = async (reaction) => {
    if (!isAuthenticated) {
      toast.info("Please log in to react");
      return;
    }
    try {
      const result = await toggleCommentReaction(comment._id, reaction);
      setLikes(result.likes);
      setDislikes(result.dislikes);
      setUserReaction(result.userReaction);
    } catch {
      toast.error("Failed to save reaction");
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    setReplySubmitting(true);
    try {
      const newReply = await createReply(comment._id, replyText.trim());
      setReplies((prev) => [...prev, newReply]);
      setShowReplies(true);
      setReplyText("");
      setReplyOpen(false);
      toast.success("Reply posted!");
    } catch {
      toast.error("Failed to post reply");
    } finally {
      setReplySubmitting(false);
    }
  };

  return (
    <div className="group">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#1152D4] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {comment.author?.photo ? (
            <img
              src={comment.author.photo}
              alt={comment.author.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            (comment.author?.name?.charAt(0).toUpperCase() ?? "?")
          )}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          {/* Name + time */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold text-sm">
              {comment.author?.name ?? "Anonymous"}
            </span>
            <span className="text-white/30 text-xs">
              {formatRelativeTime(comment.createdAt)}
            </span>
            {comment.author?.department && (
              <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
                {comment.author.department}
              </span>
            )}
          </div>

          {/* Content */}
          <p className="text-white/80 text-sm leading-relaxed mb-3">
            {comment.content}
          </p>

          {/* Actions row */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Like */}
            <button
              onClick={() => handleReaction("like")}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer
                ${
                  userReaction === "like"
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-white/40 hover:text-blue-400 hover:bg-blue-600/10"
                }`}
            >
              <FontAwesomeIcon
                icon={userReaction === "like" ? faThumbsUp : faThumbsUpRegular}
              />
              <span>{likes}</span>
            </button>

            {/* Dislike */}
            <button
              onClick={() => handleReaction("dislike")}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer
                ${
                  userReaction === "dislike"
                    ? "bg-red-600/20 text-red-400"
                    : "text-white/40 hover:text-red-400 hover:bg-red-600/10"
                }`}
            >
              <FontAwesomeIcon
                icon={
                  userReaction === "dislike"
                    ? faThumbsDown
                    : faThumbsDownRegular
                }
              />
              <span>{dislikes}</span>
            </button>

            {/* Reply */}
            {isAuthenticated && (
              <button
                onClick={() => setReplyOpen((p) => !p)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <FontAwesomeIcon icon={faReply} />
                Reply
              </button>
            )}

            {/* Show replies */}
            {replyCount > 0 && (
              <button
                onClick={handleToggleReplies}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-all cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={showReplies ? faChevronUp : faChevronDown}
                />
                {showReplies
                  ? "Hide"
                  : `${replyCount} repl${replyCount === 1 ? "y" : "ies"}`}
              </button>
            )}

            {/* Delete */}
            {(isOwner || isAdmin) && (
              <button
                onClick={() => onDelete(comment._id)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all ml-auto cursor-pointer opacity-0 group-hover:opacity-100"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>

          {/* Reply input */}
          {replyOpen && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
                placeholder="Write a reply..."
                className="flex-1 bg-gray-800 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleReplySubmit}
                disabled={replySubmitting || !replyText.trim()}
                className="px-4 py-2 bg-[#1152D4] text-white text-sm font-bold rounded-xl disabled:opacity-40 hover:bg-blue-700 transition cursor-pointer"
              >
                {replySubmitting ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  "Post"
                )}
              </button>
            </div>
          )}

          {/* Replies list */}
          {showReplies && (
            <div className="mt-4 pl-4 border-l border-white/10 space-y-4">
              {repliesLoading ? (
                <div className="flex justify-center py-2">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="text-blue-400 animate-spin"
                  />
                </div>
              ) : (
                replies.map((reply) => (
                  <div key={reply._id} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#1152D4]/60 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {reply.author?.name?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-xs">
                          {reply.author?.name ?? "Anonymous"}
                        </span>
                        <span className="text-white/30 text-xs">
                          {formatRelativeTime(reply.createdAt)}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">{reply.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
