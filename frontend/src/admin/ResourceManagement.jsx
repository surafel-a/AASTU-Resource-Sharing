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
import { faClock } from "@fortawesome/free-regular-svg-icons";

// ROUTER
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import LoadingSpinner from "../components/LoadingSpinner";
import ResourceData from "../components/admin/ResourceData";
import ResourceOverview from "../components/admin/ResourceOverview";

// CONTEXTS
import { useUser } from "../contexts/UserContext";
import { useResource } from "../contexts/ResourceContext";

// UTILITIES
import { formatDate } from "../utilities/formatDate";
import { formatFileSize } from "../utilities/formatFileSize";

const ResourceManagement = () => {
  const { user } = useUser();
  const { resources, loading: resourceLoading } = useResource();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const department = searchParams.get("department") || "";
  const type = searchParams.get("type") || "";
  const status = searchParams.get("status") || "";

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        res.title?.toLowerCase().includes(searchTerm) ||
        res.department?.toLowerCase().includes(searchTerm) ||
        res.uploadedBy?.name?.toLowerCase().includes(searchTerm);

      const matchesDepartment = department
        ? res.department === department
        : true;

      const matchesType = type ? res.type === type.toLowerCase() : true;

      const matchesStatus = status ? res.status === status.toLowerCase() : true;

      return matchesSearch && matchesDepartment && matchesType && matchesStatus;
    });
  }, [resources, search, department, type, status]);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  const totalPages = useMemo(() => {
    return Math.ceil(filteredResources.length / itemsPerPage);
  }, [filteredResources.length]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage]);

  const paginatedResources = useMemo(() => {
    return filteredResources.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResources, startIndex]);

  const goToPage = (page) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    setSearchParams({ page: safePage });
  };

  const handleSearch = (e) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("search", e.target.value);
      params.set("page", 1);
      return params;
    });
  };

  const updateFilter = (key, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) params.set(key, value);
      else params.delete(key);
      params.set("page", 1);
      return params;
    });
  };

  // if (resourceLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Manage Resources</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          Oversee and moderate all academic materials on the platform.
        </p>
        {/* <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
          <FontAwesomeIcon icon={faAdd} />
          <p>Add Resource</p>
        </div> */}
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
        {/* TOP NAV */}
        <div className="flex items-center col-span-7 gap-5 p-6 font-semibold text-black/70 text-lg">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, ID or department..."
              className="w-full pl-10 pr-6 py-2 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 "
              onChange={handleSearch}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute top-3 left-2 text-black/50"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Departments */}
            <select
              className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              onChange={(e) => updateFilter("department", e.target.value)}
            >
              <option value="">All Departments</option>
              <option>Software Engineering</option>
              <option>Electrical Engineering</option>
              <option>Architecture</option>
            </select>

            {/* Roles */}
            <select
              className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              onChange={(e) => updateFilter("type", e.target.value)}
            >
              <option value="">Resource Type</option>
              <option>PDF</option>
              <option>Notes</option>
              <option>Exam</option>
            </select>

            {/* More Filters */}
            <select
              className="px-4 py-2 bg-[#F6F6F8] rounded-lg font-semibold text-black/60 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              onChange={(e) => updateFilter("status", e.target.value)}
            >
              <option value="">Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
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
        {paginatedResources.map((resource) => (
          <ResourceData
            key={resource._id}
            resourceId={resource._id}
            fileType={resource.type}
            fileSize={formatFileSize(resource.fileSize)}
            courseTitle={resource.title}
            category={resource.department}
            author={resource?.uploadedBy?.name}
            status={resource.status}
            visibility={resource.visibility}
            date={formatDate(resource.createdAt)}
          />
        ))}

        {/* FOOTER */}
        <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-7">
          <p>
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredResources.length)} of{" "}
            {filteredResources.length} resources
          </p>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => goToPage(currentPage - 1)}
              className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
            />

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-[#1152D4] hover:text-white ${
                    currentPage === page ? "bg-[#1152D4] text-white" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => goToPage(currentPage + 1)}
              className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourceManagement;
