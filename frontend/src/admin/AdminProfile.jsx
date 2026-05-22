import {
  faCamera,
  faCheckCircle,
  faChevronRight,
  faClock,
  faCloudUpload,
  faDesktop,
  faEdit,
  faEnvelope,
  faFilePdf,
  faFingerprint,
  faIdCard,
  faKey,
  faMobile,
  faPhone,
  faPrint,
  faShieldAlt,
  faTv,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ActivityDashboard from "../components/admin/ActivityDashboard";

const AdminProfile = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="p-6">
      {/* PROFILE HEADER */}
      <section className="relative mb-10 overflow-hidden bg-white shadow-lg rounded-2xl">
        {/* TOP BACKGROUND */}
        <div className="bg-[#E7EEFB] h-32 sm:h-40"></div>

        {/* CONTENT */}
        <div className="px-5 pt-20 pb-8 sm:px-8 sm:pt-24">
          {/* PROFILE IMAGE */}
          <div className="absolute top-16 sm:top-20 left-5 sm:left-8">
            <div className="relative">
              <div className="bg-white shadow-2xl h-28 w-28 sm:h-36 sm:w-36 p-1.5 rounded-full">
                <img
                  src="/default-avatar.png"
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>
          </div>

          {/* USER INFO */}
          <div className="mt-2">
            <div className="flex items-center gap-5">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                Surafel Aschalew
              </h2>
              <p className="px-4 py-1 font-bold text-white bg-blue-600 rounded-full">
                System Administrator
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* LEFT INFO */}
              <div className="flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:gap-6 sm:text-base lg:text-lg text-black/50">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPrint} />
                  <p>ICT & Systems Infrastructure</p>
                </div>

                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <p>surafel.aschalew@aastustudent.edu.et</p>
                </div>
              </div>

              {/* UPDATE & EDIT BUTTONS */}
              <div className="flex items-center gap-2 ">
                <button className="flex items-center gap-2 px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
                  <FontAwesomeIcon icon={faCamera} />
                  <p>Update Photo</p>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-lg font-semibold text-white bg-green-600 rounded-lg cursor-pointer hover:bg-green-700">
                  <FontAwesomeIcon icon={faEdit} />
                  <p>Edit Profile</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid items-start grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* PERSONAL INFORMATION */}
          <div className="self-start w-full overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faUser}
                className="text-xl text-blue-600 "
              />
              <h2 className="text-xl font-bold">Personal Information</h2>
            </div>

            <div className="flex flex-col gap-5 p-6">
              <div className="flex items-center gap-5">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="p-3 text-lg bg-gray-200 rounded-xl"
                />
                <div className="flex flex-col ">
                  <p className="font-bold uppercase text-black/60">
                    Employee ID
                  </p>
                  <h2 className="text-lg font-bold">AASTU-ADMIN-2024-001</h2>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="p-3 text-lg bg-gray-200 rounded-xl"
                />
                <div className="flex flex-col ">
                  <p className="font-bold uppercase text-black/60">
                    Phone number
                  </p>
                  <h2 className="text-lg font-bold">+251 940258197</h2>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <FontAwesomeIcon
                  icon={faUser}
                  className="p-3 text-lg bg-gray-200 rounded-xl"
                />
                <div className="flex flex-col ">
                  <p className="font-bold uppercase text-black/60">Gender</p>
                  <h2 className="text-lg font-bold">Male</h2>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="p-3 text-lg bg-gray-200 rounded-xl"
                />
                <div className="flex flex-col">
                  <p className="font-bold uppercase text-black/60">
                    Work address
                  </p>
                  <h2 className="text-lg font-bold">
                    B24, 3rd Floor, Room 302
                  </h2>
                  <p className="font-semibold text-black/60">
                    Main Campus, Addis Ababa
                  </p>
                </div>
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

              <h2 className="text-xl font-bold">Account Security</h2>
            </div>

            <div className="flex flex-col gap-6 p-6">
              <p className="text-xl font-bold">Active Sessions</p>
            </div>

            <div className="flex items-center justify-between px-6 py-3 m-6 text-lg font-semibold bg-blue-100 cursor-pointer text-black/60 rounded-xl ">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFingerprint} className="text-xl" />
                <div>
                  <p className="text-xl font-bold text-black">
                    Two-Factor Auth
                  </p>
                  <p className="-translate-y-2">Secure your login sessions.</p>
                </div>
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

            <div className="flex items-center justify-between px-6 py-3 m-6 text-lg font-semibold border-gray-300 cursor-pointer text-black/60 border-3 rounded-xl hover:bg-gray-100 ">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faKey} />
                <p>Change Password</p>
              </div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>

            {/* LOGIN DEVICES */}
            <div className="flex flex-col gap-10 p-6">
              <div className="flex items-center justify-between ">
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

              <div className="flex items-center justify-between ">
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

              <div className="flex items-center justify-between ">
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
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* OVERVIEW */}
          <div className="flex items-center gap-4">
            <div className="px-6 py-10 bg-white rounded-lg ">
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon
                  icon={faFilePdf}
                  className="p-3 text-3xl text-blue-600 bg-blue-100 rounded-2xl"
                />
                <p className="text-lg font-bold uppercase text-black/50">
                  +12%
                </p>
              </div>

              <p className="text-2xl font-bold">1,248</p>
              <p className="text-lg font-bold uppercase text-black/50 ">
                Total Approvals
              </p>
            </div>

            <div className="px-6 py-10 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon
                  icon={faCloudUpload}
                  className="p-3 text-3xl text-blue-600 bg-blue-100 rounded-2xl"
                />
                <p className="text-lg font-bold uppercase text-black/50">+5%</p>
              </div>

              <p className="text-2xl font-bold">432</p>
              <p className="text-lg font-bold uppercase text-black/50">
                Resources Uploaded
              </p>
            </div>

            <div className="px-6 py-10 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon
                  icon={faTv}
                  className="p-3 text-3xl text-blue-600 bg-blue-100 rounded-2xl"
                />
              </div>

              <p className="text-2xl font-bold">03</p>
              <p className="text-lg font-bold uppercase text-black/50">
                Active Sessions
              </p>
            </div>

            <div className="px-6 py-10 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon
                  icon={faClock}
                  className="p-3 text-3xl text-blue-600 bg-blue-100 rounded-2xl"
                />
              </div>

              <p className="text-2xl font-bold">Oct 24</p>
              <p className="text-lg font-bold uppercase text-black/50">
                Last Login
              </p>
            </div>
          </div>

          {/* ACTIVITY DASHBOARD */}
          <ActivityDashboard />
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
