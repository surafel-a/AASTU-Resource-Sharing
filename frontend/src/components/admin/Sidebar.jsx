import logo from '../../assets/Logo.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine,    // Analytics
  faCheckCircle,  // Approvals
  faUsers,        // Users
  faFolderOpen,
  faFileAlt,       // Reports
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full row-span-2 p-4 border-r-3 border-black/15">
      <div className='flex items-center gap-2'>
        <img className='text-black' src={logo} alt="Logo"/>
        <div className='font-bold'>
          <h1 className='text-xl'>AASTU Admin</h1>
          <p className='text-black/50'>Resource Platform</p>
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-10'>
        
        <NavLink to="dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-xl font-semibold rounded-lg cursor-pointer 
            ${isActive ? "bg-[#1152D4] text-white" : "text-black/60"}`
          }
        >
          <FontAwesomeIcon icon={faChartLine} />
          <p>Analytics</p>
        </NavLink>

        <NavLink to="approvals"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-xl font-semibold rounded-lg cursor-pointer 
            ${isActive ? "bg-[#1152D4] text-white" : "text-black/60"}`
          }
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          <p>Approvals</p>
        </NavLink>

        <NavLink to="resource-management"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-xl font-semibold rounded-lg cursor-pointer 
            ${isActive ? "bg-[#1152D4] text-white" : "text-black/60"}`
          }
        >
          <FontAwesomeIcon icon={faFolderOpen} />
          <p>Resources</p>
        </NavLink>

        <NavLink to="user-management"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-xl font-semibold rounded-lg cursor-pointer 
            ${isActive ? "bg-[#1152D4] text-white" : "text-black/60"}`
          }
        >
          <FontAwesomeIcon icon={faUsers} />
          <p>Users</p>
        </NavLink>

        <NavLink to="report-management"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-xl font-semibold rounded-lg cursor-pointer 
            ${isActive ? "bg-[#1152D4] text-white" : "text-black/60"}`
          }
        >
          <FontAwesomeIcon icon={faFileAlt} />
          <p>Reports</p>
        </NavLink>
        
      </div>

      <div className='flex items-center justify-center w-full gap-1 py-2 mt-auto text-xl font-semibold border-2 rounded-lg cursor-pointer r border-black/20'>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <p>Logout</p>
      </div>       
    </div>
  )
}

export default Sidebar
