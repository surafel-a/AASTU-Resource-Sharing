import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faTrash,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFileImage,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useState } from "react";
import { useResource } from "../../contexts/ResourceContext";
import { getInitials } from "../../utilities/names";

const ResourceData = ({
  resourceId,
  fileType,
  fileSize,
  courseTitle,
  category,
  author,
  status,
  visibility,
  date,
}) => {
  const { updateResource, deleteResource } = useResource();
  const [showConfirm, setShowConfirm] = useState(false);
  const [visible, setVisible] = useState(visibility || "");
  const nameParts = author?.split(" ") || [];

  const normalizedStatus = (status || "").toLowerCase();
  const statusStyles = {
    approved: "text-green-600 bg-green-100",
    pending: "text-orange-600 bg-orange-100",
    rejected: "text-red-600 bg-red-100",
  };
  const statusDotStyles = {
    approved: "bg-green-600",
    pending: "bg-orange-600",
    rejected: "bg-red-600",
  };
  const colorStyles = {
    blue: "text-blue-600 bg-blue-100",
    red: "text-red-600 bg-red-100",
    green: "text-green-600 bg-green-100",
    orange: "text-orange-600 bg-orange-100",
    purple: "text-purple-600 bg-purple-100",
  };
  const [day, year] = date.split(", ");

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

  const toggleVisibility = async () => {
    try {
      const newVisibility = visible === "public" ? "department" : "public";

      await updateResource(resourceId, {
        visibility: newVisibility,
      });

      setVisible(newVisibility);

      toast.success(`Visibility changed to ${newVisibility}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update visibility");
    }
  };

  const handleDelete = async () => {
    await deleteResource(resourceId);
    toast.success("Resource deleted successfully");

    setShowConfirm(false);
  };

  return (
    <>
      <div className="flex items-center gap-3 p-6">
        <FontAwesomeIcon
          icon={iconFile}
          className={`p-3 text-2xl rounded-xl ${iconColor}`}
        />
        <div className="">
          <p className="text-xl font-bold">{courseTitle}</p>
          <p className="text-md text-gray-500">{fileSize}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="px-3 py-1 text-lg font-bold bg-[#e2e5e7] inline-block rounded-full">
          {category}
        </p>
      </div>
      <div className="flex items-center gap-4 p-6">
        <p className="p-3 rounded-full bg-[#E7EEFB] font-bold text-md">
          {getInitials(author)}
        </p>
        <div>
          <p className="text-xl font-bold ">{author}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-2xl font-light text-black/70">{day}</p>
        <p className="text-xl font-light text-black/70">{year}</p>
      </div>

      <div
        className={`flex items-center gap-2 px-4 py-1 rounded-full ${
          statusStyles[normalizedStatus] || "text-gray-600 bg-gray-100"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            statusDotStyles[normalizedStatus] || "bg-gray-400"
          }`}
        ></div>

        <p className="font-semibold text-md">{status}</p>
      </div>

      <div className="flex items-center p-6 text-xl text-black/50">
        <FontAwesomeIcon
          icon={visible === "public" ? faEye : faEyeSlash}
          onClick={toggleVisibility}
          className="p-3 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => setShowConfirm(true)}
          className="p-3 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-600"
        />
      </div>
      <div className="col-span-6 border border-black/10"></div>

      {/* DELETION CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
            <h3 className="mb-4 text-lg font-semibold">
              Are you sure you want to delete?
            </h3>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="w-full py-2 text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceData;
