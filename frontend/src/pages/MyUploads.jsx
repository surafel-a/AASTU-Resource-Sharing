import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faCirclePlus,
  faFileLines,
  faFolder,
  faHourglassHalf,
  faMagnifyingGlass,
  faFilePdf,
  faDisplay,
  faFileAlt,
  faFileImage,
  faFileVideo,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import DataRow from "../components/DataRow";
import LoadingSpinner from "../components/LoadingSpinner";

// CONTEXTS
import { useResource } from "../contexts/ResourceContext";
import { formatDate } from "../utilities/formatDate";

const MyUploads = () => {
  const { myResources, loading } = useResource();

  const approvedCount = myResources.filter(
    (res) => res.status === "approved",
  ).length;
  const pendingCount = myResources.filter(
    (res) => res.status === "pending",
  ).length;

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
    <div className="bg-[#F6F6F8] h-full py-10">
      <div className="mx-50">
        <h1 className="mb-5 text-5xl font-bold">My Uploads</h1>
        <div className="flex items-center justify-between mb-5">
          <p className="text-2xl font-semibold text-black/50">
            Manage and track your contributed academic resources.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1152D4] text-white text-2xl font-semibold cursor-pointer">
            <div>
              <FontAwesomeIcon icon={faCirclePlus} className="" />
            </div>
            <p className="">Upload New Resource</p>
          </div>
        </div>

        {/* UPLOADS, APPROVED, PENDING */}
        <section className="grid grid-cols-3 gap-5 mb-8">
          <div className="p-6 bg-white shadow-xl rounded-xl">
            <h2 className="mb-3 text-xl font-bold text-black/50">
              Total Uploads
            </h2>
            <div className="flex items-center justify-between text-4xl font-bold">
              <p className="">{myResources.length}</p>
              <FontAwesomeIcon icon={faFolder} className="text-blue-500" />
            </div>
          </div>

          <div className="p-6 bg-white shadow-xl rounded-xl">
            <h2 className="mb-3 text-xl font-bold text-black/50">Approved</h2>
            <div className="flex items-center justify-between text-4xl font-bold">
              <p className="text-green-600">{approvedCount}</p>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-400"
              />
            </div>
          </div>

          <div className="p-6 bg-white shadow-xl rounded-xl">
            <h2 className="mb-3 text-xl font-bold text-black/50">Pending</h2>
            <div className="flex items-center justify-between text-4xl font-bold">
              <p className="text-orange-600">{pendingCount}</p>
              <FontAwesomeIcon
                icon={faHourglassHalf}
                className="text-orange-400"
              />
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <section className="grid grid-cols-[1fr_auto] gap-5 bg-white p-6 rounded-lg shadow-xl mb-8">
          <div className="relative">
            <input
              className="w-full pl-10 pr-6 py-2 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
              placeholder="Search your uploads..."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute top-3 left-2 text-black/50"
            />
          </div>
          <div className="flex items-center gap-2 font-bold">
            <p className="px-6 py-2 bg-[#1152D4] text-white rounded-4xl cursor-pointer">
              All
            </p>
            <p className="px-6 py-2 bg-[#e4e4e9] rounded-4xl cursor-pointer">
              Approved
            </p>
            <p className="px-6 py-2 bg-[#e4e4e9] rounded-4xl cursor-pointer">
              Pending
            </p>
            <p className="px-6 py-2 bg-[#e4e4e9] rounded-4xl cursor-pointer">
              Rejected
            </p>
          </div>
        </section>

        {myResources.length === 0 ? (
          <div className="py-20 text-center bg-white border-2 border-dashed border-black/20 rounded-xl">
            <div className="mb-3 text-4xl">📁</div>
            <p className="text-xl font-semibold text-black/60">
              No uploads yet
            </p>
            <p className="text-black/40">
              Your uploaded resources will appear here.
            </p>

            <button className="px-6 py-2 bg-[#1152D4] text-white rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-200 mt-5 cursor-pointer">
              Upload Resource
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center bg-white rounded-xl shadow-xl overflow-hidden">
            {/* HEADER */}
            <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
              Resource Name
            </p>
            <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
              Category
            </p>
            <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
              Date Uploaded
            </p>
            <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
              Status
            </p>
            <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
              Actions
            </p>

            {myResources.map((myResource) => (
              <DataRow
                key={myResource._id}
                fileIcon={getFileIcon(myResource.type)}
                fileName={myResource.title}
                fileSize="12 MB"
                fileType={myResource.type}
                category={myResource.category}
                dateUploaded={formatDate(myResource.createdAt)}
                status={myResource.status}
              />
            ))}

            {/* FOOTER */}
            <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-5">
              <p>Showing 4 of 12 resources</p>
              <button>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="cursor-pointer text-black/30"
                />
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="cursor-pointer"
                />
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MyUploads;
