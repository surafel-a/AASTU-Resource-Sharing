import {
  faArrowRight,
  faCalendar,
  faEllipsisVertical,
  faGraduationCap,
  faLayerGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseLists = ({
  courseCode,
  courseName,
  courseInstructor,
  department,
  year,
  semester,
}) => {
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <p className="px-2 py-1 font-bold text-blue-600 bg-blue-100 rounded-md ">
          {courseCode}
        </p>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="p-2 rounded-full hover:bg-[#F6F6F8] cursor-pointer"
        />
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
    </div>
  );
};

export default CourseLists;
