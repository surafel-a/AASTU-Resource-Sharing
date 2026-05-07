import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronDown,
  faSearch,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import Logo from "./Logo";

import { useUser } from "../contexts/UserContext";
import { formatDepartment } from "../utilities/names";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useUser();
  const { logout } = useAuth();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // NAV ITEMS
  const navItems = [
    { name: "home", label: "Home", path: "/" },
    { name: "library", label: "Library", path: "/library" },
    { name: "uploads", label: "My Uploads", path: "/uploads" },
    { name: "bookmarks", label: "Bookmarks", path: "/bookmarks" },
  ];

  // ACTIVE TAB
  const active = navItems.find((item) => {
    if (item.path === "/") return pathname === "/";
    return pathname === item.path || pathname.startsWith(item.path + "/");
  })?.name;

  // LOGOUT
  const handleLogout = () => {
    setOpen(false);
    setMobileMenu(false);

    logout();

    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <nav className="w-full bg-white shadow-sm px-4 sm:px-6 lg:px-10 py-4 relative">
      <div className="flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Logo />

          {/* DESKTOP NAV */}
          <ul className="hidden lg:flex gap-6 ml-6">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`text-base font-semibold cursor-pointer transition pb-1 ${
                  active === item.name
                    ? "border-b-[3px] border-blue-500 text-blue-600"
                    : "hover:text-blue-500"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex relative flex-1 max-w-xl">
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

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* USER INFO - DESKTOP */}
          <div className="hidden sm:block text-right">
            <h1 className="font-bold text-sm lg:text-base">{user?.name}</h1>

            <p className="text-xs lg:text-sm text-gray-500">
              {formatDepartment(user?.department)} Student
            </p>
          </div>

          {/* PROFILE */}
          <button
            className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full cursor-pointer overflow-hidden"
            onClick={() => navigate("/profile")}
          >
            <img
              src={user?.photo || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {/* DESKTOP DROPDOWN */}
          <div className="relative hidden lg:block">
            <button onClick={() => setOpen(!open)}>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 top-12 w-44 bg-white shadow-lg rounded-xl py-2 z-50 border">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <FontAwesomeIcon icon={mobileMenu ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden mt-4 relative">
        <FontAwesomeIcon
          className="absolute top-3.5 left-3 text-gray-500"
          icon={faSearch}
        />

        <input
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden mt-5 bg-white border rounded-2xl shadow-md p-5 flex flex-col gap-5">
          {/* NAV LINKS */}
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`text-base font-semibold cursor-pointer ${
                  active === item.name ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenu(false);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* USER INFO */}
          <div className="border-t pt-4">
            <h1 className="font-bold">{user?.name}</h1>

            <p className="text-sm text-gray-500">
              {formatDepartment(user?.department)} Student
            </p>
          </div>

          {/* LOGOUT */}
          <button
            className="flex items-center gap-2 text-red-500 font-semibold"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
