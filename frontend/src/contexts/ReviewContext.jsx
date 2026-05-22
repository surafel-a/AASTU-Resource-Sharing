import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [summary, setSummary] = useState(null); // { likes, dislikes, avgRating, totalRatings }
  const [userReview, setUserReview] = useState(null); // { reaction, rating, comment }
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // ── Fetch summary + current user's review for a resource ──────────────────
  const getResourceSummary = useCallback(
    async (resourceId) => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/reviews/${resourceId}/summary`,
          { withCredentials: true },
        );
        setSummary(data.data.summary);
        setUserReview(data.data.userReview);
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    },
    [BASE_URL],
  );

  // ── Toggle like or dislike ─────────────────────────────────────────────────
  // reaction: "like" | "dislike"
  const toggleReaction = async (resourceId, reaction) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/reviews/${resourceId}/react`,
        { reaction },
        { withCredentials: true },
      );
      // Update state instantly — no need to refetch
      setSummary(data.data.summary);
      setUserReview((prev) => ({ ...prev, reaction: data.data.userReaction }));
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  // ── Rate a resource (1–5 stars) ────────────────────────────────────────────
  const rateResource = async (resourceId, rating) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/reviews/${resourceId}/rate`,
        { rating },
        { withCredentials: true },
      );
      setSummary(data.data.summary);
      setUserReview((prev) => ({ ...prev, rating: data.data.userRating }));
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  // ── Post a written review ──────────────────────────────────────────────────
  const createReview = async (resourceId, { comment, rating }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/reviews`,
        { resource: resourceId, comment, rating },
        { withCredentials: true },
      );
      setUserReview((prev) => ({
        ...prev,
        comment: data.data.review.comment,
        rating: data.data.review.rating,
      }));
      return data.data.review;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    summary,
    userReview,
    loading,
    getResourceSummary,
    toggleReaction,
    rateResource,
    createReview,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReview must be used within ReviewProvider");
  }
  return context;
};
