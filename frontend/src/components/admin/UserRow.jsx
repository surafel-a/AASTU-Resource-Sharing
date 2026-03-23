import { faBan, faPen, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserRow = ({ name, ID, email, department, role, status }) => {
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const normalizedStatus = status.toLowerCase();
  const statusStyles = {
    active: "text-green-600 bg-green-600",
    suspended: "text-red-600 bg-red-600",
  };

  return (
    <>
      <p className="p-6 font-bold uppercase text-black/50">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer accent-blue-600"
        />
      </p>
      <div className="flex items-center gap-4 p-6">
        <p className="p-3 rounded-full bg-[#E7EEFB] font-bold text-lg">
          {initials}
        </p>
        <div>
          <p className="text-xl font-bold ">{name}</p>
          <p className="font-medium text-black/70">{email}</p>
        </div>
      </div>
      <p className="p-6 text-xl font-semibold">{ID}</p>
      <p className="p-6 text-lg font-semibold">{department}</p>
      <div className="p-6">
        <p className="px-3 py-1 text-lg font-bold bg-[#e2e5e7] inline-block rounded-full">
          {role}
        </p>
      </div>
      <div
        className={`flex items-center gap-2 p-6 text-xl font-bold ${statusStyles[normalizedStatus]?.split(" ")[0] || "text-gray-500"}`}
      >
        <div
          className={`w-3 h-3 rounded-full ${statusStyles[normalizedStatus]?.split(" ")[1] || "text-gray-500"}`}
        ></div>
        <p>{status}</p>
      </div>

      <div className="flex items-center p-6 text-xl text-black/50">
        <FontAwesomeIcon
          icon={faPen}
          className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
        />
        <FontAwesomeIcon
          icon={faUserShield}
          className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
        />
        <FontAwesomeIcon
          icon={faBan}
          className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
        />
      </div>
      <div className="col-span-7 border border-black/10"></div>
    </>
  );
};

export default UserRow;
