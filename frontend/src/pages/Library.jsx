import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as faBookmarkSolid,
  faDownload,
  faCalendar,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Library = () => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-[#F6F6F8] py-10">
      <div className="mx-50">
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
        <div className="grid grid-cols-4">
          {/* Each Library */}
          <div className="relative bg-white  rounded-2xl border border-black/10 shadow-md">
            <div className="mx-8 my-6">
              <div>
                <FontAwesomeIcon
                  icon={faFileLines}
                  className="p-3 text-3xl bg-[#EFEEFB] text-[#1152D4] rounded-md mb-5"
                />
                <button
                  className="absolute top-6 right-4 cursor-pointer"
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <FontAwesomeIcon
                    icon={bookmarked ? faBookmarkSolid : faBookmarkRegular}
                    className={`${bookmarked ? "text-blue-900" : "text-gray-400"} text-2xl`}
                  />
                </button>
              </div>
              <h2 className="font-bold text-2xl mb-2">
                Discrete Mathematics - Final Exam 2023
              </h2>
              <p className="font-bold text-black/30 mb-5">
                By Dr. Solomon Kassa . Math 2101
              </p>
              {/* Details */}
              <div className="flex justify-between items-center mb-8">
                <p className="flex items-center gap-5 font-semibold text-black/30">
                  {/* 1.2K */}
                  <p className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faDownload} />
                    <span>1.2K</span>
                  </p>
                  {/* 450 Download */}
                  <p className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>Year 2</span>
                  </p>
                </p>
                <p className="bg-[#EFEEFB] text-[#1152D4] font-bold px-4 py-1 rounded-md">
                  PDF
                </p>
              </div>

              <div className="mb-10">
                <button className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-[#EFEEFB] text-[#1152D4] rounded-lg mx-auto text-center cursor-pointer">
                  <FontAwesomeIcon icon={faDownload} />
                  <p className="font-bold">Download Resource</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
