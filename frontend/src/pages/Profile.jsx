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
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { user, updateUser, loading } = useUser();

  const [form, setForm] = useState({
    name: "",
    universityId: "",
    email: "",
    department: "",
    phoneNumber: "",
  });

  // POPULATE FORM
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

  // NOTIFICATIONS
  const [courseAnnouncement, setCourseAnnouncement] = useState(true);

  const [assignmentReminder, setAssignmentReminder] = useState(true);

  const [securityUpdate, setSecurityUpdate] = useState(true);

  // LOADING
  if (loading) {
    return <LoadingSpinner />;
  }

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE
  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("department", form.department);
      formData.append("phoneNumber", form.phoneNumber);

      if (profileImage) {
        formData.append("photo", profileImage);
      }

      await updateUser(formData);

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update profile");
    }
  };

  // CANCEL
  const handleCancel = () => {
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
    <div className="bg-[#F6F6F8] min-h-screen py-6 md:py-10">
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-20 2xl:mx-32">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            My Profile
          </h1>

          <p className="text-base sm:text-lg lg:text-2xl font-semibold text-black/50">
            Manage your personal information and account preferences.
          </p>
        </div>

        {/* PROFILE HEADER */}
        <section className="relative overflow-hidden rounded-2xl shadow-lg bg-white mb-10">
          {/* TOP BACKGROUND */}
          <div className="bg-[#E7EEFB] h-32 sm:h-40"></div>

          {/* CONTENT */}
          <div className="px-5 sm:px-8 pb-8 pt-20 sm:pt-24">
            {/* PROFILE IMAGE */}
            <div className="absolute top-16 sm:top-20 left-5 sm:left-8">
              <div className="relative">
                <div className="bg-white shadow-2xl h-28 w-28 sm:h-36 sm:w-36 p-1.5 rounded-2xl">
                  <img
                    src={preview || user?.photo || "/default-avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* CAMERA */}
                <button
                  className="absolute bottom-1 right-1 bg-[#1152D4] text-white p-2 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 transition"
                  onClick={() =>
                    document.getElementById("profileUpload").click()
                  }
                >
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
            </div>

            {/* USER INFO */}
            <div className="mt-2 sm:ml-40">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {user?.name}
              </h2>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* LEFT INFO */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm sm:text-base lg:text-lg font-semibold text-black/50">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faIdCard} />
                    <p>{user?.universityId}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <p>{user?.department}</p>
                  </div>
                </div>

                {/* JOIN DATE */}
                <div className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base text-green-700 bg-green-100 rounded-full w-fit">
                  <FontAwesomeIcon icon={faCheckCircle} />

                  <p>
                    Joined{" "}
                    {user?.createdAt ? formatDate(user.createdAt) : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          id="profileUpload"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
              toast.error("Only image files allowed");
              return;
            }

            if (file.size > 2 * 1024 * 1024) {
              toast.error("Max size is 2MB");
              return;
            }

            setProfileImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {/* MAIN CONTENT */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* PERSONAL DETAILS */}
          <section className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 lg:p-10 w-full xl:w-[70%]">
            {/* TITLE */}
            <div className="flex items-center gap-3 mb-8 text-xl font-bold">
              <FontAwesomeIcon icon={faUser} className="text-[#1152D4]" />

              <p>Personal Details</p>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Full Name",
                  name: "name",
                },
                {
                  label: "Student ID",
                  name: "universityId",
                },
                {
                  label: "University Email",
                  name: "email",
                },
                {
                  label: "Department",
                  name: "department",
                },
                {
                  label: "Phone Number",
                  name: "phoneNumber",
                },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <p className="font-bold text-black/50">{field.label}</p>

                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] ring-1 ring-black/10"
                  />
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="px-5 py-3 border-2 border-[#1152D4] rounded-xl cursor-pointer hover:bg-blue-50 transition font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="px-6 py-3 bg-[#1152D4] text-white rounded-xl cursor-pointer hover:bg-blue-700 transition font-semibold"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </section>

          {/* SIDEBAR */}
          <section className="flex flex-col gap-6 w-full xl:w-[30%]">
            {/* NOTIFICATIONS */}
            <div className="p-6 sm:p-8 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-6 text-xl font-bold">
                <FontAwesomeIcon icon={faBell} className="text-[#1152D4]" />

                <p>Notifications</p>
              </div>

              <div className="space-y-6">
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
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>

                      <p className="text-sm text-black/50">{item.desc}</p>
                    </div>

                    {/* TOGGLE */}
                    <button
                      className={`relative w-14 h-7 rounded-full transition ${
                        item.state ? "bg-green-600" : "bg-gray-300"
                      }`}
                      onClick={() => item.setter(!item.state)}
                    >
                      <div
                        className={`absolute top-1 h-5 w-5 bg-white rounded-full transition-transform duration-200 ${
                          item.state ? "translate-x-8" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* HELP */}
            <div className="flex flex-col items-center text-center gap-3 p-6 bg-white shadow-lg rounded-2xl">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="text-[#1152D4] text-3xl"
              />

              <h2 className="text-xl font-semibold">Need help?</h2>

              <p className="text-black/60">
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
