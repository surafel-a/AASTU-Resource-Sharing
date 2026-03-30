import {
  faAdd,
  faArrowTrendDown,
  faArrowTrendUp,
  faChevronLeft,
  faChevronRight,
  faFilePdf,
  faFlag,
  faFolder,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResourceOverview from "../components/admin/ResourceOverview";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import ResourceData from "../components/admin/ResourceData";

import { useResource } from "../contexts/ResourceContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ResourceManagement = () => {
  const {
    resources,
    getAllResources,
    loading: resourceLoading,
  } = useResource();

  if (resourceLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Manage Resources</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          Oversee and moderate all academic materials on the platform.
        </p>
        <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
          <FontAwesomeIcon icon={faAdd} />
          <p>Add Resource</p>
        </div>
      </section>

      {/* GRID CONTAINER */}
      <section className="grid grid-cols-3 gap-8 mb-8">
        <ResourceOverview
          iconBig={faFolder}
          iconSmall={faArrowTrendUp}
          iconDiscription="+12%"
          textTitle="Total Resources"
          textValue={resources.length}
          colorPrimary="blue"
          colorSecondary="green"
        />
        <ResourceOverview
          iconBig={faClock}
          iconSmall={faArrowTrendUp}
          iconDiscription="+5%"
          textTitle="Recently Added"
          textValue="42"
          colorPrimary="blue"
          colorSecondary="green"
        />
        <ResourceOverview
          iconBig={faFlag}
          iconSmall={faArrowTrendDown}
          iconDiscription="-2%"
          textTitle="Flagged Items"
          textValue="15"
          colorPrimary="red"
          colorSecondary="red"
        />
      </section>

      {/* GRID CONTAINER */}
      <section className="grid items-center grid-cols-[auto_1fr_1fr_1fr_auto_auto_auto] overflow-hidden bg-white shadow-xl rounded-xl border-2 border-gray-300">
        {/* <section className="grid items-center grid-cols-[auto_1fr_1fr_auto_auto_auto_auto] overflow-hidden bg-white shadow-xl rounded-xl"> */}
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
              <option value="">Resource Type</option>
              <option>PDF</option>
              <option>Notes</option>
              <option>Exam</option>
            </select>

            {/* More Filters */}
            <select className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]">
              <option value="">More Filters</option>
              <option>Approved</option>
              <option>Flagged</option>
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
          Title
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Category
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Author
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Date
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Status
        </p>
        <p className="py-6 pr-6 bg-[#e4e4e9] font-bold text-black/50 text-right uppercase">
          Actions
        </p>

        {/* RESOURCE ROW */}
        <ResourceData
          iconFile={faFilePdf}
          color="red"
          courseTitle="DSA 2023"
          courseDescription="Exam Guide"
          category="Software Eng."
          author="Abebe Molla"
          day="Oct 12"
          year="2023"
          status="Approved"
        />
        <ResourceData
          iconFile={faFilePdf}
          color="red"
          courseTitle="Applied Maths II"
          courseDescription="Assignment"
          category="Pre-Eng"
          author="Kebede Bekele"
          day="Oct 11"
          year="2023"
          status="Flagged"
        />
        <ResourceData
          iconFile={faFilePdf}
          color="red"
          courseTitle="Modern Architecture"
          courseDescription="Notes"
          category="Architecture"
          author="Hanna Tadesse"
          day="Oct 09"
          year="2023"
          status="Approved"
        />
        <ResourceData
          iconFile={faFilePdf}
          color="red"
          courseTitle="Concrete Design"
          courseDescription="PDF"
          category="Civil Eng."
          author="Samuel Yilma"
          day="Oct 05"
          year="2023"
          status="Approved"
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

export default ResourceManagement;
