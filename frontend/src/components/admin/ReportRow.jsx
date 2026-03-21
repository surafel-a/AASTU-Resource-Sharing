import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReportRow = ({
  icon,
  type,
  content,
  contentDescription,
  reporter,
  reason,
  status,
}) => {
  const reasonStyles = {
    "incorrect category": "text-yellow-700 bg-yellow-100",
    harassment: "text-red-700 bg-red-100",
    spamming: "text-purple-700 bg-purple-100",
    plagiarism: "text-blue-700 bg-blue-100",
  };

  const statusStyles = {
    new: "bg-blue-600",
    "under review": "bg-orange-500",
  };

  const normalizedReason = reason.toLowerCase();
  const normalizedStatus = status.toLowerCase();

  return (
    <>
      <div className="flex items-center gap-1 p-6">
        <FontAwesomeIcon icon={icon} className="text-[#1152D4] text-2xl" />
        <p className="text-xl font-medium">{type}</p>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-bold">{content}</h2>
        <p className="text-lg text-black/50">{contentDescription}</p>
      </div>

      <div className="flex items-center gap-2 p-6">
        <div className="w-10 h-10 bg-red-600 rounded-full"></div>
        <h2 className="text-xl font-medium">{reporter}</h2>
      </div>

      <div className="p-6">
        <p
          className={`inline-flex px-4 py-2 rounded-lg ${
            reasonStyles[normalizedReason] || "text-gray-700 bg-gray-100"
          }`}
        >
          {reason}
        </p>
      </div>

      <div className="flex items-center gap-2 p-6">
        <div
          className={`w-3 h-3 rounded-full ${
            statusStyles[normalizedStatus] || "bg-gray-400"
          }`}
        ></div>
        <h2 className="text-xl font-medium">{status}</h2>
      </div>

      <div className="p-6">
        <button className="px-4 py-2 bg-[#1152D4] text-white text-xl font-bold rounded-lg cursor-pointer">
          Take Action
        </button>
      </div>
      <div className="col-span-6 border border-black/10"></div>
    </>
  );
};

export default ReportRow;
