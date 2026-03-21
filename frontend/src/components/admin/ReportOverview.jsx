import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReportOverview = ({ icon, title, value, description, color }) => {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
  };

  const colorStyle = colors[color];

  return (
    <div className="flex items-center gap-5 p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md">
      <FontAwesomeIcon
        icon={icon}
        className={`p-4 text-4xl ${colorStyle.bg} ${colorStyle.text} rounded-full`}
      />

      <div>
        <p className="font-serif text-2xl uppercase">{title}</p>
        <h2 className="text-4xl font-bold">{value}</h2>
        <p className="text-xl font-semibold text-green-600">{description}</p>
      </div>
    </div>
  );
};

export default ReportOverview;
