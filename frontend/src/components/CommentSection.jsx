import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useComment } from "../contexts/CommentContext";
import { useAuth } from "../contexts/AuthContext";
import CommentItem from "./CommentItem";

const CommentSection = ({ resourceId }) => {
  const {
    comments,
    loading,
    total,
    totalPages,
    currentPage,
    getComments,
    createComment,
    deleteComment,
  } = useComment();
  const { user, isAuthenticated } = useAuth();

  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (resourceId) getComments(resourceId, 1);
  }, [resourceId]);

  const handlePost = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to comment");
      return;
    }
    if (!newComment.trim()) return;

    setPosting(true);
    try {
      await createComment(resourceId, newComment.trim());
      setNewComment("");
      toast.success("Comment posted!");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success("Comment removed");
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const handlePageChange = (page) => {
    getComments(resourceId, page);
    // Scroll to top of comment section smoothly
    document
      .getElementById("comment-section-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-800/60 border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div id="comment-section-top">
        <h3 className="text-white font-bold text-xl mb-1">
          Discussion
          <span className="ml-2 text-white/40 font-normal text-base">
            ({total} comment{total !== 1 ? "s" : ""})
          </span>
        </h3>
        <p className="text-white/40 text-sm mb-6">
          Share your thoughts, ask questions, or help others.
        </p>
      </div>

      {/* ── POST FORM ── */}
      <div className="flex gap-3 mb-8">
        {/* Current user avatar */}
        <div className="w-9 h-9 rounded-full bg-[#1152D4] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {user?.photo ? (
            <img
              src={user.photo}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            (user?.name?.charAt(0).toUpperCase() ?? "?")
          )}
        </div>

        <div className="flex-1 flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handlePost();
              }
            }}
            placeholder={
              isAuthenticated
                ? "Write a comment... (Enter to post, Shift+Enter for newline)"
                : "Log in to comment"
            }
            disabled={!isAuthenticated}
            rows={2}
            className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 resize-none focus:outline-none focus:border-blue-500 disabled:opacity-40 transition"
          />
          <button
            onClick={handlePost}
            disabled={posting || !newComment.trim() || !isAuthenticated}
            className="px-4 py-2 bg-[#1152D4] text-white rounded-xl font-bold self-end hover:bg-blue-700 disabled:opacity-40 transition cursor-pointer"
          >
            {posting ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} />
            )}
          </button>
        </div>
      </div>

      {/* ── COMMENTS LIST ── */}
      {loading ? (
        <div className="flex justify-center py-8">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-blue-400 text-2xl animate-spin"
          />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/30 text-lg font-semibold">
            No comments yet.
          </p>
          <p className="text-white/20 text-sm mt-1">
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 rounded-lg border border-white/10 text-white/60 font-bold disabled:opacity-30 hover:bg-white/10 transition cursor-pointer text-sm"
          >
            ← Prev
          </button>

          <span className="text-white/40 text-sm font-semibold px-3">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 rounded-lg border border-white/10 text-white/60 font-bold disabled:opacity-30 hover:bg-white/10 transition cursor-pointer text-sm"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
