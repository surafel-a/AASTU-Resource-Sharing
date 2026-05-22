import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";

const CommentContext = createContext();

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // ── Fetch top-level comments for a resource ────────────────────────────────
  const getComments = useCallback(
    async (resourceId, page = 1) => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/comments/${resourceId}?page=${page}&limit=10`,
        );
        setComments(data.data.comments);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotal(data.total);
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    },
    [BASE_URL],
  );

  // ── Fetch replies for a comment ────────────────────────────────────────────
  const getReplies = async (commentId) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/comments/${commentId}/replies`,
      );
      return data.data.replies;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  // ── Post a new comment ─────────────────────────────────────────────────────
  const createComment = async (resourceId, content) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/comments/${resourceId}`,
        { content },
        { withCredentials: true },
      );
      // Prepend new comment to the top of the list
      setComments((prev) => [data.data.comment, ...prev]);
      setTotal((prev) => prev + 1);
      return data.data.comment;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  // ── Post a reply to a comment ──────────────────────────────────────────────
  const createReply = async (commentId, content) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/comments/${commentId}/replies`,
        { content },
        { withCredentials: true },
      );
      return data.data.reply;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  // ── Like or dislike a comment ──────────────────────────────────────────────
  const toggleCommentReaction = async (commentId, reaction) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/comments/${commentId}/react`,
        { reaction },
        { withCredentials: true },
      );
      // Update that specific comment in state
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? {
                ...c,
                likes: Array(data.data.likes).fill(null),
                dislikes: Array(data.data.dislikes).fill(null),
                _userReaction: data.data.userReaction,
              }
            : c,
        ),
      );
      return data.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  // ── Delete a comment ───────────────────────────────────────────────────────
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/comments/${commentId}`, {
        withCredentials: true,
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      setTotal((prev) => prev - 1);
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  const value = {
    comments,
    loading,
    totalPages,
    currentPage,
    total,
    getComments,
    getReplies,
    createComment,
    createReply,
    toggleCommentReaction,
    deleteComment,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment must be used within CommentProvider");
  }
  return context;
};
