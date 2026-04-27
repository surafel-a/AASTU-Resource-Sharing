import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoBackButton from "../components/GoBackButton";
import { faBook, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";
import { useCourse } from "../contexts/CourseContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const EditCourse = () => {
  const { courseId } = useParams();
  const { updateCourse, courses } = useCourse();
  const navigate = useNavigate();

  const selectedCourse = courses.find((c) => c._id === courseId);

  const [formData, setFormData] = useState({
    id: "",
    code: "",
    name: "",
    department: "",
    courseInstructor: "",
    year: "",
    semester: "",
  });

  const [loading, setLoading] = useState(false);

  // Prefill data
  useEffect(() => {
    if (selectedCourse) {
      setFormData(selectedCourse);
    }
  }, [selectedCourse]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit (UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (
        !formData.code ||
        !formData.name ||
        !formData.department ||
        !formData.courseInstructor
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // Duplicate check (exclude current course)
      const exists = courses.some(
        (c) =>
          c.id !== formData.id &&
          c.name === formData.name &&
          c.department === formData.department,
      );

      if (exists) {
        toast.warn("Another course with same name & department exists");
        return;
      }

      setLoading(true);

      await updateCourse(courseId, formData);
      navigate("/courses");
      toast.success("Course updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  // Cancel → go back or reset
  const handleCancel = () => {
    if (selectedCourse) {
      setFormData(selectedCourse);
    } else {
      setFormData({
        id: "",
        code: "",
        name: "",
        department: "",
        courseInstructor: "",
        year: "",
        semester: "",
      });
    }
  };

  return (
    <div className="bg-[#F6F6F8] min-h-screen py-10">
      <div className="mx-50">
        <GoBackButton />

        <h1 className="mb-5 text-5xl font-bold">Edit Course</h1>

        <p className="mb-5 text-2xl font-semibold text-black/50">
          Update course details, instructor assignment, and academic placement.
        </p>

        <section className="p-10 bg-white rounded-lg shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-bold uppercase rounded-full bg-[#1152D4] text-white text-sm mb-5">
            <FontAwesomeIcon icon={faBook} />
            <p>Edit Academic Module</p>
          </div>

          <h2 className="mb-2 text-2xl font-semibold">Course Information</h2>

          <p className="mb-10 text-xl font-semibold text-black/50">
            Fields marked with (*) are required.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-x-10 gap-y-5"
          >
            {/* CODE */}
            <div className="relative flex flex-col gap-2">
              <label className="text-lg font-semibold">
                Course Code <span className="text-red-600">*</span>
              </label>
              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
                type="text"
                placeholder="e.g CS101"
                className="w-full pl-12 pr-6 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              />
              <FontAwesomeIcon
                icon={faHashtag}
                className="absolute top-13 left-5 text-black/50"
              />
            </div>

            {/* NAME */}
            <div className="relative flex flex-col gap-2">
              <label className="text-lg font-semibold">
                Course Name <span className="text-red-600">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="e.g Introduction to Computer Science"
                className="w-full pl-12 pr-6 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              />
              <FontAwesomeIcon
                icon={faBook}
                className="absolute top-13 left-5 text-black/50"
              />
            </div>

            {/* DEPARTMENT */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">
                Department <span className="text-red-600">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="px-6 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              >
                <option value="">Select Department</option>
                <option>Electrical Engineering</option>
                <option>Software Engineering</option>
                <option>Mechanical Engineering</option>
                <option>Electromechanical Engineering</option>
                <option>Food Science</option>
                <option>Biotechnology</option>
                <option>Architecture</option>
                <option>Environmental Engineering</option>
                <option>Chemical Engineering</option>
                <option>Civil Engineering</option>
              </select>
            </div>

            {/* INSTRUCTOR */}
            <div className="relative flex flex-col gap-2">
              <label className="text-lg font-semibold">
                Course Instructor <span className="text-red-600">*</span>
              </label>
              <input
                name="courseInstructor"
                value={formData.courseInstructor || ""}
                onChange={handleChange}
                type="text"
                placeholder="e.g Dr. John Doe"
                className="w-full pl-12 pr-6 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute top-13 left-5 text-black/50"
              />
            </div>

            {/* YEAR */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="px-6 py-3 rounded-lg bg-[#F6F6F8]"
              >
                <option value="">Select Year</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
                <option value="5">Year 5</option>
                <option value="6">Year 6</option>
              </select>
            </div>

            {/* SEMESTER */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="px-6 py-3 rounded-lg bg-[#F6F6F8]"
              >
                <option value="">Select Semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
              </select>
            </div>

            {/* ACTIONS */}
            <div className="col-span-2 flex gap-5 mt-10">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-[#1152D4] text-[#1152D4] font-semibold rounded-lg cursor-pointer"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#1152D4] text-white font-semibold rounded-lg disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Updating..." : "Update Course"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditCourse;
