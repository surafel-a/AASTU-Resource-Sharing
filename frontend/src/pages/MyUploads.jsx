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
} from "@fortawesome/free-solid-svg-icons";
import DataRow from "../components/DataRow";

const MyUploads = () => {
  return (
    <div className="bg-[#F6F6F8] py-10">
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
              <p className="">12</p>
              <FontAwesomeIcon icon={faFolder} className="text-blue-500" />
            </div>
          </div>

          <div className="p-6 bg-white shadow-xl rounded-xl">
            <h2 className="mb-3 text-xl font-bold text-black/50">Approved</h2>
            <div className="flex items-center justify-between text-4xl font-bold">
              <p className="text-green-600">8</p>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-400"
              />
            </div>
          </div>

          <div className="p-6 bg-white shadow-xl rounded-xl">
            <h2 className="mb-3 text-xl font-bold text-black/50">Pending</h2>
            <div className="flex items-center justify-between text-4xl font-bold">
              <p className="text-orange-600">3</p>
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

          {/* DATA ROW */}
          <DataRow
            fileIcon={faFilePdf}
            fileName="Fluid Mechanics - Final Review"
            fileSize="2.4 MB"
            fileType="PDF"
            category="Exam Prep"
            dateUploaded="Oct 12, 2023"
            status="Approved"
          />
          <DataRow
            fileIcon={faFileLines}
            fileName="Thermodynamics Lab Report"
            fileSize="1.1 MB"
            fileType="DOCX"
            category="Templates"
            dateUploaded="Yesterday"
            status="Pending"
          />
          <DataRow
            fileIcon={faDisplay}
            fileName="Intro to Robotics"
            fileSize="12.8 MB"
            fileType="PPTX"
            category="Lecture Notes"
            dateUploaded="Oct 05, 2023"
            status="Rejected"
          />
          <DataRow
            fileIcon={faFilePdf}
            fileName="Calculus III Cheat Sheet"
            fileSize="450 KB"
            fileType="PDF"
            category="Summary"
            dateUploaded="Sep 28, 2023"
            status="Approved"
          />

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
      </div>
    </div>
  );
};

export default MyUploads;
