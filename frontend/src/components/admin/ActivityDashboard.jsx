import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faShield } from "@fortawesome/free-solid-svg-icons";

const ActivityDashboard = () => {
  const activities = [
    {
      title: "Approved Resource Request",
      description:
        "Approved the acquisition of 50 High-Performance Computing nodes for the Engineering Dept.",
      time: "15 MINUTES AGO",
    },
    {
      title: "Added New Faculty User",
      description:
        "Provisioned credentials and portal access for Dr. Elias Tadesse (Senior Lecturer).",
      time: "2 HOURS AGO",
    },
    {
      title: "System Maintenance Complete",
      description:
        "Successfully deployed weekly security patches and updated firewall configurations.",
      time: "YESTERDAY, 11:45 PM",
    },
    {
      title: "Generated Monthly Compliance Report",
      description:
        "Consolidated system access logs for October 2024 institutional audit.",
      time: "2 DAYS AGO",
    },
  ];

  return (
    <div className="">
      {/* Recent Activity Card */}
      <div className="mb-6 overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
        <div className="bg-[#F6F6F8] mb-5 border-b-3 border-b-gray-300 flex items-start justify-between p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <p className="text-lg font-semibold text-gray-500">
              Chronological log of your administrative actions
            </p>
          </div>
          <button className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline">
            View Full Audit Log
          </button>
        </div>

        <div className="px-8 pb-8">
          {activities.map((item, index) => (
            <div key={index} className="flex group">
              {/* Timeline Line & Icon */}
              <div className="flex flex-col items-center mr-4">
                <div className="flex items-center justify-center w-10 h-10 text-indigo-500 rounded-full bg-indigo-50 shrink-0">
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    className="text-sm"
                  />
                </div>
                {/* Don't show line for the last item */}
                {index !== activities.length - 1 && (
                  <div className="w-px h-full my-1 bg-gray-200"></div>
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <h3 className="text-lg font-bold leading-tight text-gray-800">
                  {item.title}
                </h3>
                <p className="max-w-xl mt-1 text-base font-semibold text-gray-500">
                  {item.description}
                </p>
                <div className="flex items-center mt-2 text-gray-400 text-[11px] font-bold tracking-wider">
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    className="mr-1.5 text-[10px]"
                  />
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Security Alert */}
      <div className="flex items-center justify-between p-6 border border-gray-300 bg-indigo-50/50 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-blue-600 rounded-full shadow-md shadow-blue-200">
            <FontAwesomeIcon icon={faShield} className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              System Security Review Required
            </h3>
            <p className="text-sm text-gray-600">
              Your monthly security credentials audit is due in 3 days.
            </p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm cursor-pointer">
          Start Review
        </button>
      </div>
    </div>
  );
};

export default ActivityDashboard;
