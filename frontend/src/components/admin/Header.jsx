import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="flex items-center justify-between gap-10 px-6 py-2 border-b-3 border-black/15">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search resources, users or reports..."
          className="w-[70%] pl-10 pr-6 py-2 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute top-3 left-2 text-black/50"
        />
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1 text-xl text-black/50">
          <FontAwesomeIcon
            icon={faBell}
            className="p-3 bg-white hover:bg-[#F6F6F8] rounded-full transform transition-all duration-300 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faGear}
            className="p-3 bg-white hover:bg-[#F6F6F8] rounded-full transform transition-all duration-300 cursor-pointer"
          />
        </div>
        <div className="w-0.5 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex items-center justify-center gap-3">
          <div>
            <h1 className="font-bold text-end">Abebe Kebede</h1>
            <p className="text-sm font-bold uppercase text-black/40">
              System Administrator
            </p>
          </div>
          <button
            className="bg-green-400 rounded-full cursor-pointer w-15 h-15"
            onClick={() => navigate("/profile")}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Header;
