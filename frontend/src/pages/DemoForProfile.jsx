import React from "react";

const DemoForProfile = () => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold">Course Announcements</h3>
        <p className="text-black/50">Get notified about course updates</p>
      </div>

      {/* CUSTOM MADE SWITCH TOGGLE */}
      <button
        className={`self-start px-4 py-1 rounded-full ${courseAnnouncement ? "bg-green-600" : "bg-gray-300"} transform transition-all duration-200`}
        onClick={() => setCourseAnnouncement(!courseAnnouncement)}
      >
        <div
          className={`h-5 w-5 bg-white rounded-full ${courseAnnouncement ? "translate-x-2.5" : "-translate-x-2.5"} transform transition-transform duration-200`}
        ></div>
      </button>

      <div>
        <h3 className="text-lg font-semibold">Assignment Reminders</h3>
        <p className="text-black/50">Deadlines and submission alerts</p>
      </div>

      {/* CUSTOM MADE SWITCH TOGGLE */}
      <button
        className={`self-start px-4 py-1 rounded-full ${assignmentReminder ? "bg-green-600" : "bg-gray-300"} transform transition-all duration-200`}
        onClick={() => setAssignmentReminder(!assignmentReminder)}
      >
        <div
          className={`h-5 w-5 bg-white rounded-full ${assignmentReminder ? "translate-x-2.5" : "-translate-x-2.5"} transform transition-transform duration-200`}
        ></div>
      </button>

      <div>
        <h3 className="text-lg font-semibold">Platform Security</h3>
        <p className="text-black/50">Login alerts and security updates</p>
      </div>

      {/* CUSTOM MADE SWITCH TOGGLE */}
      <button
        className={`self-start px-4 py-1 rounded-full ${securityUpdate ? "bg-green-600" : "bg-gray-300"} transform transition-all duration-200`}
        onClick={() => setSecurityUpdate(!securityUpdate)}
      >
        <div
          className={`h-5 w-5 bg-white rounded-full ${securityUpdate ? "translate-x-2.5" : "-translate-x-2.5"} transform transition-transform duration-200`}
        ></div>
      </button>

      {/* THE FORMS */}
      {/* <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold text-black/50">Full Name</p>
                  <input
                    placeholder="Abebe Bikila"
                    className="w-[90%] pl-4 pr-6 py-2 rounded-md bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 ring-2 ring-black/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold text-black/50">Student ID</p>
                  <input
                    placeholder="ETS1511/14"
                    className="w-[90%] pl-4 pr-6 py-2 rounded-md bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 ring-2 ring-black/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold text-black/50">
                    University Email
                  </p>
                  <input
                    placeholder="surafel.aschalew@aastustudent.edu.et"
                    className="w-[90%] pl-4 pr-6 py-2 rounded-md bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 ring-2 ring-black/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold text-black/50">Department</p>
                  <input
                    placeholder="Software Engineering"
                    className="w-[90%] pl-4 pr-6 py-2 rounded-md bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 ring-2 ring-black/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold text-black/50">
                    Phone Number
                  </p>
                  <input
                    placeholder="+251 940258197"
                    className="w-[90%] pl-4 pr-6 py-2 rounded-md bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 ring-2 ring-black/20"
                  />
                </div> */}
    </>
  );
};

export default DemoForProfile;
