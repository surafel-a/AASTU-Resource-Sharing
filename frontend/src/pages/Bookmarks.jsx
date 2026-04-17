import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faFileLines,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Contexts
import { useBookmark } from "../contexts/BookmarkContext";

import { getTimeAgo, isNewBookmark } from "../utilities/timeHelpers";

const Bookmarks = () => {
  const { myBookmarks } = useBookmark();
  const [selectedType, setSelectedType] = useState("all");
  const navigate = useNavigate();

  const filters = [
    { label: "All Items", value: "all" },
    { label: "Lecture Notes", value: "note" },
    { label: "PDF Textbooks", value: "pdf" },
    { label: "Tests / Exams", value: "test" },
  ];

  return (
    <div className="bg-[#F6F6F8] min-h-screen py-10">
      <div className="ml-50 mr-30">
        <h1 className="mb-5 text-5xl font-bold">Saved Resources</h1>
        <section className="flex items-center justify-between mb-5">
          <p className="text-2xl font-semibold text-black/50">
            Manage and access your academic reference collection.
          </p>
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <p
                key={filter.value}
                onClick={() => setSelectedType(filter.value)}
                className={`px-4 py-2 font-semibold rounded-4xl cursor-pointer ${
                  selectedType === filter.value
                    ? "bg-[#1152D4] text-white"
                    : "bg-white text-black/60"
                }`}
              >
                {filter.label}
              </p>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-4 gap-4">
          {myBookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center col-span-4 py-16 text-center">
              <div className="mb-4 text-5xl">🔖</div>

              <h2 className="mb-2 text-xl font-semibold text-gray-700">
                No bookmarks yet
              </h2>

              <p className="max-w-md mb-4 text-gray-500">
                You haven't saved any resources yet. Start exploring and
                bookmark useful materials to access them quickly later.
              </p>

              <button
                className="px-5 py-2 text-white transition bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
                onClick={() => navigate("/library")}
              >
                Browse Resources
              </button>
            </div>
          ) : (
            myBookmarks.map((bookmark) => (
              <div
                key={bookmark._id}
                className="flex flex-col overflow-hidden shadow-xl h-100 rounded-xl"
              >
                <div className="relative flex items-center justify-center w-full h-64 bg-gradient-to-br from-blue-100 to-white">
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="text-[#C1CEE0] text-5xl"
                  />

                  {/* -- ABSOLUTE -- FOR THE FILE ICON  */}
                  <div className="absolute top-5 left-5 flex items-center gap-1 text-[#1152D4] px-3 py-1 bg-white rounded-md">
                    <FontAwesomeIcon icon={faFilePdf} />
                    <p className="font-bold">PDF</p>
                  </div>
                </div>

                <div className="p-6 font-bold">
                  <h2 className="mb-2 text-2xl">{bookmark.resource?.title}</h2>
                  <div className="flex items-center justify-between mb-4 text-black/50">
                    <p>{bookmark.resource?.department}</p>
                    <p className="text-[#1152D4]">
                      . {getTimeAgo(bookmark.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    {isNewBookmark(bookmark.createdAt) && (
                      <button className="px-4 py-1 font-bold text-green-600 bg-green-100">
                        New
                      </button>
                    )}
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="text-3xl text-[#1152D4] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Bookmarks;
