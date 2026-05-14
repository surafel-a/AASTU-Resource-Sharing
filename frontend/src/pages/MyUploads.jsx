import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faCirclePlus,
  faFolder,
  faHourglassHalf,
  faMagnifyingGlass,
  faFilePdf,
  faFileAlt,
  faFileImage,
  faFileVideo,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";

// ROUTER
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// COMPONENTS
import DataRow from "../components/DataRow";
import LoadingSpinner from "../components/LoadingSpinner";

// CONTEXTS
import { useResource } from "../contexts/ResourceContext";

// UTILITIES
import { formatDate } from "../utilities/formatDate";
import { formatFileSize } from "../utilities/formatFileSize";

const MyUploads = () => {
  const { myResources, loading } = useResource();

  const [activeFilter, setActiveFilter] = useState("all");

  const navigate = useNavigate();

  // COUNTS
  const approvedCount = myResources.filter(
    (res) => res.status === "approved",
  ).length;

  const pendingCount = myResources.filter(
    (res) => res.status === "pending",
  ).length;

  // FILTER BUTTON STYLE
  const getFilterClass = (filter) =>
    activeFilter === filter
      ? "px-4 sm:px-6 py-2 bg-[#1152D4] text-white rounded-full cursor-pointer transition-all duration-200"
      : "px-4 sm:px-6 py-2 bg-[#e4e4e9] rounded-full cursor-pointer transition-all duration-200 hover:bg-[#d6d6dc]";

  // FILTERED RESOURCES
  const filteredResources =
    activeFilter === "all"
      ? myResources
      : myResources.filter((r) => r.status === activeFilter);

  // FILE ICONS
  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "pdf":
        return faFilePdf;

      case "doc":
      case "docx":
        return faFileWord;

      case "jpg":
      case "jpeg":
      case "png":
        return faFileImage;

      case "mp4":
      case "video":
        return faFileVideo;

      default:
        return faFileAlt;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-[#F6F6F8] min-h-screen py-6 md:py-10">
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-20 2xl:mx-32">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              My Uploads
            </h1>

            <p className="text-base sm:text-lg lg:text-2xl font-semibold text-black/50 max-w-3xl">
              Manage and track your contributed academic resources.
            </p>
          </div>

          {/* UPLOAD BUTTON */}
          <button
            onClick={() => navigate("/uploads/add")}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1152D4] text-white text-base sm:text-lg font-semibold cursor-pointer hover:bg-blue-700 transition"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            <p>Upload New Resource</p>
          </button>
        </div>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {/* TOTAL */}
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-3 text-lg font-bold text-black/50">
              Total Uploads
            </h2>

            <div className="flex items-center justify-between text-3xl sm:text-4xl font-bold">
              <p>{myResources.length}</p>

              <FontAwesomeIcon icon={faFolder} className="text-blue-500" />
            </div>
          </div>

          {/* APPROVED */}
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-3 text-lg font-bold text-black/50">Approved</h2>

            <div className="flex items-center justify-between text-3xl sm:text-4xl font-bold">
              <p className="text-green-600">{approvedCount}</p>

              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-400"
              />
            </div>
          </div>

          {/* PENDING */}
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-3 text-lg font-bold text-black/50">Pending</h2>

            <div className="flex items-center justify-between text-3xl sm:text-4xl font-bold">
              <p className="text-orange-600">{pendingCount}</p>

              <FontAwesomeIcon
                icon={faHourglassHalf}
                className="text-orange-400"
              />
            </div>
          </div>
        </section>

        {/* SEARCH + FILTERS */}
        <section className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg mb-8 flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between">
          {/* SEARCH */}
          <div className="relative w-full xl:max-w-xl">
            <input
              className="w-full pl-10 pr-6 py-3 rounded-xl bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
              placeholder="Search your uploads..."
            />

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute top-4 left-3 text-black/50"
            />
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap items-center gap-3 font-bold">
            <button
              onClick={() => setActiveFilter("all")}
              className={getFilterClass("all")}
            >
              All
            </button>

            <button
              onClick={() => setActiveFilter("approved")}
              className={getFilterClass("approved")}
            >
              Approved
            </button>

            <button
              onClick={() => setActiveFilter("pending")}
              className={getFilterClass("pending")}
            >
              Pending
            </button>

            <button
              onClick={() => setActiveFilter("rejected")}
              className={getFilterClass("rejected")}
            >
              Rejected
            </button>
          </div>
        </section>

        {/* EMPTY STATE */}
        {filteredResources.length === 0 ? (
          <div className="py-20 text-center bg-white border-2 border-dashed border-black/20 rounded-2xl">
            <div className="mb-3 text-4xl">📁</div>

            <p className="text-xl font-semibold text-black/60">
              No uploads yet
            </p>

            <p className="text-black/40">
              Your uploaded resources will appear here.
            </p>

            <button className="px-6 py-3 bg-[#1152D4] text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 mt-5 cursor-pointer">
              Upload Resource
            </button>
          </div>
        ) : (
          /* TABLE */
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <section className="min-w-[900px] grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center bg-white overflow-hidden">
              {/* HEADER */}
              <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
                Resource Name
              </p>

              <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
                Category
              </p>

              <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
                Date Uploaded
              </p>

              <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
                Status
              </p>

              <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
                Actions
              </p>

              {/* ROWS */}
              {filteredResources.map((myResource) => (
                <DataRow
                  key={myResource._id}
                  resourceId={myResource._id}
                  fileIcon={getFileIcon(myResource.type)}
                  fileName={myResource.title}
                  fileSize={formatFileSize(myResource.fileSize)}
                  fileType={myResource.type}
                  category={myResource.category}
                  dateUploaded={formatDate(myResource.createdAt)}
                  status={myResource.status}
                />
              ))}

              {/* FOOTER */}
              <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-5">
                <p>Showing {filteredResources.length} resources</p>

                <div className="flex items-center gap-4 text-lg">
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="cursor-pointer text-black/30 hover:text-black/60"
                  />

                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="cursor-pointer hover:text-black"
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUploads;
