import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Logo from "./Logo";
import { useUser } from "../contexts/UserContext";
import { formatDepartment } from "../utilities/names";

const Navbar = () => {
  const { user } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  // Define nav items
  const navItems = [
    { name: "home", label: "Home", path: "/" },
    { name: "library", label: "Library", path: "/library" },
    { name: "uploads", label: "My Uploads", path: "/uploads" },
    { name: "bookmarks", label: "Bookmarks", path: "/bookmarks" },
  ];

  // Determine active tab (handles nested routes)
  const active = navItems.find((item) => {
    if (item.path === "/") return pathname === "/";
    return pathname === item.path || pathname.startsWith(item.path + "/");
  })?.name;

  return (
    <nav className="flex items-center justify-between mt-2 ">
      {/* Logo */}
      <div>
        <Logo />
      </div>

      {/* Search */}
      <div className="relative flex-1 mx-[10%]">
        <FontAwesomeIcon
          className="absolute top-3.5 left-3 text-gray-500"
          icon={faSearch}
        />
        <input
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search by course code, title or instructor..."
        />
      </div>

      {/* Navigation + User */}
      <div className="flex items-center justify-center gap-10">
        <ul className="flex gap-5 py-5">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`text-lg font-semibold cursor-pointer ${
                active === item.name ? "border-b-[3px] border-blue-500" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* User Info */}
        <div className="flex items-center justify-center gap-3">
          <div>
            <h1 className="font-bold">{user?.name}</h1>
            <p>{formatDepartment(user?.department)} Student</p>
          </div>
          <button
            className="w-12 h-12 bg-gray-300 rounded-full cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src={user?.photo || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover rounded-xl"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
