import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as faBookmarkSolid,
  faDownload,
  faCalendar,
  faFileLines,
  faFileWord,
  faDisplay,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import ResourceLibraries from "../components/ResourceLibraries";
import { useState, useMemo } from "react";

// CONTEXTS
import { useBookmark } from "../contexts/BookmarkContext";
import { useResource } from "../contexts/ResourceContext";

const Library = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    department: "",
    courseCode: "",
    year: "",
    fileType: "",
  });
  const { myBookmarks, setMyBookmarks, createBookmark, deleteBookmark } =
    useBookmark();
  const { resources, loading: resourceLoading } = useResource();

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

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
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

      return departmentMatch && courseMatch && yearMatch && typeMatch;
    });
  }, [resources, filters]);

  const getFileIcon = (type) => {
    switch (type) {
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
    <div className="bg-[#F6F6F8] min-h-screen py-10">
      <div className="mr-20 ml-50">
        <h1 className="mb-5 text-5xl font-bold">Student Resource Library</h1>
        <p className="mb-5 text-2xl font-semibold text-black/50">
          Discover academic materials uploaded by students and faculty at AASTU
        </p>

        <div className="flex items-center gap-5 mb-10">
          <div className="">
            <select
              value={filters.department}
              onChange={(e) => handleFilterChange("department", e.target.value)}
              className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70"
            >
              <option value="">Department</option>
              <option value="Software">Software</option>
              <option value="Electrical">Electrical</option>
              <option value="Electromechanical">Electromechanical</option>
            </select>
          </div>
          <div>
            <select
              value={filters.courseCode}
              onChange={(e) => handleFilterChange("courseCode", e.target.value)}
              className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70"
              className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70"
            >
              <option value="">Course Code</option>
              <option value="ECEg">ECEg</option>
              <option value="Mng">Mng</option>
              <option value="Swg">Swg</option>
            </select>
          </div>
          <div>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70"
            >
              <option value="">Year</option>
              {[1, 2, 3, 4, 5, 6].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filters.fileType}
              onChange={(e) => handleFilterChange("fileType", e.target.value)}
              className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70"
            >
              <option value="">File Type</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
              <option value="ppt">PPT</option>
            </select>
          </div>
          <div>
            <p
              onClick={() =>
                setFilters({
                  department: "",
                  courseCode: "",
                  year: "",
                  fileType: "",
                })
              }
              className="text-lg font-bold text-blue-600 cursor-pointer pl-7"
            >
              Clear Filters
            </p>
          </div>

          <p
            onClick={() => navigate("/courses")}
            className="text-lg font-bold text-blue-600 capitalize cursor-pointer pl-7"
          >
            See All Courses
          </p>
        </div>

        {/* Library Container */}
        <div className="grid grid-cols-4 gap-10 mb-10">
          {/* Each Library */}
          {filteredResources.map((resource) => (
            <ResourceLibraries
              key={resource._id}
              resourceId={resource._id}
              fileName={resource.title}
              fileType={resource.type}
              lecturer={resource.course.courseInstructor}
              courseId={resource.course.code}
              downloads={resource.downloads}
              year={resource.course.year}
              fileIcon={getFileIcon(resource.type)}
              downloadIcon={faDownload}
              calanderIcon={faCalendar}
              bookmarkIconR={faBookmarkRegular}
              bookmarkIconS={faBookmarkSolid}
              isBookmarked={isBookmarked(resource._id)}
              onBookmarkToggle={() => handleBookmarkToggle(resource._id)}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 text-2xl font-bold">
          <div className="cursor-pointer mr-7">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="p-4 border-2 rounded-xl border-black/15 text-black/50"
            />
          </div>
          <p className="px-6 py-4 bg-[#1152D4] text-white border-2 border-black/15 rounded-xl cursor-pointer">
            1
          </p>
          <p className="px-6 py-4 border-2 cursor-pointer rounded-xl border-black/15">
            2
          </p>
          <p className="px-6 py-4 border-2 cursor-pointer rounded-xl border-black/15">
            3
          </p>
          <p className="px-3 py-2">...</p>
          <p className="px-6 py-4 border-2 cursor-pointer rounded-xl border-black/15">
            12
          </p>
          <div className="cursor-pointer ml-7">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="p-4 border-2 rounded-xl border-black/15 text-black/70"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
