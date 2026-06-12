import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBookmark as faBookmarkSolid,
  faDownload,
  faCalendar,
  faFileLines,
  faFileWord,
  faChevronLeft,
  faChevronRight,
  faFilePdf,
  faFilePowerpoint,
  faVideo,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

import ResourceLibraries from "../components/ResourceLibraries";

import { useState, useMemo, useEffect } from "react";

import { useBookmark } from "../contexts/BookmarkContext";
import { useResource } from "../contexts/ResourceContext";

const Library = () => {
  const ITEMS_PER_PAGE = 9;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Read search from URL on mount / URL change
  const urlSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(urlSearch);

  const [filters, setFilters] = useState({
    department: "",
    courseCode: "",
    year: "",
    fileType: "",
  });

  const { createBookmark, deleteBookmark, myBookmarks } = useBookmark();
  const { resources } = useResource();

  const approvedResources = resources.filter(
    (resource) => resource.status === "approved",
  );

  // Sync input when URL search changes (e.g. user comes from navbar)
  useEffect(() => {
    setSearchInput(urlSearch);
    setCurrentPage(1);
  }, [urlSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const isBookmarked = (resourceId) => {
    return myBookmarks?.some(
      (b) => String(b.resource?._id || b.resource) === String(resourceId),
    );
  };

  const handleBookmarkToggle = async (resourceId) => {
    try {
      const exists = isBookmarked(resourceId);
      if (exists) {
        await deleteBookmark(resourceId);
      } else {
        await createBookmark(resourceId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      setSearchParams({ search: trimmed });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const filteredResources = useMemo(() => {
    return approvedResources.filter((resource) => {
      const departmentMatch =
        !filters.department ||
        resource.department.split(" ")[0].toLowerCase() ===
          filters.department.toLowerCase();

      const courseMatch =
        !filters.courseCode || resource.course.code === filters.courseCode;

      const yearMatch =
        !filters.year || String(resource.course.year) === filters.year;

      const typeMatch =
        !filters.fileType ||
        resource.type.toLowerCase() === filters.fileType.toLowerCase();

      const searchTerm = urlSearch.toLowerCase();
      const searchMatch =
        !searchTerm ||
        resource.title?.toLowerCase().includes(searchTerm) ||
        resource.course?.code?.toLowerCase().includes(searchTerm) ||
        resource.course?.courseInstructor?.toLowerCase().includes(searchTerm) ||
        resource.department?.toLowerCase().includes(searchTerm);

      return (
        departmentMatch && courseMatch && yearMatch && typeMatch && searchMatch
      );
    });
  }, [approvedResources, filters, urlSearch]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);

  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredResources, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const getPageNumbers = () => {
    const maxVisible = 9;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "pdf":
        return faFilePdf;
      case "doc":
      case "docx":
      case "word":
        return faFileWord;
      case "ppt":
      case "pptx":
        return faFilePowerpoint;
      case "video":
        return faVideo;
      default:
        return faFileLines;
    }
  };

  return (
    <div className="bg-[#F6F6F8] min-h-screen py-6 md:py-10">
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-20 2xl:mx-32">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Student Resource Library
          </h1>

          <p className="text-base sm:text-lg lg:text-2xl font-semibold text-black/50 max-w-4xl">
            Discover academic materials uploaded by students and faculty at
            AASTU
          </p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="relative mb-6 max-w-xl">
          <FontAwesomeIcon
            className="absolute top-3.5 left-3 text-gray-500"
            icon={faSearch}
          />
          <input
            className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search by title, course code or instructor..."
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </form>

        {urlSearch && (
          <p className="mb-4 text-sm font-semibold text-blue-600">
            Showing results for: &ldquo;{urlSearch}&rdquo; (
            {filteredResources.length} found)
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-10">
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
            className="py-2 px-4 font-semibold bg-white border rounded-lg shadow-sm border-black/20 text-black/70 w-full sm:w-auto"
          >
            <option value="">Department</option>
            <option value="Software">Software</option>
            <option value="Electrical">Electrical</option>
            <option value="Electromechanical">Electromechanical</option>
          </select>

          <select
            value={filters.courseCode}
            onChange={(e) => handleFilterChange("courseCode", e.target.value)}
            className="py-2 px-4 font-semibold bg-white border rounded-lg shadow-sm border-black/20 text-black/70 w-full sm:w-auto"
          >
            <option value="">Course Code</option>
            <option value="ECEg">ECEg</option>
            <option value="Mng">Mng</option>
            <option value="Swg">Swg</option>
          </select>

          <select
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className="py-2 px-4 font-semibold bg-white border rounded-lg shadow-sm border-black/20 text-black/70 w-full sm:w-auto"
          >
            <option value="">Year</option>
            {[1, 2, 3, 4, 5, 6].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={filters.fileType}
            onChange={(e) => handleFilterChange("fileType", e.target.value)}
            className="py-2 px-4 font-semibold bg-white border rounded-lg shadow-sm border-black/20 text-black/70 w-full sm:w-auto"
          >
            <option value="">File Type</option>
            <option value="pdf">PDF</option>
            <option value="doc">DOC</option>
            <option value="ppt">PPT</option>
          </select>

          <button
            onClick={() => {
              setFilters({
                department: "",
                courseCode: "",
                year: "",
                fileType: "",
              });
              handleClearSearch();
            }}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            Clear Filters
          </button>

          <button
            onClick={() => navigate("/courses")}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            See All Courses
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {paginatedResources.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-500 font-semibold text-lg">
              No resources found{urlSearch ? ` for "${urlSearch}"` : ""}.
            </div>
          ) : (
            paginatedResources.map((resource) => (
              <ResourceLibraries
                key={resource._id}
                resourceId={resource._id}
                fileName={resource.title}
                fileType={resource.type}
                fileUrl={resource.fileUrl}
                lecturer={resource.course.courseInstructor}
                courseId={resource.course.code}
                downloads={resource.downloads}
                year={resource.course.year}
                fileIcon={getFileIcon(resource.type)}
                bookmarkIconR={faBookmarkRegular}
                bookmarkIconS={faBookmarkSolid}
                isBookmarked={isBookmarked(resource._id)}
                onBookmarkToggle={() => handleBookmarkToggle(resource._id)}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg lg:text-xl font-bold flex-wrap">
            <button onClick={prevPage} disabled={currentPage === 1}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="p-3 sm:p-4 border-2 rounded-xl border-black/15"
              />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 sm:px-6 py-3 border-2 rounded-xl ${
                  currentPage === page
                    ? "bg-[#1152D4] text-white"
                    : "border-black/15"
                }`}
              >
                {page}
              </button>
            ))}

            <button onClick={nextPage} disabled={currentPage === totalPages}>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="p-3 sm:p-4 border-2 rounded-xl border-black/15"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
