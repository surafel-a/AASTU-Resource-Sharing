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

const DataRow = ({
  fileIcon,
  fileName,
  fileSize,
  fileType,
  category,
  dateUploaded,
  status,
}) => {
  const [open, setOpen] = useState(false);
  const statusStyles = {
    approved: "text-green-600 bg-green-100",
    pending: "text-blue-600 bg-blue-100",
    rejected: "text-red-600 bg-red-100",
  };

  const fileTypeStyles = {
    pdf: "text-red-600 bg-red-100",
    ppt: "text-orange-600 bg-orange-100",
    pptx: "text-orange-600 bg-orange-100",
    doc: "text-blue-600 bg-blue-100",
    docx: "text-blue-600 bg-blue-100",
  };

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

      <p className="inline p-6 text-xl font-bold text-black/50">
        {dateUploaded}
      </p>

      <div className="p-6">
        <p
          className={`inline font-bold text-xl px-4 py-1 rounded-md ${statusStyles[status]}`}
        >
          <span className="">.</span> {status}
        </p>
      </div>

      <button className="p-6 w-[120px] flex justify-end">
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
              className="p-3 rounded-full cursor-pointer hover:bg-green-100 hover:text-green-600"
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="p-3 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-600"
            />
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setOpen(false)}
              className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
            />
          </div>
        )}
      </button>

      <div className="col-span-5 border border-black/10"></div>
    </>
  );
};

export default DataRow;
