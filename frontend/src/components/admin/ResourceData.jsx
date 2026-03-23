import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResourceData = ({
  iconFile,
  courseTitle,
  courseDescription,
  category,
  author,
  day,
  year,
  status,
  color,
}) => {
  const nameParts = author.split(" ");
  const initials = nameParts
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const normalizedStatus = status.toLowerCase();
  const statusStyles = {
    approved: "text-green-600 bg-green-100",
    flagged: "text-orange-600 bg-orange-100",
  };
  const statusDotStyles = {
    approved: "bg-green-600",
    flagged: "bg-orange-600",
  };
  const colorStyles = {
    blue: "text-blue-600 bg-blue-100",
    red: "text-red-600 bg-red-100",
    green: "text-green-600 bg-green-100",
    orange: "text-orange-600 bg-orange-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <>
      <p className="p-6 font-bold uppercase text-black/50">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer accent-blue-600"
        />
      </p>
      <div className="flex items-center gap-3 p-6">
        <FontAwesomeIcon
          icon={iconFile}
          className={`p-3 text-2xl rounded-xl ${colorStyles[color] || colorStyles.blue}`}
        />
        <div className="">
          <p className="text-lg font-bold">{courseTitle}</p>
          <p className="font-semibold uppercase text-black/50">
            {courseDescription}
          </p>
        </div>
      </div>
      <div className="p-6">
        <p className="px-3 py-1 text-lg font-bold bg-[#e2e5e7] inline-block rounded-full">
          {category}
        </p>
      </div>
      <div className="flex items-center gap-4 p-6">
        <p className="p-3 rounded-full bg-[#E7EEFB] font-bold text-md">
          {initials}
        </p>
        <div>
          <p className="text-xl font-bold ">{author}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-2xl font-light text-black/70">{day}</p>
        <p className="text-xl font-light text-black/70">{year}</p>
      </div>

      <div className="flex items-center gap-2 p-6 text-lg font-bold">
        <div
          className={`flex items-center gap-2 px-4 py-1 ${statusStyles[normalizedStatus]} rounded-full`}
        >
          <div
            className={`w-2 h-2 rounded-full ${statusDotStyles[normalizedStatus]}`}
          ></div>
          <p>{status}</p>
        </div>
      </div>

      <div className="flex items-center p-6 text-xl text-black/50">
        <FontAwesomeIcon
          icon={faEye}
          className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
        />
      </div>
      <div className="col-span-7 border border-black/10"></div>
    </>
  );
};

export default ResourceData;
