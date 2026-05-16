import {
  faCheckCircle,
  faCircleCheck,
  faExclamationCircle,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Notification = () => {
  const tabs = ["All Notifications", "Unread", "System", "User Activity"];

  const [activeTab, setActiveTab] = useState("All Notifications");
  return (
    <div className="px-10 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="rounded-full px-2 py-0.5 text-sm text-white bg-blue-600 font-bold">
            3 New
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 text-lg font-semibold bg-white border-2 border-gray-300 rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faCheckCircle} />
            <p>Mark all as read</p>
          </button>
          <FontAwesomeIcon
            icon={faSliders}
            className="p-3 text-lg rounded-full cursor-pointer hover:bg-gray-300"
          />
        </div>
      </div>

      <section className="flex items-center justify-between mt-5">
        {/* Tabs */}
        <div className="flex items-center w-full gap-5 text-lg font-semibold text-gray-500">
          {tabs.map((item) => {
            const active = activeTab === item;

            return (
              <div
                key={item}
                onClick={() => setActiveTab(item)}
                className={`relative group cursor-pointer px-2 py-2 transition ${
                  active ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {item}

                <span
                  className={`absolute left-0 bottom-0 w-full rounded-full z-10 transition-all duration-200 ${
                    active
                      ? "h-[3px] bg-blue-600"
                      : "h-[3px] bg-transparent group-hover:bg-blue-600"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE TEXT (this is your missing part) */}
        <p className="text-lg font-bold text-gray-600 whitespace-nowrap">
          Showing 7 items
        </p>
      </section>

      <div className="w-full h-1 mb-5 -translate-y-1 bg-gray-300 rounded-full"></div>

      {/* NOTIFICATIONS */}
      <section className="flex flex-col gap-4 mt-5">
        <div className="flex items-center justify-between px-5 py-3 bg-blue-100 rounded-lg">
          <div className="flex items-center gap-1">
            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
            <div className="w-12 h-12 mr-3 bg-red-600 rounded-full"></div>
            <div>
              <h2 className="text-lg font-bold">New Student Registered</h2>
              <p className="text-lg font-semibold text-black/60">
                Abel Tesfaye has completed registration for the Electircal
                Engineering department.
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">2 min ago</p>
        </div>

        <div className="flex items-center justify-between px-5 py-3 bg-blue-100 rounded-lg">
          <div className="flex items-center gap-1">
            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-3 text-green-600 bg-green-200 rounded-full">
              <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Approval Request Pending</h2>
              <p className="text-lg font-semibold text-black/60">
                Budget request for laboratory supplies (Q4) requires your
                immediate review.
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">15 min ago</p>
        </div>

        <div className="flex items-center justify-between px-5 py-3 bg-blue-100 rounded-lg">
          <div className="flex items-center gap-1">
            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-3 text-red-600 bg-red-200 rounded-full">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">System Backup Failed</h2>
              <p className="text-lg font-semibold text-black/60">
                The automated weekly backup to Cloud Storage failed due to
                insufficient space.
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">1 hour ago</p>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-2 border-gray-300 rounded-lg">
          <div className="flex items-center gap-1">
            <div className="w-12 h-12 mr-3 bg-red-600 rounded-full"></div>
            <div>
              <h2 className="text-lg font-bold">New Resource Uploaded</h2>
              <p className="text-lg font-semibold text-black/60">
                Dr. Hanna Soloman uploaded "Advanced Calculus - Semester 2
                Courseware" to the repository.
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">3 hours ago</p>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-2 border-gray-300 rounded-lg">
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-3 text-orange-600 bg-orange-200 rounded-full">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">System Update Scheduled</h2>
              <p className="text-lg font-semibold text-black/60">
                Maintenance window scheduled for Sunday, 2:00 AM. Access might
                be intermittent.
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">5 hours ago</p>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-2 border-gray-300 rounded-lg">
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-3 text-green-600 bg-green-200 rounded-full">
              <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Course Proposal Approved</h2>
              <p className="text-lg font-semibold text-black/60">
                The proposal for "Ethical AI in modern society" has been
                officially approved.
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">Yesterday</p>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-2 border-gray-300 rounded-lg">
          <div className="flex items-center gap-1">
            <div className="w-12 h-12 mr-3 bg-red-600 rounded-full"></div>
            <div>
              <h2 className="text-lg font-bold">Staff Profile Updated</h2>
              <p className="text-lg font-semibold text-black/60">
                Dawit Mekonnen updated their professional certificate in the HR
                portal.
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">Yesterday</p>
        </div>
      </section>
    </div>
  );
};

export default Notification;
