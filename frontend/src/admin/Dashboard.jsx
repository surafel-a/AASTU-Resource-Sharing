import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faSquarePlus,
  faFilePdf,
  faArrowTrendUp,
  faCircleCheck,
  faCircleXmark,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import DashboardOverview from "../components/admin/DashboardOverview";
import FacultyMembers from "../components/admin/FacultyMembers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

import { useResource } from "../contexts/ResourceContext";
import { useUser } from "../contexts/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { resources, loading: resourceLoading } = useResource();
  const { users, loading: usersLoading } = useUser();
  const pendingRequests = resources.filter(
    (res) => res.status === "pending",
  ).length;

  if (resourceLoading || usersLoading) {
    return <LoadingSpinner />;
  }

  const activeUsers = users.filter((user) => user.status === "active").length;

  const uploadData = [
    { day: "Mon", uploads: 12 },
    { day: "Tue", uploads: 19 },
    { day: "Wed", uploads: 8 },
    { day: "Thu", uploads: 15 },
    { day: "Fri", uploads: 25 },
    { day: "Sat", uploads: 17 },
    { day: "Sun", uploads: 30 },
  ];

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          Welcome back, here's what's happening today at AASTU.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 px-4 py-2 font-semibold bg-white rounded-lg cursor-pointer text-black/60">
            <FontAwesomeIcon icon={faDownload} />
            <p>Export Report</p>
          </div>

          <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faSquarePlus} />
            <p>Add Resource</p>
          </div>
        </div>
      </section>

      {/* GRID CONTAINER */}
      <section className="grid grid-cols-3 gap-8">
        {/* INDIVIDUAL GRIDS */}
        <DashboardOverview
          iconBig={faFilePdf}
          iconSmall={faArrowTrendUp}
          iconDiscription="+12%"
          textTitle="Total Resources"
          textValue={resources.length}
          textDescription="Across 8 departments"
          colorPrimary="blue"
          colorSecondary="green"
        />
        <DashboardOverview
          iconBig={faFilePdf}
          iconSmall={faClock}
          iconDiscription="Priority"
          textTitle="Pending Approvals"
          textValue={pendingRequests}
          textDescription="24 urgent flags raised"
          colorPrimary="orange"
          colorSecondary="orange"
        />
        <DashboardOverview
          iconBig={faFilePdf}
          iconSmall={faArrowTrendUp}
          iconDiscription="+18%"
          textTitle="Active Users"
          textValue={activeUsers}
          textDescription="Active in last 24 hours"
          colorPrimary="blue"
          colorSecondary="green"
        />

        <section className="col-span-2 p-6 bg-white shadow-lg rounded-xl">
          <h1 className="text-2xl font-bold">Upload Trends</h1>

          <div className="flex items-center justify-between mb-8">
            <p className="text-lg font-semibold text-black/50">
              Resource submissions over the last 7 days.
            </p>

            <p className="flex items-center gap-4 px-4 py-2 font-semibold border border-gray-300 rounded-lg cursor-pointer">
              Last 7 days
            </p>
          </div>

          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uploadData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis dataKey="day" tickLine={false} axisLine={false} />

                <YAxis tickLine={false} axisLine={false} />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="uploads"
                  stroke="#1152D4"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* RECENT APPROVALS */}
        <section className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between">
          <div>
            <h1 className="mb-5 text-2xl font-bold">Recent Approvals</h1>
            <div className="flex flex-col gap-5">
              {(() => {
                const reviewed = resources
                  .filter(
                    (res) =>
                      res.status === "approved" || res.status === "rejected",
                  )
                  .slice(0, 5);

                if (reviewed.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-black/40">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-4xl mb-3"
                      />
                      <p className="font-semibold text-lg">No approvals yet</p>
                      <p className="text-sm">
                        Resources that are approved or rejected will appear
                        here.
                      </p>
                    </div>
                  );
                }

                return reviewed.map((res) => (
                  <div
                    key={res._id}
                    className="grid grid-cols-[auto_1fr] gap-5"
                  >
                    <FontAwesomeIcon
                      icon={
                        res.status === "approved"
                          ? faCircleCheck
                          : faCircleXmark
                      }
                      className={`p-2 text-xl rounded-lg ${
                        res.status === "approved"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    />
                    <div className="flex flex-col font-bold">
                      <h2 className="text-xl">{res.title}</h2>
                      <div className="flex items-center gap-3 text-black/50">
                        <p>
                          {res.status === "approved"
                            ? "Approved by Admin"
                            : "Rejected: Policy Violation"}
                        </p>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          <button
            className="mt-5 cursor-pointer text-[#1152D4] font-bold text-xl px-4 py-2 border-3 border-gray-300 border-dashed rounded-lg"
            onClick={() => navigate("/admin/approvals")}
          >
            View All Submissions
          </button>
        </section>
      </section>

      {/* ACTIVE FACULTY MEMBERS */}
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] mt-10 overflow-hidden bg-white shadow-xl rounded-xl">
        <div className="flex items-center justify-between col-span-4 px-6 py-10 font-bold">
          <h2 className="text-2xl capitalize">Active faculty members</h2>
          <p
            className="text-lg transition-all duration-100 transform cursor-pointer text-black/50 hover:text-black"
            onClick={() => navigate("/admin/user-management")}
          >
            See all users
          </p>
        </div>

        {/* HEADER */}
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Full Name
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Department
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Status
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Actions
        </p>

        {/* DATA ROW */}
        <FacultyMembers
          icon={faEllipsisVertical}
          name="Dr. Selamawit Tadesse"
          department="Electrical Engineering"
          status="Active"
        />

        <FacultyMembers
          icon={faEllipsisVertical}
          name="Mr. Biniam Girma"
          department="Software Engineering"
          status="Banned"
        />

        <FacultyMembers
          icon={faEllipsisVertical}
          name="Dr. Alazar Chernet"
          department="Mechanical Engineering"
          status="Inactive"
        />

        <FacultyMembers
          icon={faEllipsisVertical}
          name="Mr. Mikias Zelalem"
          department="Civil Engineering"
          status="Suspended"
        />
      </div>
    </div>
  );
};

export default Dashboard;
