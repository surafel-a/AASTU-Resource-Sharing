import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoBackButton from "../components/GoBackButton";
import {
  faCircleCheck,
  faCircleInfo,
  faClock,
  faCloudArrowUp,
  faFileLines,
  faTag,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { useCourse } from "../contexts/CourseContext";
import { useResource } from "../contexts/ResourceContext";
import { useState } from "react";
import { toast } from "react-toastify";

const UploadResource = () => {
  const { user } = useAuth();
  const { courses } = useCourse();
  const { createResource, loading } = useResource();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    category: "",
    type: "",
    department: "",
    visibility: "",
  });

  const [file, setFile] = useState(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        toast.error("No file selected");
        return;
      }

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("type", formData.type);
      data.append("course", formData.course);
      data.append("department", formData.department);
      data.append("category", formData.category);
      data.append("visibility", formData.visibility);
      data.append("file", file);

      await createResource(data);

      toast.success("Resource uploaded successfully!");
      setFile(null);
      setFormData({
        title: "",
        description: "",
        course: "",
        type: "",
        department: "",
        visibility: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

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
                PDF, PPTX, DOCX or MP4 (Max. 5MB)
              </p>
            </div>

            <input
              type="file"
              accept=".pdf,.pptx,.docx,.mp4"
              className="hidden"
              id="fileUpload"
              onChange={(e) => {
                const selectedFile = e.target.files[0];

                if (selectedFile) {
                  if (selectedFile.size > MAX_FILE_SIZE) {
                    toast.error("File size must be less than 5MB");
                    e.target.value = null; // reset input
                    return;
                  }

                  setFile(selectedFile);
                }
              }}
            />

            <label
              htmlFor="fileUpload"
              className="inline-flex self-center p-3 text-xl font-semibold border-2 rounded-lg border-black/50 cursor-pointer hover:bg-[#1152D4] hover:text-white transition-colors duration-150"
            >
              Browse File
            </label>
          </div>

          {/* UPLOADED FILE DISPLAY */}

          {file && (
            <div className="flex items-center justify-between gap-5 p-4 mt-5 border-2 border-gray-300 rounded-2xl bg-blue-50">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faFileLines}
                  className="p-3 text-3xl text-blue-600 bg-blue-100 rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold">{file.name}</h2>
                  <p className="text-lg font-medium text-black/50">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB{" "}
                    <span>.Uploaded</span>
                  </p>
                </div>
              </div>

              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setFile(null)}
                className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
              />
            </div>
          )}

          {/* RESOURCE DETAILS */}
          <h2 className="mt-20 text-xl font-bold uppercase text-black/50">
            Resource Metadata
          </h2>
          <p className="mt-5 mb-2 text-xl font-semibold">Resource Title</p>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="e.g Intro to Algorithms - Final Exam Prep"
            className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 placeholder:text-lg"
          />

          <p className="mt-5 mb-2 text-xl font-semibold">
            Resource Description
          </p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a brief summary of what this resource covers..."
            rows={5}
            className="w-full px-6 py-3 rounded-lg text-black/70 bg-[#F6F6F8] 
             focus:outline-none focus:ring-2 focus:ring-[#1152D4] 
             placeholder:font-semibold placeholder:text-black/40 
             placeholder:text-lg resize-none"
          />

          <p className="mt-5 mb-2 text-xl font-semibold">Resource Category</p>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            type="text"
            placeholder="e.g Lecture Notes, Past Exams, Assignments, etc."
            className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 placeholder:text-lg"
          />

          {/* CLASSIFICATION */}
          <h2 className="mt-20 text-xl font-bold uppercase text-black/50">
            Classification
          </h2>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            <div>
              <p className="mt-5 mb-2 text-xl font-semibold">Resource Type</p>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
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

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              >
                <option value="" disabled hidden>
                  Select Course
                </option>

                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mt-5 mb-2 text-xl font-semibold">Department</p>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
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
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
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

          <div className="p-10 bg-[#F6F6F8] rounded-lg shadow-xl mt-20">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="text-xl text-black/70"
              />
              <p className="text-xl font-bold uppercase text-black/70">
                System Information
              </p>
            </div>

            <div className="inline-flex border-2 border-black/30 px-4 py-2 bg-white rounded-xl shadow-xl mt-5 mr-5">
              <div className="flex items-center gap-3 text-black/70">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <p className="text-lg">
                  Uploaded by:{" "}
                  <span className="font-semibold text-black ml-2">
                    {user?.name || "John Doe"}
                  </span>
                </p>
              </div>
            </div>

            <div className="inline-flex border-2 border-black/30 px-4 py-2 bg-white rounded-xl shadow-xl mt-5">
              <div className="flex items-center gap-3 text-black/70">
                <FontAwesomeIcon icon={faClock} className="text-lg" />
                <p className="text-lg">
                  Initial Status:{" "}
                  <span className="font-bold text-orange-600 ml-2 px-4 py-1 bg-orange-100 rounded-full text-sm">
                    Pending
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-0.5 rounded-full bg-black/30 mt-20 mb-5"></div>

          <div className="flex items-center justify-end gap-5">
            <button className="px-6 py-3 text-xl font-semibold border-2 rounded-lg border-[#1152D4]  cursor-pointer bg-white text-[#1152D4] transition-colors duration-150">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-3 text-xl font-semibold border-2 rounded-lg border-[#1152D4] text-white transition-colors duration-150
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-[#1152D4] hover:bg-[#0d43b0] cursor-pointer"
              }`}
            >
              Upload Resource
            </button>
          </div>
        </section>

        {/* GRID FOR INFO */}
        <section className="grid grid-cols-3 gap-10 my-15">
          <div className="grid grid-cols-[auto_1fr] gap-5">
            <FontAwesomeIcon
              icon={faTag}
              className="p-3 bg-blue-100 text-blue-600 text-2xl rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">Clear Titles</h3>
              <p className="text-lg text-black/50 font-semibold">
                Ensure titles include the specific topic and year for better
                searchability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-5">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="p-3 bg-blue-100 text-blue-600 text-2xl rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">Verify Accuracy</h3>
              <p className="text-lg text-black/50 font-semibold">
                Review your notes for clarity before sharing with the community.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-5">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="p-3 bg-blue-100 text-blue-600 text-2xl rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">Quality First</h3>
              <p className="text-lg text-black/50 font-semibold">
                Highly rated resources gain more visibility and academic
                rewards.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UploadResource;
