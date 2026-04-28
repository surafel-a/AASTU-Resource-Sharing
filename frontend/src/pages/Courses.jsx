import {
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
  faFilter,
  faGraduationCap,
  faLayerGroup,
  faMagnifyingGlass,
  faPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseLists from "../components/CourseLists";
import { useCourse } from "../contexts/CourseContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMemo, useState } from "react";
import GoBackButton from "../components/GoBackButton";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { courses, loading } = useCourse();
  const navigate = useNavigate();

  const departmentOptions = [
    ...new Set(courses.map((course) => course.department)),
  ];

  const [filters, setFilters] = useState({
    department: "",
    year: "",
    semester: "",
    search: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const departmentMatch =
        !filters.department || course.department === filters.department;

      const yearMatch = !filters.year || String(course.year) === filters.year;

      // const semesterMatch =
      //   !filters.semester || String(course.semester) === filters.semester;

      const semesterMatch =
        !filters.semester || course.semester === Number(filters.semester);

      const search = filters.search.toLowerCase();

      const searchMatch =
        !search ||
        course.courseInstructor.toLowerCase().includes(search) ||
        course.department.toLowerCase().includes(search) ||
        course.name.toLowerCase().includes(search);

      return departmentMatch && yearMatch && semesterMatch && searchMatch;
    });
  }, [courses, filters]);

  return (
    <div className="bg-[#F6F6F8] min-h-screen py-10">
      <div className="mx-50">
        <GoBackButton />

        <h1 className="mb-5 text-5xl font-bold">Courses</h1>
        <div className="flex items-center justify-between mb-5">
          <p className="text-2xl font-semibold text-black/50">
            Browse and manage all departments and courses
          </p>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1152D4] text-white text-xl font-semibold cursor-pointer"
            onClick={() => navigate("/courses/add")}
          >
            <FontAwesomeIcon icon={faPlus} className="" />
            <p className="capitalize">Add new course</p>
          </div>
        </div>

        {/* TOP NAV */}
        <section className="px-4 py-1 mb-8 bg-white rounded-lg shadow-xl">
          <div className="flex items-center col-span-7 gap-5 p-6 font-bold">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search Instructor or department..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-6 py-2 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute top-3 left-2 text-black/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-0.5 self-stretch bg-gray-400 rounded-full"></div>

              {/* DEPARTMENT */}
              <select
                value={filters.department}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
                className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              >
                <option value="">All Departments</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              {/* YEARS */}
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              >
                <option value="">All Years</option>

                {[1, 2, 3, 4, 5, 6].map((y) => (
                  <option key={y} value={y}>
                    {y} Year
                  </option>
                ))}
              </select>

              {/* SEMESTER */}
              <select
                value={filters.semester}
                onChange={(e) => handleFilterChange("semester", e.target.value)}
                className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              >
                <option value="">All Semesters</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
              </select>

              {/* CLEAR FILTERS */}
              <p
                onClick={() =>
                  setFilters({
                    department: "",
                    year: "",
                    semester: "",
                    search: "",
                  })
                }
                className="font-bold text-blue-600 cursor-pointer"
              >
                Clear Filters
              </p>
            </div>
          </div>
        </section>

        {/* COURSES LIST */}
        <section className="grid grid-cols-3 gap-5">
          {loading ? (
            <div className="flex items-center justify-center col-span-3">
              <LoadingSpinner fullScreen={false} />
            </div>
          ) : (
            filteredCourses.map((course) => (
              <CourseLists
                key={course._id}
                courseId={course._id}
                courseCode={course.code}
                courseName={course.name}
                courseInstructor={course.courseInstructor}
                department={course.department}
                year={course.year}
                semester={course.semester}
              />
            ))
          )}
        </section>

        <div className="w-full h-0.5 rounded-full bg-black/40 my-15"></div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">
            Showing <span className="text-blue-600">10</span> of{" "}
            <span className="text-blue-600">40</span> courses
          </p>

          <div className="flex items-center justify-center gap-3 text-xl font-bold">
            <div className="mr-2 cursor-pointer ">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="p-4 border-2 rounded-xl border-black/15 text-black/50"
              />
            </div>
            <p className="px-4 py-2 bg-[#1152D4] text-white border-2 border-black/15 rounded-xl cursor-pointer">
              1
            </p>
            <p className="px-4 py-2 border-2 cursor-pointer rounded-xl border-black/15">
              2
            </p>
            <p className="px-4 py-2 border-2 cursor-pointer rounded-xl border-black/15">
              3
            </p>
            <p className="px-3 py-2">...</p>
            <p className="px-4 py-2 border-2 cursor-pointer rounded-xl border-black/15">
              12
            </p>
            <div className="ml-2 cursor-pointer">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="p-4 border-2 rounded-xl border-black/15 text-black/70"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
