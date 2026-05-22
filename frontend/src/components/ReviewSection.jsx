import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faStar,
  faLink,
  faFlag,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpRegular,
  faThumbsDown as faThumbsDownRegular,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { useReview } from "../contexts/ReviewContext";
import { useReport } from "../contexts/ReportContext";
import { useAuth } from "../contexts/AuthContext";

const ReviewSection = ({ resourceId, resourceTitle }) => {
  const {
    summary,
    userReview,
    loading,
    getResourceSummary,
    toggleReaction,
    rateResource,
  } = useReview();
  const { submitReport } = useReport();
  const { isAuthenticated } = useAuth();

  const [hoveredStar, setHoveredStar] = useState(0);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);

  useEffect(() => {
    if (resourceId) getResourceSummary(resourceId);
  }, [resourceId]);

  const handleReaction = async (reaction) => {
    if (!isAuthenticated) {
      toast.info("Please log in to react to resources");
      return;
    }
    try {
      await toggleReaction(resourceId, reaction);
    } catch {
      toast.error("Failed to save reaction");
    }
  };

  const handleRate = async (rating) => {
    if (!isAuthenticated) {
      toast.info("Please log in to rate resources");
      return;
    }
    try {
      await rateResource(resourceId, rating);
      toast.success(`Rated ${rating} star${rating > 1 ? "s" : ""}!`);
    } catch {
      toast.error("Failed to save rating");
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleReportSubmit = async () => {
    if (!reportReason) {
      toast.error("Please select a reason");
      return;
    }
    try {
      setReportSubmitting(true);
      await submitReport({
        targetType: "Resource",
        targetId: resourceId,
        reason: reportReason,
        description: reportDescription,
      });
      toast.success("Report submitted. Thank you!");
      setReportModalOpen(false);
      setReportReason("");
      setReportDescription("");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info("You have already reported this resource.");
      } else {
        toast.error("Failed to submit report");
      }
    } finally {
      setReportSubmitting(false);
    }
  };

  const avgRating = summary?.avgRating ? summary.avgRating.toFixed(1) : null;

  return (
    <div className="bg-gray-800/60 border border-white/10 rounded-2xl p-6 mb-6">
      {/* Header */}
      <h3 className="text-white font-bold text-xl mb-6 tracking-tight">
        Rate & Review
        {avgRating && (
          <span className="ml-3 text-yellow-400 text-base font-semibold">
            ⭐ {avgRating} / 5
            <span className="text-white/40 text-sm ml-1">
              ({summary.totalRatings} ratings)
            </span>
          </span>
        )}
      </h3>

      {loading ? (
        <div className="flex justify-center py-4">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-blue-400 text-2xl animate-spin"
          />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          {/* ── LIKE ── */}
          <button
            onClick={() => handleReaction("like")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer
              ${
                userReview?.reaction === "like"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-white/10 text-white/70 hover:bg-blue-600/20 hover:text-blue-300"
              }`}
          >
            <FontAwesomeIcon
              icon={
                userReview?.reaction === "like" ? faThumbsUp : faThumbsUpRegular
              }
              className="text-lg"
            />
            <span>{summary?.likes ?? 0}</span>
          </button>

          {/* ── DISLIKE ── */}
          <button
            onClick={() => handleReaction("dislike")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer
              ${
                userReview?.reaction === "dislike"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-white/10 text-white/70 hover:bg-red-600/20 hover:text-red-300"
              }`}
          >
            <FontAwesomeIcon
              icon={
                userReview?.reaction === "dislike"
                  ? faThumbsDown
                  : faThumbsDownRegular
              }
              className="text-lg"
            />
            <span>{summary?.dislikes ?? 0}</span>
          </button>

          {/* ── DIVIDER ── */}
          <div className="w-px h-8 bg-white/20" />

          {/* ── STAR RATING ── */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled =
                hoveredStar >= star ||
                (!hoveredStar && (userReview?.rating ?? 0) >= star);
              return (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => handleRate(star)}
                  className="text-2xl transition-transform duration-100 hover:scale-125 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={isFilled ? faStar : faStarRegular}
                    className={isFilled ? "text-yellow-400" : "text-white/30"}
                  />
                </button>
              );
            })}
            {userReview?.rating && (
              <span className="text-white/50 text-sm ml-2">
                Your rating: {userReview.rating}★
              </span>
            )}
          </div>

          {/* ── DIVIDER ── */}
          <div className="w-px h-8 bg-white/20" />

          {/* ── SHARE ── */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <FontAwesomeIcon icon={faLink} />
            <span>Share</span>
          </button>

          {/* ── REPORT ── */}
          <button
            onClick={() => {
              if (!isAuthenticated) {
                toast.info("Please log in to report resources");
                return;
              }
              setReportModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-white/10 text-white/70 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 cursor-pointer ml-auto"
          >
            <FontAwesomeIcon icon={faFlag} />
            <span>Report</span>
          </button>
        </div>
      )}

      {/* ── REPORT MODAL ── */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-white font-bold text-xl mb-1">
              Report Resource
            </h3>
            <p className="text-white/50 text-sm mb-6">"{resourceTitle}"</p>

            <label className="text-white/70 text-sm font-semibold block mb-2">
              Reason *
            </label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full bg-gray-800 text-white border border-white/10 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a reason</option>
              <option value="Incorrect Category">Incorrect Category</option>
              <option value="Plagiarism">Plagiarism</option>
              <option value="Inappropriate Content">
                Inappropriate Content
              </option>
              <option value="Misinformation">Misinformation</option>
              <option value="Spamming">Spamming</option>
              <option value="Other">Other</option>
            </select>

            <label className="text-white/70 text-sm font-semibold block mb-2">
              Additional details (optional)
            </label>
            <textarea
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              rows={3}
              placeholder="Describe the issue..."
              className="w-full bg-gray-800 text-white border border-white/10 rounded-xl px-4 py-3 mb-6 resize-none focus:outline-none focus:border-blue-500"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setReportModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-bold hover:bg-white/5 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                disabled={reportSubmitting}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
              >
                {reportSubmitting ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
