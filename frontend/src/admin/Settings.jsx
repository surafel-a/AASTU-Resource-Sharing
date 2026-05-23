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
  faEye,
  faEyeSlash,
  faSun,
  faCheck,
  faTimes,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useAdminSettings } from "../contexts/AdminSettingsContext";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Toggle = ({ checked, onChange }) => (
  <button
    className={`relative w-14 h-7 rounded-full transition cursor-pointer flex-shrink-0 ${
      checked ? "bg-green-500" : "bg-gray-300"
    }`}
    onClick={() => onChange(!checked)}
  >
    <div
      className={`absolute top-1 h-5 w-5 bg-white rounded-full shadow transition-transform duration-200 ${
        checked ? "translate-x-8" : "translate-x-1"
      }`}
    />
  </button>
);

const Settings = () => {
  const {
    settings,
    loading,
    updateSettings,
    updateAccountInfo,
    fetchSettings,
  } = useAdminSettings();
  const { user, fetchUser } = useUser();
  const { logout } = useAuth();

  // ── Account form ──────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({ name: "", phoneNumber: "" });
  const [hasAccountChanges, setHasAccountChanges] = useState(false);

  // ── Password ──────────────────────────────────────────────────────────────
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPw, setShowPw] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // ── Toggles (sourced from DB settings) ───────────────────────────────────
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English (US)");
  const [timezone, setTimezone] = useState("UTC +3 (EAT)");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [approvalAlerts, setApprovalAlerts] = useState(true);
  const [uploadAlerts, setUploadAlerts] = useState(false);

  const [hasToggleChanges, setHasToggleChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  // Seed state from DB when settings load
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!settings) return;
    setTwoFactor(settings.security?.twoFactorEnabled ?? false);
    setDarkMode(settings.preferences?.darkMode ?? false);
    setLanguage(settings.preferences?.language ?? "English (US)");
    setTimezone(settings.preferences?.timezone ?? "UTC +3 (EAT)");
    setEmailNotif(settings.notifications?.emailNotifications ?? true);
    setPushNotif(settings.notifications?.pushNotifications ?? true);
    setApprovalAlerts(settings.notifications?.resourceApprovalAlerts ?? true);
    setUploadAlerts(settings.notifications?.uploadProgressAlerts ?? false);
  }, [settings]);

  const handleToggleChange = (setter) => (val) => {
    setter(val);
    setHasToggleChanges(true);
  };

  const handleSave = async () => {
    if (passwordData.newPassword) {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("New passwords do not match!");
        return;
      }
      if (passwordData.newPassword.length < 8) {
        toast.error("Password must be at least 8 characters.");
        return;
      }
    }

    try {
      setSaving(true);

      const promises = [];

      // 1. Save account changes (name/phone)
      if (hasAccountChanges) {
        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("phoneNumber", formData.phoneNumber);
        promises.push(updateAccountInfo(fd).then(() => fetchUser()));
      }

      // 2. Save toggle/preference changes
      if (hasToggleChanges) {
        promises.push(
          updateSettings({
            security: { twoFactorEnabled: twoFactor },
            preferences: { darkMode, language, timezone },
            notifications: {
              emailNotifications: emailNotif,
              pushNotifications: pushNotif,
              resourceApprovalAlerts: approvalAlerts,
              uploadProgressAlerts: uploadAlerts,
            },
          }),
        );
      }

      await Promise.all(promises);

      toast.success("Settings saved successfully!");
      setHasAccountChanges(false);
      setHasToggleChanges(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordSection(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (user)
      setFormData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
      });
    if (settings) {
      setTwoFactor(settings.security?.twoFactorEnabled ?? false);
      setDarkMode(settings.preferences?.darkMode ?? false);
      setLanguage(settings.preferences?.language ?? "English (US)");
      setTimezone(settings.preferences?.timezone ?? "UTC +3 (EAT)");
      setEmailNotif(settings.notifications?.emailNotifications ?? true);
      setPushNotif(settings.notifications?.pushNotifications ?? true);
      setApprovalAlerts(settings.notifications?.resourceApprovalAlerts ?? true);
      setUploadAlerts(settings.notifications?.uploadProgressAlerts ?? false);
    }
    setHasAccountChanges(false);
    setHasToggleChanges(false);
    toast.info("Reset to saved values.");
  };

  const handleLogoutAll = async () => {
    if (!window.confirm("This will log you out from all devices. Continue?"))
      return;
    try {
      await logout();
      toast.success("Logged out from all devices.");
    } catch {
      toast.error("Failed to log out.");
    }
  };

  const hasChanges = hasAccountChanges || hasToggleChanges;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-4xl text-blue-600 animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mb-5 text-xl font-semibold text-black/50">
        Manage your university administration preferences and security.
      </p>

      <section className="grid items-start grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* ACCOUNT SETTINGS */}
          <div className="overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faUser}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />
              <div>
                <h2 className="text-xl font-bold">Account Settings</h2>
                <p className="text-lg font-semibold text-black/60">
                  Update your personal details.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-6">
              <div className="flex items-center justify-between gap-5">
                <div className="flex flex-col flex-1 gap-2">
                  <label className="font-bold text-black/50">Full Name</label>
                  <input
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, name: e.target.value }));
                      setHasAccountChanges(true);
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] ring-1 ring-black/10"
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label className="font-bold text-black/50">Employee ID</label>
                  <input
                    value={user?.universityId || ""}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 ring-1 ring-black/10 cursor-not-allowed text-gray-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-black/50">Email Address</label>
                <input
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 ring-1 ring-black/10 cursor-not-allowed text-gray-500"
                />
                <p className="text-xs font-semibold text-gray-400">
                  Email cannot be changed. Contact IT support.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-black/50">Phone Number</label>
                <input
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, phoneNumber: e.target.value }));
                    setHasAccountChanges(true);
                  }}
                  placeholder="0912345678"
                  className="w-full px-4 py-3 rounded-lg bg-[#F6F6F8] focus:outline-none focus:ring-2 focus:ring-[#1152D4] ring-1 ring-black/10"
                />
              </div>

              <div className="w-full h-px bg-gray-200" />

              {/* Password */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Password & Security</h3>
                  <p className="font-semibold text-black/50">
                    Change your login password.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <FontAwesomeIcon icon={faKey} />
                    {showPasswordSection ? "Cancel" : "Change Password"}
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-100 border border-blue-300 rounded-lg cursor-pointer hover:bg-blue-200">
                    <FontAwesomeIcon icon={faShield} />
                    Manage 2FA
                  </button>
                </div>
              </div>

              {showPasswordSection && (
                <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  {[
                    {
                      key: "currentPassword",
                      label: "Current Password",
                      show: "current",
                    },
                    { key: "newPassword", label: "New Password", show: "new" },
                    {
                      key: "confirmPassword",
                      label: "Confirm Password",
                      show: "confirm",
                    },
                  ].map(({ key, label, show }) => (
                    <div key={key} className="flex flex-col gap-1">
                      <label className="text-sm font-bold text-black/60">
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          type={showPw[show] ? "text" : "password"}
                          value={passwordData[key]}
                          onChange={(e) =>
                            setPasswordData((p) => ({
                              ...p,
                              [key]: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2.5 pr-10 rounded-lg bg-white ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() =>
                            setShowPw((p) => ({ ...p, [show]: !p[show] }))
                          }
                          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={showPw[show] ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2FA */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#F6F6F8] rounded-lg border-3 border-gray-300">
                <div>
                  <h2 className="text-xl font-bold">
                    Two-factor Authentication
                  </h2>
                  <p className="font-semibold text-black/60">
                    Add an extra layer of security.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {twoFactor && (
                    <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                  <Toggle
                    checked={twoFactor}
                    onChange={handleToggleChange(setTwoFactor)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECURITY / SESSIONS */}
          <div className="overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />
              <div>
                <h2 className="text-xl font-bold">Security Settings</h2>
                <p className="text-lg font-semibold text-black/60">
                  Monitor your active sessions.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <p className="text-xl font-semibold flex items-center gap-2">
                <FontAwesomeIcon icon={faMobile} /> Login Activity
              </p>

              {[
                {
                  icon: faDesktop,
                  device: "MacBook Pro 14″",
                  loc: "Addis Ababa, ET",
                  time: "Active now",
                  current: true,
                },
                {
                  icon: faMobile,
                  device: "iPhone 15 Pro",
                  loc: "Addis Ababa, ET",
                  time: "2 hours ago",
                  current: false,
                },
                {
                  icon: faDesktop,
                  device: "Windows Desktop",
                  loc: "Nazret, ET",
                  time: "Yesterday 14:22",
                  current: false,
                },
              ].map(({ icon, device, loc, time, current }) => (
                <div
                  key={device}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={icon}
                      className="p-3 text-xl rounded-full bg-white text-black/60 shadow-sm"
                    />
                    <div>
                      <p className="font-bold">{device}</p>
                      <p className="text-sm font-semibold text-black/60">
                        {loc} · {time}
                      </p>
                    </div>
                  </div>
                  {current ? (
                    <span className="px-3 py-1 text-sm font-bold text-green-700 bg-green-100 border border-green-300 rounded-full">
                      Current
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        toast.success(`Session on ${device} revoked.`)
                      }
                      className="px-4 py-1.5 text-sm font-bold text-red-600 border-2 border-red-200 rounded-full cursor-pointer hover:bg-red-50"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}

              <div className="w-full h-px bg-gray-200 mt-2" />
              <button
                onClick={handleLogoutAll}
                className="flex items-center justify-center gap-3 px-4 py-2.5 text-lg font-semibold text-red-600 border-2 border-red-300 rounded-lg cursor-pointer hover:bg-red-50"
              >
                <FontAwesomeIcon icon={faCircleXmark} />
                Log out from all other devices
              </button>
              <p className="text-sm font-bold text-center uppercase text-black/40">
                Last security audit: October 12, 2025
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* SYSTEM PREFERENCES */}
          <div className="overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faSliders}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />
              <div>
                <h2 className="text-xl font-bold">System Preferences</h2>
                <p className="text-lg font-semibold text-black/60">
                  Customize your dashboard.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Dark Mode</h2>
                  <p className="font-semibold text-black/60">
                    Switch between light and dark theme.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={darkMode ? faMoon : faSun}
                    className={darkMode ? "text-indigo-600" : "text-yellow-500"}
                  />
                  <Toggle
                    checked={darkMode}
                    onChange={handleToggleChange(setDarkMode)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Language</h2>
                  <p className="font-semibold text-black/60">
                    Select your preferred language.
                  </p>
                </div>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setHasToggleChanges(true);
                  }}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-[#F6F6F8] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {["English (US)", "Amharic", "Afaan Oromoo", "Tigrinya"].map(
                    (l) => (
                      <option key={l}>{l}</option>
                    ),
                  )}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Timezone</h2>
                  <p className="font-semibold text-black/60">
                    Controls how dates/times are displayed.
                  </p>
                </div>
                <select
                  value={timezone}
                  onChange={(e) => {
                    setTimezone(e.target.value);
                    setHasToggleChanges(true);
                  }}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-[#F6F6F8] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[
                    "UTC +3 (EAT)",
                    "UTC +0 (GMT)",
                    "UTC +1 (CET)",
                    "UTC +2 (CAT)",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* NOTIFICATION SETTINGS */}
          <div className="overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faBell}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />
              <div>
                <h2 className="text-xl font-bold">Notification Settings</h2>
                <p className="text-lg font-semibold text-black/60">
                  Manage how you receive alerts.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-6">
              {[
                {
                  label: "Email Notifications",
                  desc: "Receive alerts via university email.",
                  val: emailNotif,
                  set: setEmailNotif,
                },
                {
                  label: "Push Notifications",
                  desc: "In-browser push notifications.",
                  val: pushNotif,
                  set: setPushNotif,
                },
              ].map(({ label, desc, val, set }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{label}</p>
                    <p className="text-sm font-semibold text-black/50">
                      {desc}
                    </p>
                  </div>
                  <Toggle checked={val} onChange={handleToggleChange(set)} />
                </div>
              ))}

              <div className="w-full h-px bg-gray-200" />

              {[
                {
                  label: "Resource Approval Alerts",
                  desc: "Notify when a resource needs approval.",
                  val: approvalAlerts,
                  set: setApprovalAlerts,
                },
                {
                  label: "Upload Progress Alerts",
                  desc: "Notify when bulk uploads are complete.",
                  val: uploadAlerts,
                  set: setUploadAlerts,
                },
              ].map(({ label, desc, val, set }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{label}</p>
                    <p className="text-sm font-semibold text-black/50">
                      {desc}
                    </p>
                  </div>
                  <Toggle checked={val} onChange={handleToggleChange(set)} />
                </div>
              ))}
            </div>
          </div>

          {/* ROLE & PERMISSIONS */}
          <div className="overflow-hidden bg-white border-gray-300 border-3 rounded-xl">
            <div className="p-6 bg-[#F6F6F8] border-b-3 border-b-gray-300 flex items-center gap-4">
              <FontAwesomeIcon
                icon={faLock}
                className="p-3 text-xl text-blue-600 bg-blue-100 rounded-lg"
              />
              <div>
                <h2 className="text-xl font-bold">Role & Permissions</h2>
                <p className="text-lg font-semibold text-black/60">
                  Your current access levels.
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between p-5 text-blue-600 bg-blue-100 border-blue-300 border-3 rounded-2xl">
                <div>
                  <h2 className="text-lg font-bold uppercase">Current Role</h2>
                  <p className="text-base font-semibold text-black">
                    System Administrator
                  </p>
                </div>
                <span className="px-3 py-1 font-bold text-white bg-blue-600 rounded-full text-sm">
                  Full Access
                </span>
              </div>
            </div>
            <div className="mx-6 mb-6 overflow-hidden border-gray-300 border-3 rounded-xl">
              <div className="bg-[#F6F6F8] px-6 py-4 flex items-center justify-between font-bold text-black/60 border-b-2 border-gray-200">
                <p>Permission</p>
                <p>Status</p>
              </div>
              {[
                { name: "User Management", status: "full" },
                { name: "Financial Records", status: "view" },
                { name: "System Logs", status: "full" },
                { name: "Resource Deletion", status: "none" },
              ].map(({ name, status }, i, arr) => (
                <div key={name}>
                  <div className="flex items-center justify-between px-6 py-3 font-bold">
                    <p>{name}</p>
                    {status === "full" && (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-green-600"
                      />
                    )}
                    {status === "view" && (
                      <span className="px-2 py-0.5 text-sm font-bold border-2 border-gray-300 rounded-full">
                        View
                      </span>
                    )}
                    {status === "none" && (
                      <span className="px-2 py-0.5 text-sm font-bold text-white bg-red-500 rounded-full">
                        None
                      </span>
                    )}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-px bg-gray-200 mx-4" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mb-6 text-base font-semibold text-blue-600 cursor-pointer hover:underline">
              <p>View Detailed Permission Matrix</p>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gray-300 rounded-full my-10" />

      {/* FOOTER */}
      <div className="flex items-center justify-between text-lg font-semibold">
        <div className="flex items-center gap-2 text-gray-500">
          <FontAwesomeIcon
            icon={hasChanges ? faTimes : faCheck}
            className={hasChanges ? "text-orange-500" : "text-green-500"}
          />
          <p>{hasChanges ? "You have unsaved changes" : "All changes saved"}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 mr-2 text-base font-semibold cursor-pointer hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faRefresh} /> Reset
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-base font-semibold border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-5 py-2 text-base font-semibold text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon
              icon={saving ? faSpinner : faSave}
              className={saving ? "animate-spin" : ""}
            />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
