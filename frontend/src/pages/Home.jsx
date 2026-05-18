import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faDownload,
  faFilePdf,
  faFileWord,
  faBookOpen,
  faFileImage,
  faFileVideo,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

import RecentUploads from "../components/RecentUploads";
import welcomeImage from "../assets/welcomeImage.png";
import ContinueReading from "../components/ContinueReading";

import { splitName } from "../utilities/names";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

// CONTEXTS
import { useUser } from "../contexts/UserContext";
import { useResource } from "../contexts/ResourceContext";
import { useProgress } from "../contexts/ProgressContext";

const Home = () => {
  const { user, loading: userLoading } = useUser();
  const { progresses } = useProgress();
  const { resources, loading: resourceLoading } = useResource();
  const navigate = useNavigate();

  if (userLoading || resourceLoading) {
    return <LoadingSpinner />;
  }

  const splitedName = splitName(user?.name);

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

  return (
    <div className="bg-[#F6F6F8] min-h-screen py-6 md:py-10">
      {/* HERO SECTION */}
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-20 2xl:mx-32">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 bg-[#1152D4] px-6 sm:px-10 lg:px-16 py-10 lg:py-14 text-white rounded-2xl shadow-2xl">
          {/* TEXT */}
          <div className="w-full lg:w-[60%] flex flex-col gap-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Welcome back, {splitedName}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-100">
              Ready to crush your Engineering exams? Find the latest lecture
              notes and past papers shared by your peers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#1152D4] px-6 py-3 rounded-lg font-bold cursor-pointer hover:bg-gray-100 transition">
                View My Analytics
              </button>

              <button className="px-6 py-3 font-bold text-white border-white rounded-lg cursor-pointer border-2 hover:bg-white hover:text-[#1152D4] transition">
                Study Roadmap
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="w-full lg:w-[40%] flex justify-center">
            <img
              src={welcomeImage}
              alt="Welcome"
              className="w-full max-w-sm lg:max-w-md object-contain"
            />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col xl:flex-row gap-10 mt-10 mx-4 sm:mx-6 lg:mx-12 xl:mx-20 2xl:mx-32">
        {/* RECENT UPLOADS */}
        <div className="w-full xl:w-[60%] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Uploads</h2>

            <p
              className="text-[#1152D4] text-base sm:text-lg font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/library")}
            >
              View All
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {resources.slice(0, 4).map((resource) => (
              <RecentUploads
                key={resource._id}
                code={resource.course.code}
                icon={getFileIcon(resource.type)}
                course={resource.title}
                department={resource.department}
                views={resource.views}
                downloads={resource.downloads}
                fileExtension={resource.type}
              />
            ))}
          </div>
        </div>

        {/* CONTINUE READING */}
        <div className="w-full xl:w-[40%] flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Continue Reading</h2>

          {progresses.length > 0 ? (
            progresses.slice(0, 3).map((item) => {
              const totalPages = item.totalPages ?? 100;
              const pageRead = Math.round((item.progress / 100) * totalPages);

              return (
                <ContinueReading
                  key={item._id}
                  icon={faBookOpen}
                  course={item.resource?.title}
                  color="blue"
                  percentage={item.progress}
                  pageRead={pageRead}
                  totalPage={totalPages}
                />
              );
            })
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-5xl text-[#1152D4] mb-4"
              />

              <h3 className="text-2xl font-bold mb-2">
                No Reading Progress Yet
              </h3>

              <p className="text-black/50 font-semibold max-w-sm">
                Start reading resources from the library and your progress will
                appear here.
              </p>

              <button
                onClick={() => navigate("/library")}
                className="mt-6 bg-[#1152D4] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition cursor-pointer"
              >
                Explore Resources
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
