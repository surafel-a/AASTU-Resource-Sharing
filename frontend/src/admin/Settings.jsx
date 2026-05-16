import {
  faBell,
  faCheckCircle,
  faChevronRight,
  faCircleXmark,
  faClock,
  faDesktop,
  faGlobe,
  faKey,
  faLock,
  faMobile,
  faMoon,
  faRefresh,
  faSave,
  faShield,
  faShieldAlt,
  faSliders,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Settings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mb-5 text-xl font-semibold text-black/50">
        Manage your university administration preference and security.
      </p>

      <section className="grid items-start grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* ACCOUNT SETTINGS */}
          <div className="overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faUser}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />

              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Account Settings</h2>
                <p className="text-lg font-semibold text-black/60">
                  Update your personal details and account credentials.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6">
              {/* NAME & ID SECTION */}
              <div className="flex items-center justify-between gap-5">
                {/* FULL NAME */}
                <div className="flex flex-col flex-1 gap-2">
                  <p className="font-bold text-black/50">Full Name</p>
                  <input
                    placeholder="Surafel Aschalew"
                    className="w-full px-4 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] ring-1 ring-black/10"
                  />
                </div>

                {/* UNIVERSITY ID */}
                <div className="flex flex-col flex-1 gap-2">
                  <p className="font-bold text-black/50">Employee ID</p>
                  <input
                    placeholder="AASTU-ADMIN-001"
                    className="w-full px-4 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] ring-1 ring-black/10"
                  />
                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div className="flex flex-col gap-2">
                <p className="font-bold text-black/50">Email Address</p>
                <input
                  placeholder="surafel.aschalew@aastustudent.edu.et"
                  className="w-full px-4 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] ring-1 ring-black/10"
                />
              </div>

              {/* PHONE NUMBER */}
              <div className="flex flex-col gap-2">
                <p className="font-bold text-black/50">Phone Number</p>
                <input
                  placeholder="+251 11 123 4567"
                  className="w-full px-4 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] ring-1 ring-black/10"
                />
              </div>

              <div className="w-full h-1 my-2 bg-gray-300 rounded-full"></div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">Security Level</h3>
                  <p className="font-semibold text-black/50">
                    Your account has hign security clearance.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold border border-gray-300 rounded-lg cursor-pointer">
                    <FontAwesomeIcon icon={faKey} />
                    <p>Change Password</p>
                  </button>

                  <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-100 border border-blue-300 rounded-lg cursor-pointer">
                    <FontAwesomeIcon icon={faShield} />
                    <p>Manage 2FA</p>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-6 py-4 bg-[#F6F6F8] rounded-lg border-3 border-gray-300">
                <div>
                  <h2 className="text-xl font-bold">
                    Two-factor Authentication
                  </h2>
                  <p className="font-semibold text-black/60">
                    Add an extra layer of security to your account.
                  </p>
                </div>

                <button
                  className={`relative w-14 h-7 rounded-full transition cursor-pointer ${
                    twoFactorEnabled ? "bg-green-600" : "bg-gray-300"
                  }`}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <div
                    className={`absolute top-1 h-5 w-5 bg-white rounded-full transition-transform duration-200 ${
                      twoFactorEnabled ? "translate-x-8" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* SECURITY SETTINGS */}
          <div className="overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />

              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Security Settings</h2>
                <p className="text-lg font-semibold text-black/60">
                  Monitor your account activity and active sessions.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <FontAwesomeIcon icon={faMobile} />
                <p>Login Activity</p>
              </div>
            </div>

            {/* LOGIN DEVICES */}
            <div className="flex flex-col gap-10 p-6">
              <div className="flex items-center justify-between ml-5">
                <div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faDesktop}
                      className="p-3 text-xl rounded-full bg-[#F6F6F8] text-black/60"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-xl font-bold">MacBook Pro 14*</h2>
                      <p className="text-lg font-semibold text-black/60">
                        Addis Ababa, ET .Active now
                      </p>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-1 font-bold border-2 border-gray-300 rounded-full cursor-pointer">
                  Current
                </button>
              </div>

              <div className="flex items-center justify-between ml-5">
                <div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faMobile}
                      className="p-3 text-xl rounded-full bg-[#F6F6F8] text-black/60"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-xl font-bold">IPhone 15 Pro</h2>
                      <p className="text-lg font-semibold text-black/60">
                        Addis Ababa, ET .2 hour ago
                      </p>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-1 font-bold rounded-full cursor-pointer">
                  Revoke
                </button>
              </div>

              <div className="flex items-center justify-between ml-5">
                <div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faDesktop}
                      className="p-3 text-xl rounded-full bg-[#F6F6F8] text-black/60"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-xl font-bold">Windows Desktop</h2>
                      <p className="text-lg font-semibold text-black/60">
                        Nazret, ET .Yesterday 14:22
                      </p>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-1 font-bold rounded-full cursor-pointer">
                  Revoke
                </button>
              </div>

              <div className="w-full h-1 my-2 bg-gray-300 rounded-full"></div>

              <button className="flex items-center justify-center gap-3 px-4 py-2 text-lg font-semibold text-red-600 border-red-300 rounded-lg cursor-pointer border-3">
                <FontAwesomeIcon icon={faCircleXmark} />
                <span>Log out from all other devices</span>
              </button>

              <p className="text-lg font-bold text-center uppercase text-black/50">
                Last security audit: October 12, 2026
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* SYSTEM PREFERENCES */}
          <div className="self-start overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faSliders}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />

              <div className="flex flex-col">
                <h2 className="text-xl font-bold">System Preferences</h2>
                <p className="text-lg font-semibold text-black/60">
                  Customize the look and feel of your dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6">
              {/* DARK MODE */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold">Dark Mode</h2>
                  <p className="text-lg font-semibold text-black/60">
                    Switch between light and dark theme styles.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faMoon} className="text-xl" />
                  <button
                    className={`relative w-14 h-7 rounded-full transition cursor-pointer ${
                      twoFactorEnabled ? "bg-green-600" : "bg-gray-300"
                    }`}
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  >
                    <div
                      className={`absolute top-1 h-5 w-5 bg-white rounded-full transition-transform duration-200 ${
                        twoFactorEnabled ? "translate-x-8" : "translate-x-1"
                      }`}
                    ></div>
                  </button>
                </div>
              </div>

              {/* LANGUAGE */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold">Language</h2>
                  <p className="text-lg font-semibold text-black/60">
                    Select your preferred language.
                  </p>
                </div>

                <button className="px-4 py-2 border-3 border-gray-300 rounded-lg cursor-pointer bg-[#F6F6F8] flex items-center gap-2">
                  <FontAwesomeIcon icon={faGlobe} />
                  <p>English (US)</p>
                </button>
              </div>

              {/* TIMEZONE */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold">Timezone</h2>
                  <p className="text-lg font-semibold text-black/60">
                    Controls how dates and times are displayed.
                  </p>
                </div>

                <button className="px-4 py-2 border-3 border-gray-300 rounded-lg cursor-pointer bg-[#F6F6F8] flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} />
                  <p>UTC +3 (EAT)</p>
                </button>
              </div>
            </div>
          </div>

          {/* NOTIFICATION SETTINGS */}
          <div className="self-start overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faBell}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />

              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Notification Settings</h2>
                <p className="text-lg font-semibold text-black/60">
                  Manage how and when you recieve alerts.
                </p>
              </div>
            </div>

            {/* LOGIN DEVICES */}
            <div className="flex flex-col gap-10 p-6">
              <div className="flex items-center justify-between mt-2">
                <p className="text-xl font-bold">Email Notifications</p>

                <button
                  className={`relative w-14 h-7 rounded-full transition cursor-pointer ${
                    twoFactorEnabled ? "bg-green-600" : "bg-gray-300"
                  }`}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <div
                    className={`absolute top-1 h-5 w-5 bg-white rounded-full transition-transform duration-200 ${
                      twoFactorEnabled ? "translate-x-8" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">Push Notifications</p>

                <button
                  className={`relative w-14 h-7 rounded-full transition cursor-pointer ${
                    twoFactorEnabled ? "bg-green-600" : "bg-gray-300"
                  }`}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <div
                    className={`absolute top-1 h-5 w-5 bg-white rounded-full transition-transform duration-200 ${
                      twoFactorEnabled ? "translate-x-8" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="w-full h-1 my-2 bg-gray-300 rounded-full"></div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-xl font-bold">Resource Approval Alerts</p>
                  <p className="text-lg font-semibold text-black/50">
                    Notify when a resource needs approval.
                  </p>
                </div>

                <button
                  className={`relative w-14 h-7 rounded-full transition cursor-pointer ${
                    twoFactorEnabled ? "bg-green-600" : "bg-gray-300"
                  }`}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <div
                    className={`absolute top-1 h-5 w-5 bg-white rounded-full transition-transform duration-200 ${
                      twoFactorEnabled ? "translate-x-8" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-xl font-bold">Upload Progress Alerts</p>
                  <p className="text-lg font-semibold text-black/50">
                    Notify when bulk uploads are complete.
                  </p>
                </div>

                <button
                  className={`relative w-14 h-7 rounded-full transition cursor-pointer ${
                    twoFactorEnabled ? "bg-green-600" : "bg-gray-300"
                  }`}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <div
                    className={`absolute top-1 h-5 w-5 bg-white rounded-full transition-transform duration-200 ${
                      twoFactorEnabled ? "translate-x-8" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* ROLE & PERMISSIONS */}
          <div className="self-start overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faLock}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />

              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Role & Permissions</h2>
                <p className="text-lg font-semibold text-black/60">
                  Your current access levels and system privilages.
                </p>
              </div>
            </div>

            <div className="p-6 ">
              <div className="flex items-center justify-between p-5 text-blue-600 bg-blue-100 border-blue-300 border-3 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold uppercase">Current Role</h2>
                  <p className="text-lg font-semibold text-black">
                    System Administrator
                  </p>
                </div>
                <button className="px-3 py-1 font-bold text-white bg-blue-600 rounded-full">
                  Full Access
                </button>
              </div>
            </div>

            {/* <div className="p-6">
            <div className="bg-[#F6F6F8] p-6 border-gray-300 rounded-xl border-3">
              <div className="flex items-center justify-between text-xl font-bold text-black/70">
                <p>Permission</p>
                <p>Status</p>
              </div>
            </div>
          </div> */}

            <div className="m-6 overflow-hidden border-gray-300 border-3 rounded-xl">
              <div className="bg-[#F6F6F8]">
                <div className="flex items-center justify-between p-6 text-xl font-bold text-black/70">
                  <p>Permission</p>
                  <p>Status</p>
                </div>
                <div className="w-full h-1 mt-2 bg-gray-300 rounded-full"></div>
              </div>

              <div className="">
                <div className="flex items-center justify-between px-6 py-3 text-xl font-bold">
                  <p>User Management</p>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div className="w-full h-1 mt-2 bg-gray-300 rounded-full"></div>
              </div>

              <div className="">
                <div className="flex items-center justify-between px-6 py-3 text-xl font-bold">
                  <p>Financial Records</p>
                  <button className="px-2 py-1 text-sm font-bold border-2 border-gray-300 rounded-full cursor-pointer">
                    View
                  </button>
                </div>
                <div className="w-full h-1 mt-2 bg-gray-300 rounded-full"></div>
              </div>

              <div className="">
                <div className="flex items-center justify-between px-6 py-3 text-xl font-bold">
                  <p>System Logs</p>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div className="w-full h-1 mt-2 bg-gray-300 rounded-full"></div>
              </div>

              <div className="">
                <div className="flex items-center justify-between px-6 py-3 text-xl font-bold">
                  <p>Resource Deletion</p>
                  <button className="px-2 py-1 text-sm font-bold text-white bg-red-600 rounded-full">
                    None
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mb-10 text-lg font-semibold text-blue-600 cursor-pointer">
              <p>View Detailed Permission Matrix</p>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-1 bg-gray-300 rounded-full my-15"></div>

      <div className="flex items-center justify-between text-lg font-semibold">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} />
          <p>All changes are automatically drafted</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-5 text-lg font-semibold cursor-pointer">
            <FontAwesomeIcon icon={faRefresh} />
            <p>Reset Defaults</p>
          </div>

          <button className="px-4 py-2 text-lg font-semibold border border-gray-300 rounded-md cursor-pointer">
            Cancel
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-lg font-semibold text-white bg-blue-600 border border-gray-300 rounded-md cursor-pointer">
            <FontAwesomeIcon icon={faSave} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
