import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { getInitials } from "../../utilities/names";

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    navigate(
      `/admin/resource-management?search=${encodeURIComponent(trimmed)}`,
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch(e);
  };

  return (
    <div className="flex items-center justify-between gap-10 px-6 py-2 border-b-3 border-black/15">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search resources, users or reports..."
          className="w-[70%] pl-10 pr-6 py-2 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute top-3 left-2 text-black/50 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1 text-xl text-black/50">
          <FontAwesomeIcon
            icon={faBell}
            onClick={() => navigate("notifications")}
            className={`p-3 rounded-full cursor-pointer transition-all duration-300
            ${
              isActive("notifications")
                ? "text-blue-600 bg-blue-100"
                : "text-black/50 bg-white hover:bg-[#F6F6F8]"
            }`}
          />

          <FontAwesomeIcon
            icon={faGear}
            onClick={() => navigate("settings")}
            className={`p-3 rounded-full cursor-pointer transition-all duration-300
            ${
              isActive("settings")
                ? "text-blue-600 bg-blue-100"
                : "text-black/50 bg-white hover:bg-[#F6F6F8]"
            }`}
          />

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} />
            User App
          </button>
        </div>
        <div className="w-0.5 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex items-center justify-center gap-3">
          <div>
            <h1 className="font-bold text-end">{user?.name}</h1>
            <p className="text-sm font-bold uppercase text-black/40">
              System Administrator
            </p>
          </div>
          <button
            className="bg-gray-200 rounded-full cursor-pointer w-15 h-15 overflow-hidden"
            onClick={() => navigate("profile")}
          >
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="font-bold text-xl">{getInitials(user?.name)}</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
