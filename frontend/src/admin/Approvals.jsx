import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faCheckDouble,
  faFilePdf,
  faFilter,
  faCheck,
  faFileLines,
  faCancel,
  faX,
  faFilePowerpoint,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faFile } from "@fortawesome/free-regular-svg-icons";

// ROUTER
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

// COMPONENTS
import ApprovalsOverview from "../components/admin/ApprovalsOverview";
import ApprovalsPendings from "../components/admin/ApprovalsPendings";

// CONTEXTS
import { useResource } from "../contexts/ResourceContext";

// UTILITIES
import { formatDate } from "../utilities/formatDate";
import { formatFileSize } from "../utilities/formatFileSize";

const Approvals = () => {
  const { resources } = useResource();
  const [searchParams, setSearchParams] = useSearchParams();

  const pendingResources = resources.filter(
    (resource) => resource.status === "pending",
  );

  const approvedResources = resources.filter(
    (resource) => resource.status === "approved",
  );

  const rejectedResources = resources.filter(
    (resource) => resource.status === "rejected",
  );

  // FOOTER NAVIGATION LOGIC
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  const totalPages = useMemo(
    () => Math.ceil(resources.length / itemsPerPage),
    [resources.length],
  );
  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage],
  );
  const paginatedResources = useMemo(
    () => resources.slice(startIndex, startIndex + itemsPerPage),
    [resources, startIndex],
  );

  const goToPage = (page) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    setSearchParams({ page: safePage });
  };

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Pending Approvals</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          <span className="text-[#1152D4]">12</span> items waiting for review
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 px-4 py-2 font-semibold bg-white rounded-lg cursor-pointer text-black/60">
            <FontAwesomeIcon icon={faFilter} />
            <p>Filter</p>
          </div>

          <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faCheckDouble} />
            <p>Bulk Actions</p>
          </div>
        </div>
      </section>

      {/* GRID CONTAINER */}
      <section className="grid grid-cols-3 gap-8 mb-8">
        {/* INDIVIDUAL GRIDS */}
        <ApprovalsOverview
          icon={faFilePdf}
          iconDiscription="+12%"
          textTitle="New Submissions"
          textValue={`${pendingResources.length} Items`}
          colorPrimary="blue"
          colorSecondary="green"
        />
        <ApprovalsOverview
          icon={faClock}
          iconDiscription="Urgent"
          textTitle="Avg. Wait Time"
          textValue="4.2 Hours"
          colorPrimary="orange"
          colorSecondary="orange"
        />
        <ApprovalsOverview
          icon={faArrowTrendUp}
          iconDiscription="Weekly"
          textTitle="Total Shared"
          textValue="1,204 Items"
          colorPrimary="purple"
          colorSecondary="purple"
        />
      </section>

      <section className="grid items-center grid-cols-[auto_1.5fr_1fr_1fr_1fr_auto] overflow-hidden bg-white shadow-xl rounded-xl">
        {/* HEADER */}
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer accent-blue-600"
          />
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Resource Title
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Contributor
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Department
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Submitted
        </p>
        <p className="py-6 pr-6 bg-[#e4e4e9] font-bold text-black/50 text-right uppercase">
          Actions
        </p>

        {/* APPROVALS PENDINGS */}

        {paginatedResources.map((resource) => (
          <ApprovalsPendings
            key={resource._id}
            resourceId={resource._id}
            fileType={resource.type}
            fileSize={formatFileSize(resource.fileSize)}
            color="orange"
            course={resource.title}
            contributor={resource?.uploadedBy}
            department={resource.department}
            date={formatDate(resource.createdAt)}
            status={resource.status}
          />
        ))}

        {/* FOOTER */}
        <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-6">
          <p>
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, resources.length)} of{" "}
            {resources.length} resources
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

export default Approvals;
