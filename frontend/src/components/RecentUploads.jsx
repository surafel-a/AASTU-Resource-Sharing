import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faDownload,
  faFilePdf,
  faFileWord,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import { useReview } from "../contexts/ReviewContext";
import { useEffect } from "react";

const RecentUploads = ({
  resourceId,
  icon,
  code,
  course,
  department,
  views,
  downloads,
  fileExtension,
}) => {
  const { summaries, getResourceSummary } = useReview();

  useEffect(() => {
    if (resourceId) {
      getResourceSummary(resourceId);
    }
  }, [resourceId]);

  return (
    <div className="grid grid-cols-[auto_1fr] bg-white shadow-lg py-5 rounded-xl">
      <div className="px-5 py-2">
        <FontAwesomeIcon icon={icon} className="text-[#1152D4] text-5xl" />
      </div>
      <div className="pr-5">
        <h3 className="font-bold text-xl">{course}</h3>
        <p className="mb-5">
          <span>{code}</span>
          <span>. {department}</span>
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <p className="text-green-600 flex items-center gap-1">
              <FontAwesomeIcon icon={faThumbsUp} />
              {summaries?.[resourceId]?.likes || 0}
            </p>

            <p className="text-red-500 flex items-center gap-1">
              {summaries?.[resourceId]?.dislikes || 0}
              <FontAwesomeIcon icon={faThumbsDown} />
            </p>
          </div>
          <p className="bg-[#e4e4ee] font-semibold px-4 py-1 rounded-md uppercase">
            {fileExtension}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentUploads;
