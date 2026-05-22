import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheckCircle,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getInitials } from "../../utilities/names";

const ReportRow = ({
  icon,
  type,
  content,
  contentDescription,
  reporter,
  reason,
  status,
  onStatusChange,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const reasonStyles = {
    "incorrect category": "text-yellow-700 bg-yellow-100",
    harassment: "text-red-700 bg-red-100",
    spamming: "text-purple-700 bg-purple-100",
    plagiarism: "text-blue-700 bg-blue-100",
    "inappropriate content": "text-orange-700 bg-orange-100",
    misinformation: "text-pink-700 bg-pink-100",
    other: "text-gray-700 bg-gray-100",
  };

  const statusStyles = {
    new: "bg-blue-600",
    "under review": "bg-orange-500",
    resolved: "bg-green-500",
    dismissed: "bg-gray-400",
  };

  const normalizedReason = reason.toLowerCase();
  const normalizedStatus = status.toLowerCase();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (newStatus) => {
    onStatusChange(newStatus);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Type */}
      <div className="flex items-center gap-1 p-6">
        <FontAwesomeIcon icon={icon} className="text-[#1152D4] text-2xl" />
        <p className="text-xl font-medium">{type}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-lg font-bold line-clamp-1">{content}</h2>
        <p className="text-lg text-black/50">{contentDescription}</p>
      </div>

      {/* Reporter */}
      <div className="flex items-center gap-2 p-6">
        <div className="w-12 h-10 bg-[#1152D4] rounded-full flex items-center justify-center text-white font-bold text-lg">
          {reporter !== "Anonymous" ? getInitials(reporter) : "?"}
        </div>
        <h2 className="text-xl font-medium">{reporter}</h2>
      </div>

      {/* Reason */}
      <div className="p-6">
        <p
          className={`inline-flex px-4 py-2 rounded-lg text-sm font-semibold ${
            reasonStyles[normalizedReason] || "text-gray-700 bg-gray-100"
          }`}
        >
          {reason}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 p-6">
        <div
          className={`w-3 h-3 rounded-full ${
            statusStyles[normalizedStatus] || "bg-gray-400"
          }`}
        />
        <h2 className="text-xl font-medium">{status}</h2>
      </div>

      {/* Actions dropdown */}
      <div className="p-6 relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="px-4 py-2 bg-[#1152D4] text-white text-xl font-bold rounded-lg cursor-pointer flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
          <span className="text-base">Actions</span>
        </button>

        {menuOpen && (
          <div className="absolute right-6 top-16 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl w-52 overflow-hidden">
            {normalizedStatus === "new" && (
              <button
                onClick={() => handleAction("Under Review")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-blue-50 text-orange-600 font-semibold"
              >
                <FontAwesomeIcon icon={faEye} />
                Mark Under Review
              </button>
            )}
            {(normalizedStatus === "new" ||
              normalizedStatus === "under review") && (
              <button
                onClick={() => handleAction("Resolved")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-green-50 text-green-600 font-semibold"
              >
                <FontAwesomeIcon icon={faCheckCircle} />
                Mark Resolved
              </button>
            )}
            {normalizedStatus !== "dismissed" && (
              <button
                onClick={() => handleAction("Dismissed")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-500 font-semibold"
              >
                <FontAwesomeIcon icon={faTimesCircle} />
                Dismiss
              </button>
            )}
            <button
              onClick={() => {
                onDelete();
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 font-semibold border-t border-gray-100"
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete Report
            </button>
          </div>
        )}
      </div>

      {/* Row divider */}
      <div className="col-span-6 border border-black/10" />
    </>
  );
};

export default ReportRow;
