import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faX,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFileImage,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { useResource } from "../../contexts/ResourceContext";
import { useState } from "react";
import { getInitials } from "../../utilities/names";

const ApprovalsPendings = ({
  resourceId,
  fileType,
  fileSize,
  course,
  contributor,
  department,
  date,
  status: initialStatus,
}) => {
  const { updateResource, loading } = useResource();
  const [status, setStatus] = useState(initialStatus || "pending");
  const [day, year, time] = date.split(", ");

  let iconFile;
  let iconColor;

  switch (fileType?.toLowerCase()) {
    case "pdf":
      iconFile = faFilePdf;
      iconColor = "text-red-600 bg-red-100";
      break;

    case "doc":
    case "docx":
      iconFile = faFileWord;
      iconColor = "text-blue-600 bg-blue-100";
      break;

    case "xls":
    case "xlsx":
      iconFile = faFileExcel;
      iconColor = "text-green-600 bg-green-100";
      break;

    case "ppt":
    case "pptx":
      iconFile = faFilePowerpoint;
      iconColor = "text-orange-600 bg-orange-100";
      break;

    case "jpg":
    case "jpeg":
    case "png":
      iconFile = faFileImage;
      iconColor = "text-purple-600 bg-purple-100";
      break;

    default:
      iconFile = faFileLines;
      iconColor = "text-gray-600 bg-gray-100";
  }

  // APPROVE
  const handleApprove = async () => {
    try {
      await updateResource(resourceId, {
        status: "approved",
      });

      setStatus("approved");
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT
  const handleReject = async () => {
    try {
      await updateResource(resourceId, {
        status: "rejected",
      });

      setStatus("rejected");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* RESOURCE INFO */}
      <div className="flex items-center gap-4 p-6">
        <FontAwesomeIcon
          icon={iconFile}
          className={`p-3 text-2xl rounded-xl ${iconColor}`}
        />

        <div>
          <p className="text-xl font-bold">{course}</p>

          <p className="font-semibold text-black/50">
            {fileType?.toUpperCase()} - {fileSize}
          </p>
        </div>
      </div>

      {/* CONTRIBUTOR */}
      <div className="flex items-center gap-2 p-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-gray-300">
          {contributor?.photo ? (
            <img
              src={contributor.photo}
              alt={contributor.name}
              className="w-full h-full object-cover "
            />
          ) : (
            <p className="font-bold text-md">
              {getInitials(contributor?.name)}
            </p>
          )}
        </div>

        <p className="text-lg font-bold">{contributor?.name}</p>
      </div>

      {/* DEPARTMENT */}
      <div className="p-6">
        <p className="inline-block bg-[#e4e4e9] pl-4 pr-16 py-2 font-semibold rounded-md">
          {department}
        </p>
      </div>

      {/* DATE */}
      <div className="p-6">
        <p className="text-2xl font-light text-black/70">{day}</p>
        <p className="text-xl font-light text-black/70">{year}</p>
        <p className="text-black/50">{time}</p>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 py-6 pr-6">
        {status === "pending" && (
          <>
            <FontAwesomeIcon
              icon={faX}
              onClick={handleReject}
              className="p-2 text-2xl text-red-600 rounded-lg cursor-pointer hover:bg-red-100"
            />

            <button
              onClick={handleApprove}
              disabled={loading}
              className="flex items-center gap-1 text-white px-4 py-2 bg-[#1152D4] rounded-lg cursor-pointer"
            >
              <FontAwesomeIcon icon={faCheck} className="text-xl text-white" />

              <p>Approve</p>
            </button>
          </>
        )}

        {status === "approved" && (
          <button className="px-4 py-2 font-semibold text-green-700 bg-green-100 rounded-lg">
            Approved
          </button>
        )}

        {status === "rejected" && (
          <button className="px-4 py-2 font-semibold text-red-700 bg-red-100 rounded-lg">
            Rejected
          </button>
        )}
      </div>

      <div className="col-span-5 border border-black/10"></div>
    </>
  );
};

export default ApprovalsPendings;
