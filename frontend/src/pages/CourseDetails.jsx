import { useParams, useNavigate } from "react-router-dom";
import { useCourse } from "../contexts/CourseContext";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import GoBackButton from "../components/GoBackButton";

const CourseDetails = () => {
  const { id } = useParams();
  const { courses } = useCourse();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!courses.length) return;

    const found = courses.find((c) => c._id === id);
    setCourse(found || null);
  }, [courses, id]);

  if (!course) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#F6F6F8] py-10">
      <div className="mx-10 lg:mx-32">
        <GoBackButton />

        {/* HEADER */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h1 className="text-4xl font-bold text-[#1152D4] mb-2">
            {course.name}
          </h1>

          <p className="text-lg text-black/60 mb-4">
            {course.code} • {course.department}
          </p>

          <p className="text-xl font-semibold">
            Instructor: {course.courseInstructor}
          </p>

          <p className="text-lg text-black/60 mt-2">
            Year {course.year} • Semester {course.semester}
          </p>
        </div>

        {/* DESCRIPTION BOX */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>

          <p className="text-black/70 leading-relaxed">
            This course belongs to the {course.department} department and is
            designed for Year {course.year} students. It is taught by{" "}
            {course.courseInstructor} and covers fundamental and advanced topics
            related to {course.name}. Students will gain both theoretical
            understanding and practical skills through lectures and materials
            shared in the platform.
          </p>

          <div className="mt-8">
            <button
              onClick={() => navigate("/library")}
              className="bg-[#1152D4] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 cursor-pointer transition-all duration-300"
            >
              Browse Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
