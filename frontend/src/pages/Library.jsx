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
import { useBookmark } from "../contexts/BookmarkContext";
import { useResource } from "../contexts/ResourceContext";

const Library = () => {
  const { myBookmarks, setMyBookmarks, createBookmark, deleteBookmark } =
    useBookmark();
  const { resources, loading: resourceLoading } = useResource();

  const isBookmarked = (resourceId) => {
    return myBookmarks?.some(
      (b) => String(b.resource?._id || b.resource) === String(resourceId),
    );
  };

  // const handleBookmarkToggle = async (resourceId) => {
  //   try {
  //     const exists = isBookmarked(resourceId);

  //     if (exists) {
  //       await deleteBookmark(resourceId);
  //       setMyBookmarks((prev) =>
  //         prev.filter((b) => b.resource._id !== resourceId),
  //       );
  //     } else {
  //       await createBookmark(resourceId);
  //       setMyBookmarks((prev) => [...prev, newBookmark]);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
            <select className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70">
              <option disabled selected>
                Department
              </option>
              <option>Software</option>
              <option>Electrical</option>
              <option>Electromechanical</option>
            </select>
          </div>
          <div>
            <select className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70">
              <option disabled selected>
                Course Code
              </option>
              <option>ECEg</option>
              <option>Mng</option>
              <option>Swg</option>
            </select>
          </div>
          <div>
            <select className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70">
              <option disabled selected>
                Year
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </div>
          <div>
            <select className="py-2 pl-4 pr-2 font-semibold bg-white border rounded-md shadow-md border-black/20 text-black/70">
              <option disabled selected>
                File Type
              </option>
              <option>PDF</option>
              <option>DOCX</option>
              <option>PPT</option>
            </select>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-600 cursor-pointer pl-7">
              Clear Filters
            </p>
          </div>
        </div>

        {/* Library Container */}
        <div className="grid grid-cols-4 gap-10 mb-10">
          {/* Each Library */}
          {resources.map((resource) => (
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
