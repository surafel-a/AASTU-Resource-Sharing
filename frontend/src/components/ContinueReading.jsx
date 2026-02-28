import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const ContinueReading = ({ icon, color, course, percentage, pageRead, totalPage }) => {
  const colorStyles = {
    blue: {
      bgLight: "bg-blue-100",
      textDark: "text-blue-900",
      bgBar: "bg-blue-600",
      percentText: "text-blue-800",
    },
    orange: {
      bgLight: "bg-orange-100",
      textDark: "text-orange-900",
      bgBar: "bg-orange-600",
      percentText: "text-orange-800",
    },
    red: {
      bgLight: "bg-red-100",
      textDark: "text-red-900",
      bgBar: "bg-red-600",
      percentText: "text-red-800",
    }
  };
  const selectedColor = colorStyles[color];

  return (
    <div className="rounded-md p-5 bg-white shadow-xl">
      <div className="flex items-center gap-5 mb-5">
        <div>
          <FontAwesomeIcon
            icon={icon}
            className={`p-1 rounded-sm ${selectedColor.bgLight} text-xl ${selectedColor.textDark}`}
          />
        </div>
        <div>
          <h2 className="font-bold text-xl">{course}</h2>
        </div>
      </div>

      <div className={`h-2 bg-${color}-600 rounded-full mb-2`}></div>

      <div className="flex justify-between items-center">
        <div className="font-semibold text-black/50">
          Page {pageRead} of {totalPage}
        </div>
        <div className={`font-bold ${selectedColor.percentText}`}>{percentage}%</div>
      </div>
    </div>
  );
};

export default ContinueReading;
