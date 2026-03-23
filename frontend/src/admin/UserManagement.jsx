import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faUserPlus,
  faUserShield,
  faBan,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import UserOverview from "../components/admin/UserOverview";
import UserRow from "../components/admin/UserRow";

const UserManagement = () => {
  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          Manage and oversee all registered students and platform
          administrators.
        </p>
        <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
          <FontAwesomeIcon icon={faUserPlus} />
          <p>Add New User</p>
        </div>
      </section>

      {/* USER OVERVIEW */}
      <section className="grid grid-cols-3 gap-5 mb-8">
        <UserOverview title="Total Users" value="1,240" description="+12%" />
        <UserOverview
          title="Active Students"
          value="1,180"
          description="+10%"
        />
        <UserOverview title="Admins" value="60" description="+2%" />
      </section>

      {/* GRID CONTAINER */}
      <section className="grid items-center grid-cols-[auto_1.5fr_1fr_auto_1fr_1fr_auto] overflow-hidden bg-white shadow-xl rounded-xl">
        {/* TOP NAV */}
        <div className="flex items-center col-span-7 gap-5 p-6 font-bold">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, ID or department..."
              className="w-full pl-10 pr-6 py-2 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute top-3 left-2 text-black/50"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Departments */}
            <select className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]">
              <option value="">All Departments</option>
              <option>Software Engineering</option>
              <option>Electrical Engineering</option>
              <option>Architecture</option>
            </select>

            {/* Roles */}
            <select className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]">
              <option value="">All Roles</option>
              <option>Admin</option>
              <option>Instructor</option>
              <option>Student</option>
            </select>

            {/* More Filters */}
            <select className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]">
              <option value="">More Filters</option>
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        {/* HEADER */}
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer accent-blue-600"
          />
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          User Details
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Student ID
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Department
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Role
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Status
        </p>
        <p className="py-6 pr-6 bg-[#e4e4e9] font-bold text-black/50 text-right uppercase">
          Actions
        </p>

        {/* USER ROW */}
        <UserRow
          name="Abebe Mengistu"
          ID="ETS1511/14"
          email="abebe.m@aastu.edu.et"
          department="Software Engineering"
          role="Student"
          status="Active"
        />
        <UserRow
          name="Hana Tadesse"
          ID="ETS0423/14"
          email="hana.t@aastu.edu.et"
          department="Architecture"
          role="Admin"
          status="Active"
        />
        <UserRow
          name="Kebede Belay"
          ID="ETS1740/14"
          email="kebede.b@aastu.edu.et"
          department="Electrical Engineering"
          role="Student"
          status="Suspended"
        />
        <UserRow
          name="Marta Alemu"
          ID="ETS0670/14"
          email="marta.a@aastu.edu.et"
          department="Mechanical Engineering"
          role="Student"
          status="Active"
        />

        {/* FOOTER */}
        <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-7">
          <p>Showing 4 of 12 resources</p>
          <button className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
            />

            <p className="px-4 py-2 rounded-lg cursor-pointer border-black/30  hover:bg-[#1152D4] hover:text-white">
              1
            </p>
            <p className="px-4 py-2 rounded-lg cursor-pointer border-black/30  hover:bg-[#1152D4] hover:text-white">
              2
            </p>
            <p className="px-4 py-2 rounded-lg cursor-pointer border-black/30  hover:bg-[#1152D4] hover:text-white">
              3
            </p>

            <FontAwesomeIcon
              icon={faChevronRight}
              className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserManagement;
