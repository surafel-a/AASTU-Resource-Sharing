import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Logo from "./Logo";
import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center mt-5">
      <div>
        <Logo />
      </div>

      <div className="relative flex-1 mx-[10%]">
        <FontAwesomeIcon
          className="absolute top-3.5 left-3 text-gray-500 mr-2"
          icon={faSearch}
        />
        <input
          className="w-full pl-10 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search by course code, title or instructor..."
        />
      </div>

      <div className="flex gap-10 justify-center items-center">
        <ul className="flex gap-5 py-5">
          <li
            className={`text-lg font-semibold cursor-pointer ${active === "home" ? "border-b-3 border-blue-500" : ""}`}
            onClick={() => {
              setActive("home");
              navigate("/");
            }}
          >
            Home
          </li>
          <li
            className={`text-lg font-semibold cursor-pointer ${active === "library" ? "border-b-3 border-blue-500" : ""}`}
            onClick={() => {
              setActive("library");
              navigate("/library");
            }}
          >
            Library
          </li>
          <li
            className={`text-lg font-semibold cursor-pointer ${active === "uploads" ? "border-b-3 border-blue-500" : ""}`}
            onClick={() => {
              setActive("uploads");
              navigate("/uploads");
            }}
          >
            My Uploads
          </li>
          <li
            className={`text-lg font-semibold cursor-pointer ${active === "bookmarks" ? "border-b-3 border-blue-500" : ""}`}
            onClick={() => {
              setActive("bookmarks");
              navigate("/bookmarks");
            }}
          >
            Bookmarks
          </li>
        </ul>
        <div className="flex gap-3 justify-center items-center">
          <div>
            <h1 className="font-bold">Abebe Kebede</h1>
            <p>SE Student</p>
          </div>
          <button
            className="rounded-full w-15 h-15 bg-green-400 cursor-pointer"
            onClick={() => navigate("/profile")}
          ></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
