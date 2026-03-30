import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faGraduationCap,
  faCheckCircle,
  faCamera,
  faBell,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { formatDate } from "../utilities/formatDate";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const { user, updateUser, loading } = useUser();
  const [form, setForm] = useState({
    name: "",
    universityId: "",
    email: "",
    department: "",
    phoneNumber: "",
  });

  // Populate form when user is loaded
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        universityId: user.universityId || "",
        email: user.email || "",
        department: user.department || "",
        phoneNumber: user.phoneNumber || user.phone || "",
      });
    }
  }, [user]);

  const [courseAnnouncement, setCourseAnnouncement] = useState(true);
  const [assignmentReminder, setAssignmentReminder] = useState(true);
  const [securityUpdate, setSecurityUpdate] = useState(true);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser({
        name: form.name,
        universityId: form.universityId,
        email: form.email,
        department: form.department,
        phoneNumber: form.phoneNumber,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update profile");
    }
  };

  const handleCancel = async () => {
    if (user) {
      setForm({
        name: user.name || "",
        universityId: user.universityId || "",
        email: user.email || "",
        department: user.department || "",
        phoneNumber: user.phoneNumber || user.phone || "",
      });
    }
  };

  return (
    <div className="bg-[#F6F6F8] py-10">
      <div className="mx-50">
        <h1 className="mb-5 text-5xl font-bold">My Profile</h1>
        <p className="text-2xl font-semibold text-black/50">
          Manage your personal information and account preferances.
        </p>

        <section className="relative mt-10 overflow-hidden rounded-xl">
          <div className="bg-[#E7EEFB] h-40 "></div>
          <div className="flex flex-col p-6 bg-white h-50">
            <div className="mt-auto space-y-2">
              <h2 className="text-2xl font-bold">{user?.name}</h2>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5 text-lg font-semibold text-black/50">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faIdCard} />
                    <p>{user?.universityId}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <p>{user?.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-1 text-green-600 bg-green-100 rounded-full">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>
                    Joined{" "}
                    {user?.createdAt ? formatDate(user.createdAt) : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PROFILE */}
          <div className="absolute top-18 left-10 bg-white shadow-2xl h-40 w-40 p-1.5 rounded-xl">
            <div className="bg-[#F2E7E3] w-full h-full rounded-xl"></div>
          </div>
          <div className="absolute top-49.5 left-40">
            <FontAwesomeIcon
              icon={faCamera}
              className="text-white p-1.5 rounded-md bg-[#1152D4] cursor-pointer"
            />
          </div>
        </section>

        <div className="flex items-center gap-5">
          {/* PERSONAL DETAILS */}
          <section className="px-10 py-12 shadow-xl rounded-xl mt-10 bg-white row-span-2 w-[70%]">
            <div className="flex items-center gap-2 mb-5 text-xl font-bold">
              <FontAwesomeIcon icon={faUser} className="text-[#1152D4]" />
              <p>Personal Details</p>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-5">
                {[
                  {
                    label: "Full Name",
                    name: "name",
                    placeholder: `${user?.name}`,
                  },
                  {
                    label: "Student ID",
                    name: "universityId",
                    placeholder: `${user?.universityId}`,
                  },
                  {
                    label: "University Email",
                    name: "email",
                    placeholder: `${user?.email}`,
                  },
                  {
                    label: "Department",
                    name: "department",
                    placeholder: `${user?.department}`,
                  },
                  {
                    label: "Phone Number",
                    name: "phoneNumber",
                    placeholder: `${user?.phoneNumber}`,
                  },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <p className="text-xl font-bold text-black/50">
                      {field.label}
                    </p>
                    <input
                      name={field.name}
                      // value={form[field.name]}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-[90%] pl-4 pr-6 py-2 rounded-md bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] placeholder:font-semibold placeholder:text-black/40 ring-2 ring-black/20"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-10 mb-10 border-b-2 text-black/20"></div>
              <div className="flex items-center justify-end gap-2 text-lg font-semibold">
                <button
                  className="px-4 py-2 border-2 border-[#1152D4] rounded-md cursor-pointer"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-[#1152D4] text-white rounded-md cursor-pointer"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section className="flex flex-col gap-4 w-[30%] self-start">
            <div className="p-10 mt-10 bg-white shadow-xl rounded-xl">
              <div className="flex items-center gap-2 mb-5 text-xl font-bold">
                <FontAwesomeIcon icon={faBell} className="text-[#1152D4]" />
                <p>Notifications</p>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-y-3">
                {[
                  {
                    title: "Course Announcements",
                    desc: "Get notified about course updates",
                    state: courseAnnouncement,
                    setter: setCourseAnnouncement,
                  },
                  {
                    title: "Assignment Reminders",
                    desc: "Deadlines and submission alerts",
                    state: assignmentReminder,
                    setter: setAssignmentReminder,
                  },
                  {
                    title: "Platform Security",
                    desc: "Login alerts and security updates",
                    state: securityUpdate,
                    setter: setSecurityUpdate,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="col-span-2 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-black/50">{item.desc}</p>
                    </div>
                    <button
                      className={`self-start px-4 py-1 rounded-full ${item.state ? "bg-green-600" : "bg-gray-300"} transform transition-all duration-200`}
                      onClick={() => item.setter(!item.state)}
                    >
                      <div
                        className={`h-5 w-5 bg-white rounded-full ${item.state ? "translate-x-2.5" : "-translate-x-2.5"} transform transition-transform duration-200`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* HELP */}
            <div className="flex flex-col gap-2 p-6 bg-white shadow-xl rounded-xl">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="text-[#1152D4] text-2xl mx-auto"
              />
              <h2 className="mx-auto text-xl font-semibold">Need help?</h2>
              <p className="text-center">
                Contact the registrar office for ID and department changes.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
