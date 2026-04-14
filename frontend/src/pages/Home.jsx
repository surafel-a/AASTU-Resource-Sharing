import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faDownload,
  faFilePdf,
  faFileWord,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import RecentUploads from "../components/RecentUploads";
import welcomeImage from "../assets/welcomeImage.png";
import ContinueReading from "../components/ContinueReading";

import { splitName } from "../utilities/names";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

// CONTEXtS
import { useUser } from "../contexts/UserContext";
import { useResource } from "../contexts/ResourceContext";

const Home = () => {
  const { user, loading: userLoading } = useUser();
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
    <div className="bg-[#F6F6F8] min-h-screen py-10">
      <div className="mx-50 flex gap-5 bg-[#1152D4] px-20 py-15 text-white rounded-2xl shadow-2xl">
        <div className="w-[60%] flex flex-col gap-5">
          <h1 className="text-5xl font-bold">Welcome back, {splitedName}</h1>
          <p className="text-xl">
            Ready to crush your Engineering exams? Find the latest lecture notes
            and past papers shared by your peers.
          </p>
          <div className="flex gap-5">
            <button className="bg-white text-[#1152D4] px-8 py-3 rounded-lg font-bold cursor-pointer">
              View My Analytics
            </button>
            <button className="px-8 py-3 font-bold text-white border-white rounded-lg cursor-pointer border-3">
              Study Roadmap
            </button>
          </div>
        </div>

        <div className="w-[40%]">
          <img
            src={welcomeImage}
            alt="Welcome Image"
            className="object-cover w-100 h-45"
          />
        </div>
      </div>

      <div className="flex gap-10 mt-10 mx-50">
        {/* RECENT UPLOADS */}
        <div className="w-[60%] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Uploads</h2>
            <p
              className="text-[#1152D4] text-lg font-semibold cursor-pointer"
              onClick={() => navigate("/library")}
            >
              View All
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 rounded-xl">
            {resources.slice(0, 4).map((resource) => (
              <RecentUploads
                key={resource._id}
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
        <div className="w-[40%] flex flex-col gap-5">
          <div className="">
            <h2 className="text-2xl font-bold">Continue Reading</h2>
          </div>
          <ContinueReading
            icon={faBookOpen}
            course="Data Structure and Algorithms"
            color="blue"
            percentage="75"
            pageRead="45"
            totalPage="60"
          />
          <ContinueReading
            icon={faBookOpen}
            course="Compiler Design Notes"
            color="orange"
            pageRead="2"
            totalPage="10"
            percentage="20"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
