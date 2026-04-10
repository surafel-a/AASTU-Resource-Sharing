import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBookmark } from "../contexts/BookmarkContext";

const ResourceLibraries = ({
  resourceId,
  fileIcon,
  fileName,
  fileType,
  downloadIcon,
  calanderIcon,
  bookmarkIconR,
  bookmarkIconS,
  lecturer,
  courseId,
  downloads,
  year,
  isBookmarked,
  onBookmarkToggle,
}) => {
  const getFileTypeColor = () => {
    const type = fileType.toLowerCase();

    if (type === "pdf") {
      return {
        bg: "bg-[#EFEEFB]",
        text: "text-[#1152D4]",
        icon: "text-[#1152D4]",
      };
    }

    if (type === "docx" || type === "word" || type === "doc") {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: "text-green-700",
      };
    }

    if (type === "ppt" || type === "pptx") {
      return {
        bg: "bg-orange-100",
        text: "text-orange-600",
        icon: "text-orange-600",
      };
    }

    // default
    return {
      bg: "bg-gray-100",
      text: "text-gray-600",
      icon: "text-gray-600",
    };
  };

  const fileColors = getFileTypeColor();

  return (
    <div className="relative bg-white border shadow-md rounded-2xl border-black/10">
      <div className="mx-8 my-6">
        <div>
          <FontAwesomeIcon
            icon={fileIcon}
            className={`p-3 text-3xl ${fileColors.bg} ${fileColors.icon} rounded-md mb-5`}
          />
          <button
            className="absolute cursor-pointer top-6 right-4"
            onClick={() => onBookmarkToggle(resourceId)}
          >
            <FontAwesomeIcon
              icon={isBookmarked ? bookmarkIconS : bookmarkIconR}
              className={`${isBookmarked ? "text-blue-900" : "text-gray-400"} text-2xl`}
            />
          </button>
        </div>
        <h2 className="mb-2 text-2xl font-bold">{fileName}</h2>
        <p className="mb-5 font-bold text-black/30">
          By {lecturer} . {courseId}
        </p>
        {/* Details */}
        <div className="flex items-center justify-between mb-8">
          <p className="flex items-center gap-5 font-semibold text-black/30">
            {/* 1.2K */}
            <p className="flex items-center gap-1">
              <FontAwesomeIcon icon={downloadIcon} />
              <span>{downloads}</span>
            </p>
            {/* 450 Download */}
            <p className="flex items-center gap-1">
              <FontAwesomeIcon icon={calanderIcon} />
              <span>{year}</span>
            </p>
          </p>
          <p
            className={`${fileColors.bg} ${fileColors.icon} font-bold px-4 py-1 rounded-md uppercase`}
          >
            {fileType}
          </p>
        </div>

        <div className="mb-10">
          <button className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-[#EFEEFB] text-[#1152D4] rounded-lg mx-auto text-center cursor-pointer">
            <FontAwesomeIcon icon={downloadIcon} />
            <p className="font-bold">Download Resource</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibraries;
