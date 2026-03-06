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

const Library = () => {
  return (
    <div className="bg-[#F6F6F8] py-10">
      <div className="ml-50 mr-20">
        <h1 className="font-bold text-5xl mb-5">Student Resource Library</h1>
        <p className="text-black/50 text-2xl font-semibold mb-5">
          Discover academic materials uploaded by students and faculty at AASTU
        </p>

        <div className="flex items-center gap-5 mb-10">
          <div className="">
            <select className="bg-white border border-black/20 shadow-md rounded-md pl-4 pr-2 py-2 text-black/70 font-semibold">
              <option disabled selected>
                Department
              </option>
              <option>Software</option>
              <option>Electrical</option>
              <option>Electromechanical</option>
            </select>
          </div>
          <div>
            <select className="bg-white border border-black/20 shadow-md rounded-md pl-4 pr-2 py-2 text-black/70 font-semibold">
              <option disabled selected>
                Course Code
              </option>
              <option>ECEg</option>
              <option>Mng</option>
              <option>Swg</option>
            </select>
          </div>
          <div>
            <select className="bg-white border border-black/20 shadow-md rounded-md pl-4 pr-2 py-2 text-black/70 font-semibold">
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
            <select className="bg-white border border-black/20 shadow-md rounded-md pl-4 pr-2 py-2 text-black/70 font-semibold">
              <option disabled selected>
                File Type
              </option>
              <option>PDF</option>
              <option>DOCX</option>
              <option>PPT</option>
            </select>
          </div>
          <div>
            <p className="font-bold text-blue-600 text-lg cursor-pointer pl-7">
              Clear Filters
            </p>
          </div>
        </div>

        {/* Library Container */}
        <div className="grid grid-cols-4 gap-10 mb-10">
          {/* Each Library */}
          <ResourceLibraries
            fileIcon={faFileLines}
            fileName="Discrete Mathematics - Final Exam 2023"
            fileType="PDF"
            downloadIcon={faDownload}
            calanderIcon={faCalendar}
            bookmarkIconR={faBookmarkRegular}
            bookmarkIconS={faBookmarkSolid}
            lecturer="Dr. Solomon Kassa"
            courseId="Math 2101"
            downloads="1.2K"
            year="2"
          />
          <ResourceLibraries
            fileIcon={faFileWord}
            fileName="Structural Analysis Lab Report - EXP 4"
            fileType="DOCX"
            downloadIcon={faDownload}
            calanderIcon={faCalendar}
            bookmarkIconR={faBookmarkRegular}
            bookmarkIconS={faBookmarkSolid}
            lecturer="Abebe Kebede"
            courseId="CENG 3202"
            downloads="842"
            year="3"
          />
          <ResourceLibraries
            fileIcon={faFileLines}
            fileName="Compiler Design Lecture Notes"
            fileType="PDF"
            downloadIcon={faDownload}
            calanderIcon={faCalendar}
            bookmarkIconR={faBookmarkRegular}
            bookmarkIconS={faBookmarkSolid}
            lecturer="Faculty Resource"
            courseId="SEng 4112"
            downloads="5.5K"
            year="4"
          />
          <ResourceLibraries
            fileIcon={faDisplay}
            fileName="Thermodynamics Presentation"
            fileType="PPT"
            downloadIcon={faDownload}
            calanderIcon={faCalendar}
            bookmarkIconR={faBookmarkRegular}
            bookmarkIconS={faBookmarkSolid}
            lecturer="Michael T."
            courseId="MEng 2101"
            downloads="215"
            year="2"
          />
          <ResourceLibraries
            fileIcon={faFileLines}
            fileName="Intro to Computer Science"
            fileType="PDF"
            downloadIcon={faDownload}
            calanderIcon={faCalendar}
            bookmarkIconR={faBookmarkRegular}
            bookmarkIconS={faBookmarkSolid}
            lecturer="Dept of Computing"
            courseId="CS 1001"
            downloads="5.8K"
            year="1"
          />
          <ResourceLibraries
            fileIcon={faFileLines}
            fileName="Fluid Mechanics - Solution Key"
            fileType="DOCX"
            downloadIcon={faDownload}
            calanderIcon={faCalendar}
            bookmarkIconR={faBookmarkRegular}
            bookmarkIconS={faBookmarkSolid}
            lecturer="Dr. Elias"
            courseId="MEng 3103"
            downloads="428"
            year="3"
          />
          <ResourceLibraries
            fileIcon={faFileLines}
            fileName="Urban Planning Principles"
            fileType="PDF"
            downloadIcon={faDownload}
            calanderIcon={faCalendar}
            bookmarkIconR={faBookmarkRegular}
            bookmarkIconS={faBookmarkSolid}
            lecturer="Sarah J."
            courseId="Arch 5101"
            downloads="156"
            year="5"
          />
          <ResourceLibraries
            fileIcon={faFileLines}
            fileName="Electrical Circuit II - Final Project"
            fileType="PDF"
            downloadIcon={faDownload}
            calanderIcon={faCalendar}
            bookmarkIconR={faBookmarkRegular}
            bookmarkIconS={faBookmarkSolid}
            lecturer="Dr. Tadesse"
            courseId="EEng 2202"
            downloads="670"
            year="2"
          />
        </div>

        <div className="flex items-center justify-center gap-3 text-2xl font-bold">
          <div className="cursor-pointer mr-7">
            <FontAwesomeIcon icon={faChevronLeft} className="p-4 rounded-xl border-2 border-black/15 text-black/50" />
          </div>
          <p className="px-6 py-4 bg-[#1152D4] text-white border-2 border-black/15 rounded-xl cursor-pointer">1</p>
          <p className="px-6 py-4 rounded-xl border-2 border-black/15 cursor-pointer">2</p>
          <p className="px-6 py-4 rounded-xl border-2 border-black/15 cursor-pointer">3</p>
          <p className="px-3 py-2">...</p>
          <p className="px-6 py-4 rounded-xl border-2 border-black/15 cursor-pointer">12</p>
          <div className="cursor-pointer ml-7">
            <FontAwesomeIcon icon={faChevronRight} className="p-4 rounded-xl border-2 border-black/15 text-black/70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
