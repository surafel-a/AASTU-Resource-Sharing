import {
  faArrowRight,
  faCalendar,
  faEllipsisVertical,
  faGraduationCap,
  faLayerGroup,
  faPen,
  faTrash,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../contexts/CourseContext";

const CourseLists = ({
  courseId,
  courseCode,
  courseName,
  courseInstructor,
  department,
  year,
  semester,
}) => {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteCourse } = useCourse();
  const navigate = useNavigate();

  switch (year) {
    case "1":
      year = "1st";
      break;
    case "2":
      year = "2nd";
      break;
    case "3":
      year = "3rd";
      break;
    case "4":
    case "5":
    case "6":
      year = `${year}th`;
      break;
  }

  semester = semester === 1 ? "1st" : "2nd";

  const handleDelete = () => {
    deleteCourse(courseId);

    setShowConfirm(false);
  };

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <p className="px-2 py-1 font-bold text-blue-600 bg-blue-100 rounded-md ">
          {courseCode}
        </p>

        <button className="absolute top-0 right-0 p-6 w-[120px] flex justify-end">
          {!open ? (
            <FontAwesomeIcon
              onClick={() => setOpen(true)}
              className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
              icon={faEllipsisVertical}
            />
          ) : (
            <div className="flex flex-col items-center bg-white rounded-lg text-black/50">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setOpen(false)}
                className="p-3 rounded-full cursor-pointer hover:bg-gray-100"
              />
              <FontAwesomeIcon
                onClick={() => navigate(`${courseId}/edit`)}
                icon={faPen}
                className="p-3 rounded-full cursor-pointer hover:bg-green-100 hover:text-green-600"
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => setShowConfirm(true)}
                className="p-3 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-600"
              />
            </div>
          )}
        </button>
      </div>

      <h2 className="mb-4 text-xl font-bold">{courseName}</h2>

      <div className="flex items-center gap-2 mb-2 text-lg font-medium text-black/60">
        <FontAwesomeIcon icon={faUsers} />
        <p>{courseInstructor}</p>
      </div>

      <div className="flex items-center gap-2 mb-2 text-lg font-medium text-black/60">
        <FontAwesomeIcon icon={faGraduationCap} />
        <p>{department}</p>
      </div>

      <div className="flex items-center gap-5 mb-2 text-lg font-medium text-black/60">
        <div className="flex items-center gap-2 px-2 py-1 bg-[#F6F6F8] rounded-md">
          <FontAwesomeIcon icon={faCalendar} />
          <p>{year} Year</p>
        </div>

        <div className="flex items-center gap-2 px-2 py-1 bg-[#F6F6F8] rounded-md">
          <FontAwesomeIcon icon={faLayerGroup} />
          <p>{semester} Semester</p>
        </div>
      </div>

      <div className="w-full h-0.5 rounded-full bg-black/60 my-6"></div>

      <div className="flex items-center justify-between text-[#1152D4] font-semibold text-lg">
        <p>View Materials</p>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="p-2 rounded-full cursor-pointer hover:bg-blue-100"
        />
      </div>

      {/* DELETION CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </h3>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLists;
