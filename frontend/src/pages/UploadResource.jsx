import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoBackButton from "../components/GoBackButton";
import {
  faCloudArrowUp,
  faFileLines,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const UploadResource = () => {
  return (
    <div className="bg-[#F6F6F8] min-h-screen py-10">
      <div className="mx-50">
        <GoBackButton />

        <h1 className="mb-5 text-5xl font-bold text-center">
          Upload New Resource
        </h1>
        <div className="flex items-center justify-between mb-5 ">
          <p className="mx-auto text-2xl font-semibold text-black/50">
            Share academic materials with your fellow students and departments.
          </p>
        </div>

        {/* RESOURCE FORM CONTAINER */}
        <section className="p-10 bg-white rounded-lg shadow-xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-1.5  bg-[#1152D4] rounded-full"></div>
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold">Resource Information</p>
              <p className="text-xl font-semibold text-black/50">
                Fill out the details to help other to find your content.
              </p>
            </div>
          </div>

          <div className="w-full h-0.5 rounded-full bg-black/30 my-10"></div>

          <h2 className="text-xl font-bold uppercase text-black/50">
            Content Source
          </h2>

          <div className="flex flex-col p-10 mt-8 border border-dashed rounded-lg gap-7 border-black/50">
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              className="p-6 mx-auto text-5xl text-blue-600 bg-blue-100 rounded-full"
            />

            <div>
              <p className="text-xl font-semibold text-center">
                Click to upload or drag and drop
              </p>
              <p className="font-bold text-center text-black/50">
                PDF, PPTX, DOCX or MP4 (Max. 50MB)
              </p>
            </div>

            <button className="inline-flex self-center p-3 text-xl font-semibold border-2 rounded-lg border-black/50 cursor-pointer hover:bg-[#1152D4] hover:text-white transition-colors duration-150">
              Browse File
            </button>
          </div>

          {/* UPLOADED FILE DISPLAY */}
          <div className="flex items-center justify-between gap-5 p-4 mt-5 border-2 border-gray-300 rounded-2xl bg-blue-50">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faFileLines}
                className="p-3 text-3xl text-blue-600 bg-blue-100 rounded-lg"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  CS201_Lecture_Notes_Week4.pdf
                </h2>
                <p className="text-lg font-medium text-black/50">
                  4.2 MB <span>.Uploaded</span>
                </p>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faXmark}
              className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
            />
          </div>

          {/* RESOURCE DETAILS */}
          <h2 className="mt-20 text-xl font-bold uppercase text-black/50">
            Resource Metadata
          </h2>
          <p className="mt-5 mb-2 text-xl font-semibold">Resource Title</p>
          <input
            name="code"
            // value={formData.code}
            // onChange={handleChange}
            type="text"
            placeholder="e.g Intro to Algorithms - Final Exam Prep"
            className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 placeholder:text-lg"
          />

          <p className="mt-5 mb-2 text-xl font-semibold">
            Resource Description
          </p>
          <textarea
            // name="code"
            // value={formData.code}
            // onChange={handleChange}
            placeholder="Provide a brief summary of what this resource covers..."
            rows={5}
            className="w-full px-6 py-3 rounded-lg text-black/70 bg-[#F6F6F8] 
             focus:outline-none focus:ring-2 focus:ring-[#1152D4] 
             placeholder:font-semibold placeholder:text-black/40 
             placeholder:text-lg resize-none"
          />

          {/* CLASSIFICATION */}
          <h2 className="mt-20 text-xl font-bold uppercase text-black/50">
            Classification
          </h2>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            <div>
              <p className="mt-5 mb-2 text-xl font-semibold">Resource Type</p>
              <select
                // name="type"
                // value={formData.type}
                // onChange={handleChange}
                className="w-full px-6 py-3 rounded-lg bg-[#F6F6F8] text-black/70 
             focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              >
                <option value="" disabled hidden>
                  Select resource type
                </option>
                <option value="doc">Document</option>
                <option value="pdf">PDF</option>
                <option value="ppt">PowerPoint</option>
                <option value="video">Video</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <p className="mt-5 mb-2 text-xl font-semibold">Related Course</p>
              <input
                name="code"
                // value={formData.code}
                // onChange={handleChange}
                type="text"
                placeholder="e.g Intro to Algorithms - Final Exam Prep"
                className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 placeholder:text-lg"
              />
            </div>

            <div>
              <p className="mt-5 mb-2 text-xl font-semibold">Department</p>
              <select
                // name="department"
                // value={formData.department}
                // onChange={handleChange}
                className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Department
                </option>

                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Electromechanical Engineering">
                  Electromechanical Engineering
                </option>
                <option value="Food Science">Food Science</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Architecture">Architecture</option>
                <option value="Environmental Engineering">
                  Environmental Engineering
                </option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>

            {/* VISIBILITY CONTROL */}
            <div>
              <p className="mt-5 mb-2 text-xl font-semibold">
                Visibility Control
              </p>
              <select
                // name="department"
                // value={formData.department}
                // onChange={handleChange}
                className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Visibility Level
                </option>

                <option value="public">Public (Everyone)</option>
                <option value="department">Department Only</option>
                <option value="course">Course Only</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UploadResource;
