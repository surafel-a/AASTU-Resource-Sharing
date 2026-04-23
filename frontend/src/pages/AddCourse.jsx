import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoBackButton from "../components/GoBackButton";
import { faBook, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";
import { useCourse } from "../contexts/CourseContext";
import { useState } from "react";
import { toast } from "react-toastify";

const AddCourse = () => {
  const { createCourse, courses } = useCourse();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    department: "",
    courseInstructor: "",
    year: "",
    semester: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const exists = courses.some(
        (c) => c.name === formData.name && c.department === formData.department,
      );

      if (exists) {
        toast.warn("Course already exists");
        return;
      }

      await createCourse(formData);
      toast.success("Course created successfully!");

      // reset after success
      setFormData({
        code: "",
        name: "",
        department: "",
        courseInstructor: "",
        year: "",
        semester: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFormData({
      code: "",
      name: "",
      department: "",
      courseInstructor: "",
      year: "",
      semester: "",
    });
  };

  return (
    <div className="bg-[#F6F6F8] min-h-screen py-10">
      <div className="mx-50">
        <GoBackButton />

        <h1 className="mb-5 text-5xl font-bold">Add New Course</h1>
        <div className="flex items-center justify-between mb-5">
          <p className="text-2xl font-semibold text-black/50">
            Create a new educational path by defining its core characteristics,
            assigned instructors, and academic placement.
          </p>
        </div>

        {/* COURSE FORM */}
        <section className="p-10 bg-white rounded-lg shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-bold uppercase rounded-full bg-[#1152D4] text-white text-sm mb-5">
            <FontAwesomeIcon icon={faBook} />
            <p>Academic Module</p>
          </div>

          <h2 className="mb-2 text-2xl font-semibold">Course Information</h2>
          <p className="mb-10 text-xl font-semibold text-black/50">
            All fields marked with an asterisk (*) are required to successfully
            register the course in the system.
          </p>

          {/* COURSE FORM FIELDS */}
          <form className="grid grid-cols-2 gap-x-10 gap-y-5">
            <div className="relative flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Course Code</p>
                <p className="self-start pt-2 text-xl text-red-600">*</p>
              </div>
              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
                type="text"
                placeholder="e.g CS101"
                className="w-full pl-12 pr-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
              />
              <FontAwesomeIcon
                icon={faHashtag}
                className="absolute text-lg top-15 left-5 text-black/50"
              />
            </div>

            <div className="relative flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Course Name</p>
                <p className="self-start pt-2 text-xl text-red-600">*</p>
              </div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="e.g Introduction to Computer Science"
                className="w-full pl-12 pr-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
              />
              <FontAwesomeIcon
                icon={faBook}
                className="absolute text-lg top-15 left-5 text-black/50"
              />
            </div>

            <div className="relative flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Department</p>
                <p className="self-start pt-2 text-xl text-red-600">*</p>
              </div>

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

            <div className="relative flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Course Instructor</p>
                <p className="self-start pt-2 text-xl text-red-600">*</p>
              </div>
              <input
                name="courseInstructor"
                value={formData.courseInstructor}
                onChange={handleChange}
                type="text"
                placeholder="e.g Dr. John Doe"
                className="w-full pl-12 pr-6 py-3 rounded-lg text-black/60 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute text-lg top-15 left-5 text-black/50"
              />
            </div>

            <div className="relative flex flex-col gap-2">
              <p className="text-lg font-semibold">Year</p>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Year
                </option>

                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
                <option value="5">Year 5</option>
                <option value="6">Year 6</option>
              </select>
            </div>

            <div className="relative flex flex-col gap-2">
              <p className="text-lg font-semibold">Semester</p>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-6 py-3 rounded-lg text-black/40 bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Semester
                </option>

                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
              </select>
            </div>
          </form>

          <div className="w-full h-0.5 rounded-full bg-black/40 my-15"></div>

          <div className="flex items-center gap-5">
            <button
              onClick={handleCancel}
              className="px-6 py-3 border-2 border-[#1152D4] text-[#1152D4] font-semibold rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer"
            >
              Add Course
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCourse;
