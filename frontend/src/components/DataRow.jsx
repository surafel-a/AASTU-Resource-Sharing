import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const DataRow = ({
  fileIcon,
  fileName,
  fileSize,
  fileType,
  category,
  dateUploaded,
  status,
}) => {
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
          <h2 className="font-bold text-xl">{fileName}</h2>
          <div className="flex items-center gap-2 font-semibold text-lg text-black/50">
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

      <p className="inline font-bold text-xl text-black/50 p-6">
        {dateUploaded}
      </p>

      <div className="p-6">
        <p
          className={`inline font-bold text-xl px-4 py-1 rounded-md ${statusStyles[status]}`}
        >
          <span className="">.</span> {status}
        </p>
      </div>
      <button className="p-6 cursor-pointer">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      <div className="border border-black/10 col-span-5"></div>
    </>
  );
};

export default DataRow;
