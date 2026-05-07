import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowUpRightFromSquare,
  faFileLines,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

// CONTEXTS
import { useBookmark } from "../contexts/BookmarkContext";

// UTILITIES
import { getTimeAgo, isNewBookmark } from "../utilities/timeHelpers";

const Bookmarks = () => {
  const { myBookmarks } = useBookmark();

  const [selectedType, setSelectedType] = useState("all");

  const navigate = useNavigate();

  // FILTERS
  const filters = [
    { label: "All Items", value: "all" },
    { label: "Lecture Notes", value: "note" },
    { label: "PDF Textbooks", value: "pdf" },
    { label: "Tests / Exams", value: "test" },
  ];

  // FILTERED BOOKMARKS
  const filteredBookmarks =
    selectedType === "all"
      ? myBookmarks
      : myBookmarks.filter((bookmark) => {
          const type = bookmark.resource?.type?.toLowerCase() || "";

          return type.includes(selectedType);
        });

  return (
    <div className="bg-[#F6F6F8] min-h-screen py-6 md:py-10">
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-20 2xl:mx-32">
        {/* HEADER */}
        <section className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
          {/* TITLE */}
          <div>
            <h1 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
              Saved Resources
            </h1>

            <p className="text-base sm:text-lg lg:text-2xl font-semibold text-black/50 max-w-3xl">
              Manage and access your academic reference collection.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedType(filter.value)}
                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full cursor-pointer transition-all duration-200 ${
                  selectedType === filter.value
                    ? "bg-[#1152D4] text-white"
                    : "bg-white text-black/60 hover:bg-gray-100"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* EMPTY STATE */}
        {filteredBookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-lg">
            <div className="mb-4 text-5xl">🔖</div>

            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              No bookmarks yet
            </h2>

            <p className="max-w-md mb-5 text-gray-500 px-4">
              You haven't saved any resources yet. Start exploring and bookmark
              useful materials to access them quickly later.
            </p>

            <button
              className="px-5 py-3 text-white transition bg-blue-600 rounded-xl cursor-pointer hover:bg-blue-700"
              onClick={() => navigate("/library")}
            >
              Browse Resources
            </button>
          </div>
        ) : (
          /* GRID */
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark._id}
                className="flex flex-col overflow-hidden shadow-lg rounded-2xl bg-white hover:shadow-xl transition duration-300"
              >
                {/* TOP PREVIEW */}
                <div className="relative flex items-center justify-center w-full h-52 sm:h-60 bg-gradient-to-br from-blue-100 to-white">
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="text-[#C1CEE0] text-5xl sm:text-6xl"
                  />

                  {/* FILE TYPE */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-[#1152D4] px-3 py-1 bg-white rounded-lg shadow-sm">
                    <FontAwesomeIcon icon={faFilePdf} />

                    <p className="font-bold text-sm">
                      {bookmark.resource?.type?.toUpperCase() || "FILE"}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 p-5">
                  {/* TITLE */}
                  <h2 className="mb-3 text-xl sm:text-2xl font-bold line-clamp-2">
                    {bookmark.resource?.title}
                  </h2>

                  {/* META */}
                  <div className="flex items-center justify-between mb-5 text-sm sm:text-base text-black/50 font-semibold">
                    <p className="truncate max-w-[60%]">
                      {bookmark.resource?.department}
                    </p>

                    <p className="text-[#1152D4] whitespace-nowrap">
                      {getTimeAgo(bookmark.createdAt)}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-auto">
                    {isNewBookmark(bookmark.createdAt) ? (
                      <button className="px-4 py-1 text-sm font-bold text-green-700 bg-green-100 rounded-full">
                        New
                      </button>
                    ) : (
                      <div />
                    )}

                    <button className="text-2xl text-[#1152D4] hover:scale-110 transition-transform cursor-pointer">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
