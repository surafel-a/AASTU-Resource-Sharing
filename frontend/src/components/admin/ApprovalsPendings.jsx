import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

const ApprovalsPendings = ({
  iconFile,
  color,
  course,
  courseDescription,
  contributor,
  department,
  day,
  year,
  time,
}) => {
  const colorStyles = {
    blue: "text-blue-600 bg-blue-100",
    red: "text-red-600 bg-red-100",
    green: "text-green-600 bg-green-100",
    orange: "text-orange-600 bg-orange-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <>
      <p className="p-6">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer accent-blue-600"
        />
      </p>

      <div className="flex items-center gap-2 p-6">
        <FontAwesomeIcon
          icon={iconFile}
          className={`p-3 text-2xl rounded-xl ${colorStyles[color] || colorStyles.blue}`}
        />
        <div className="">
          <p className="text-xl font-bold">{course}</p>
          <p className="font-semibold text-black/50">{courseDescription}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-6">
        <div className="w-10 h-10 bg-red-600 rounded-full"></div>
        <p className="text-lg font-bold">{contributor}</p>
      </div>

      <div className="p-6">
        <p className="inline-block bg-[#e4e4e9] pl-4 pr-16 py-2 font-semibold rounded-md wrap-break-word">
          {department}
        </p>
      </div>

      <div className="p-6">
        <p className="text-2xl font-light text-black/70">{day}</p>
        <p className="text-xl font-light text-black/70">{year}</p>
        <p className="text-black/50">{time}</p>
      </div>

      <div className="flex items-center justify-end gap-3 py-6 pr-6">
        <FontAwesomeIcon
          icon={faX}
          className="p-2 text-2xl text-red-600 rounded-lg cursor-pointer hover:bg-red-100"
        />
        <button className="flex items-center gap-1 text-white px-4 py-2 bg-[#1152D4] rounded-lg cursor-pointer">
          <FontAwesomeIcon icon={faCheck} className="text-xl text-white" />
          <p>Approve</p>
        </button>
      </div>
      <div className="col-span-6 border border-black/10"></div>
    </>
  );
};

export default ApprovalsPendings;
