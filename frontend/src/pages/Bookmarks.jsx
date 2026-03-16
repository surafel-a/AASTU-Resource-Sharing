import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faFileLines, faFilePdf } from "@fortawesome/free-solid-svg-icons";

const Bookmarks = () => {
  return (
    <div className="bg-[#F6F6F8] py-10">
      <div className="ml-50 mr-30">
        <h1 className="font-bold text-5xl mb-5">Saved Resources</h1>
        <section className="flex items-center justify-between mb-5">
          <p className="text-black/50 text-2xl font-semibold">
            Manage and access your academic reference collection.
          </p>
          <div className="flex items-center gap-2">
            <p className="px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-4xl cursor-pointer">
              All Items
            </p>
            <p className="px-4 py-2 bg-white text-black/60 font-semibold rounded-4xl cursor-pointer">
              Lecture Notes
            </p>
            <p className="px-4 py-2 bg-white text-black/60 font-semibold rounded-4xl cursor-pointer">
              PDF Textbooks
            </p>
            <p className="px-4 py-2 bg-white text-black/60 font-semibold rounded-4xl cursor-pointer">
              Video Tutorials
            </p>
            <p className="font-semibold text-blue-600 cursor-pointer">Reset</p>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-4">
          <div className="flex flex-col h-100 shadow-xl rounded-xl overflow-hidden">
            <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-100 to-white h-64 w-full">
              <FontAwesomeIcon icon={faFileLines} className="text-[#C1CEE0] text-5xl" />

              {/* -- ABSOLUTE -- FOR THE FILE ICON  */}
              <div className="absolute top-5 left-5 flex items-center gap-1 text-[#1152D4] px-3 py-1 bg-white rounded-md">
                <FontAwesomeIcon icon={faFilePdf} />
                <p className="font-bold">PDF</p>
              </div>
            </div>
            
            <div className="font-bold p-6">
              <h2 className="text-2xl mb-2">Intro to Software Engineering</h2>
              <div className="flex items-center justify-between text-black/50 mb-4">
                <p>Computer Science</p>
                <p>. Saved 2h ago</p>
              </div>
              <div className="flex items-center justify-between">
                <button className="px-4 py-1 bg-green-100 text-green-600 font-bold">New</button>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-3xl text-[#1152D4] cursor-pointer" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Bookmarks;
