import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FacultyMembers = ({ name, department, status, icon }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-600",
    inactive: "bg-gray-100 text-gray-600",
    suspended: "bg-yellow-100 text-yellow-600",
    banned: "bg-red-100 text-red-600",
  };

  return (
    <>
      <div className="flex items-center gap-3 p-6">
        <div className="w-10 h-10 bg-red-600 rounded-full"></div>
        <p className="font-bold text-md text-black/90">{name}</p>
      </div>

      <div className="p-6 font-bold text-black/50">{department}</div>

      <div className="p-6">
        <p
          className={`inline-block px-4 py-1 font-bold ${
            statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-600"
          } rounded-4xl`}
        >
          {status}
        </p>
      </div>

      <button className="p-6 cursor-pointer">
        <FontAwesomeIcon
          icon={icon}
          className="p-2 text-2xl rounded-full text-black/50 hover:bg-gray-100"
        />
      </button>

      <div className="col-span-4 border border-black/10"></div>
    </>
  );
};

export default FacultyMembers;
