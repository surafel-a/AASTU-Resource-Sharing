import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faEllipsisVertical,
  faPen,
  faTimes,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResource } from "../contexts/ResourceContext";
import { toast } from "react-toastify";

const DataRow = ({
  resourceId,
  fileIcon,
  fileName,
  fileSize,
  fileType,
  category,
  dateUploaded,
  status,
}) => {
  const navigate = useNavigate();
  const { deleteResource } = useResource();
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const statusStyles = {
    approved: "text-green-600 bg-green-100",
    pending: "text-blue-600 bg-blue-100",
    rejected: "text-red-600 bg-red-100",
  };

  const handleDelete = async () => {
    await deleteResource(resourceId);
    toast.success("Resource deleted successfully");

    setShowConfirm(false);
  };

  const fileTypeStyles = {
    pdf: "text-red-600 bg-red-100",
    ppt: "text-orange-600 bg-orange-100",
    pptx: "text-orange-600 bg-orange-100",
    doc: "text-blue-600 bg-blue-100",
    docx: "text-blue-600 bg-blue-100",
  };
  const [day, year, time] = dateUploaded.split(", ");

  return (
    <>
      <div className="flex items-center gap-4 p-6">
        <div>
          <FontAwesomeIcon
            icon={fileIcon}
            className={`text-3xl rounded-xl p-3 ${fileTypeStyles[fileType]}`}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{fileName}</h2>
          <div className="flex items-center gap-2 text-lg font-semibold text-black/50">
            <p>{fileSize}</p>
            <p>. {fileType}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="inline font-bold text-xl text-black/50 px-4 py-1 rounded-md bg-[#e4e4e9] capitalize">
          {category}
        </p>
      </div>

      <div className="flex flex-col p-6 ">
        <p className="text-xl font-bold text-black/50">
          <span>{day}, </span>
          <span className="text-base">{year}</span>
        </p>

        <p className="text-base">{time}</p>
      </div>

      <div className="p-6">
        <p
          className={`inline font-bold text-xl px-4 py-1 rounded-md ${statusStyles[status]}`}
        >
          <span className="">.</span> {status}
        </p>
      </div>

      <div className="p-6 w-[120px] flex justify-end">
        {!open ? (
          <FontAwesomeIcon
            onClick={() => setOpen(true)}
            className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
            icon={faEllipsisVertical}
          />
        ) : (
          <div className="flex items-center bg-white rounded-lg text-black/50">
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => navigate(`/uploads/${resourceId}/edit`)}
              className="p-3 rounded-full cursor-pointer hover:bg-green-100 hover:text-green-600"
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => setShowConfirm(true)}
              className="p-3 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-600"
            />
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setOpen(false)}
              className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
            />
          </div>
        )}
      </div>

      <div className="col-span-5 border border-black/10"></div>

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

export default DataRow;
