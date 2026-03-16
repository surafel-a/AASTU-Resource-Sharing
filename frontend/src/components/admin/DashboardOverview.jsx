import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardOverview = ({
  iconBig,
  iconSmall,
  iconDiscription,
  textTitle,
  textValue,
  textDescription,
  colorPrimary,
  colorSecondary,
}) => {
  const colors = {
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-100",
    },
    green: {
      text: "text-green-600",
      bg: "bg-green-100",
    },
    orange: {
      text: "text-orange-600",
      bg: "bg-orange-100",
    },
    red: {
      text: "text-red-600",
      bg: "bg-red-100",
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-100",
    },
  };

  const primary = colors[colorPrimary];
  const secondary = colors[colorSecondary];

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center justify-between mb-5">
        <FontAwesomeIcon
          icon={iconBig}
          className={`p-2 text-3xl ${primary.text} ${primary.bg} rounded-lg`}
        />
        <div className={`flex items-center gap-1 text-lg ${secondary.text}`}>
          <FontAwesomeIcon icon={iconSmall} />
          <p className="font-bold">{iconDiscription}</p>
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold text-black/60">{textTitle}</p>
        <h2 className="mb-5 text-4xl font-bold">{textValue}</h2>
        <p className="font-bold text-black/30">{textDescription}</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
