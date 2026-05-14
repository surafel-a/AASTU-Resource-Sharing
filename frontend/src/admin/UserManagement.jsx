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

import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const UserManagement = () => {
  const { users, loading: usersLoading } = useUser();
  const USERS_PER_PAGE = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.universityId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "" || user.department === selectedDepartment;

    const matchesRole =
      selectedRole === "" ||
      (user.role || "").toLowerCase() === selectedRole.toLowerCase();

    const matchesStatus =
      selectedStatus === "" ||
      (user.status || "").toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;

  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const adminsCount = users.filter(
    (user) => user.role.toLowerCase() === "admin",
  ).length;

  const activeUsersCount = users.filter(
    (user) => (user.status || "").toLowerCase() === "active",
  ).length;

  if (usersLoading) {
    return <LoadingSpinner />;
  }

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
        <UserOverview
          title="Total Users"
          value={users.length}
          description="+12%"
        />
        <UserOverview
          title="Active Students"
          value={activeUsersCount}
          description="+10%"
        />
        <UserOverview title="Admins" value={adminsCount} description="+2%" />
      </section>

      {/* GRID CONTAINER */}
      <section className="grid items-center grid-cols-[auto_1.5fr_1fr_auto_1fr_1fr_auto] overflow-hidden bg-white shadow-xl rounded-xl">
        {/* TOP NAV */}
        <div className="flex items-center col-span-7 gap-5 p-6 font-semibold">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, ID or department..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-6 py-2 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute top-3 left-2 text-black/50"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Departments */}
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/50 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
            >
              <option value="">All Departments</option>
              <option>Software Engineering</option>
              <option>Electrical Engineering</option>
              <option>Architecture</option>
            </select>

            {/* Roles */}
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
            >
              <option value="">All Roles</option>
              <option>Admin</option>
              <option>Instructor</option>
              <option>Student</option>
            </select>

            {/* More Filters */}
            <select className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]">
              <option value="">Status</option>
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

        {currentUsers.map((user) => (
          <UserRow
            key={user._id}
            userId={user._id}
            name={user.name}
            universityId={user.universityId}
            email={user.email}
            department={user.department}
            role={user.role}
            status={user.status || "Active"}
            photo={user.photo}
          />
        ))}

        {/* FOOTER */}
        <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-7">
          <p>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)}{" "}
            of {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            {/* PREVIOUS */}
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={handlePrevious}
              className={`p-3 rounded-full transition-all duration-200 cursor-pointer
      ${
        currentPage === 1
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-white hover:text-[#1152D4]"
      }`}
            />

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200
                  ${
                    currentPage === page
                      ? "bg-[#1152D4] text-white"
                      : "hover:bg-[#1152D4] hover:text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* NEXT */}
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={handleNext}
              className={`p-3 rounded-full transition-all duration-200 cursor-pointer
              ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-white hover:text-[#1152D4]"
              }`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserManagement;
