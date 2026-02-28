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

const Home = () => {
  return (
    <div className="bg-[#F6F6F8] py-10">
      <div className="mx-50 flex gap-5 bg-[#1152D4] px-20 py-15 text-white rounded-2xl shadow-2xl">
        <div className="w-[60%] flex flex-col gap-5">
          <h1 className="font-bold text-5xl">Welcome back, Abebe</h1>
          <p className="text-xl">
            Ready to crush your Engineering exams? Find the latest lecture notes
            and past papers shared by your peers.
          </p>
          <div className="flex gap-5">
            <button className="bg-white text-[#1152D4] px-8 py-3 rounded-lg font-bold cursor-pointer">
              View My Analytics
            </button>
            <button className="border-3 border-white text-white px-8 py-3 rounded-lg font-bold cursor-pointer">
              Study Roadmap
            </button>
          </div>
        </div>

        <div className="w-[40%]">
          <img
            src={welcomeImage}
            alt="Welcome Image"
            className="w-100 h-45 object-cover"
          />
        </div>
      </div>

      <div className="mx-50 mt-10 flex gap-10">
        {/* RECENT UPLOADS */}
        <div className="w-[60%] flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl">Recent Uploads</h2>
            <p className="text-[#1152D4] text-lg font-semibold">View All</p>
          </div>

          <div className="grid grid-cols-2 gap-5 rounded-xl">
            <RecentUploads
              icon={faFilePdf}
              course="Applied Mathematics III"
              department="Freshman Department"
              views="1.2K"
              downloads="450"
              fileExtension="PDF"
            />
            <RecentUploads
              icon={faFileWord}
              course="Database System"
              department="Software Engineering"
              views="850"
              downloads="120"
              fileExtension="DOCX"
            />
            <RecentUploads
              icon={faFilePdf}
              course="Applied Mathematics III"
              department="Freshman Department"
              views="1.2K"
              downloads="450"
              fileExtension="PDF"
            />
            <RecentUploads
              icon={faFileWord}
              course="Database System"
              department="Software Engineering"
              views="850"
              downloads="120"
              fileExtension="DOCX"
            />
          </div>
        </div>

        {/* CONTINUE READING */}
        <div className="w-[40%] flex flex-col gap-5">
          <div className="">
            <h2 className="font-bold text-2xl">Continue Reading</h2>
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
