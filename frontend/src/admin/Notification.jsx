import {
  faCheckCircle,
  faCircleCheck,
  faExclamationCircle,
  faSliders,
  faTrash,
  faBell,
  faUserPlus,
  faFileAlt,
  faShield,
  faUpload,
  faArchive,
  faFilter,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useMemo } from "react";
import { useNotifications } from "../contexts/NotificationContext";

// Map notification types to icons/colors
const TYPE_META = {
  user: { icon: faUserPlus, bg: "bg-blue-100", color: "text-blue-600" },
  resource: { icon: faUpload, bg: "bg-purple-100", color: "text-purple-600" },
  system: {
    icon: faExclamationCircle,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  approval: {
    icon: faCircleCheck,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  report: { icon: faShield, bg: "bg-red-100", color: "text-red-600" },
  default: { icon: faBell, bg: "bg-gray-100", color: "text-gray-600" },
};

function formatTime(dateStr) {
  const date = new Date(dateStr);
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  if (diff < 172800) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const TABS = ["All", "Unread", "System", "User Activity", "Approvals"];

const Notification = () => {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState("All");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const filtered = useMemo(() => {
    if (activeTab === "All") return notifications;
    if (activeTab === "Unread") return notifications.filter((n) => !n.read);
    if (activeTab === "System")
      return notifications.filter((n) => n.type === "system");
    if (activeTab === "User Activity")
      return notifications.filter(
        (n) => n.type === "user" || n.type === "resource",
      );
    if (activeTab === "Approvals")
      return notifications.filter((n) => n.type === "approval");
    return notifications;
  }, [activeTab, notifications]);

  const tabCount = (tab) => {
    if (tab === "All") return notifications.length;
    if (tab === "Unread") return unreadCount;
    if (tab === "System")
      return notifications.filter((n) => n.type === "system").length;
    if (tab === "User Activity")
      return notifications.filter(
        (n) => n.type === "user" || n.type === "resource",
      ).length;
    if (tab === "Approvals")
      return notifications.filter((n) => n.type === "approval").length;
    return 0;
  };

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
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="rounded-full px-2 py-0.5 text-sm text-white bg-blue-600 font-bold">
              {unreadCount} New
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-600"
              />
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
            >
              <FontAwesomeIcon icon={faArchive} />
              Clear All
            </button>
          )}
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`p-3 text-lg rounded-full cursor-pointer transition ${
              showFilterPanel
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faSliders} />
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilterPanel && (
        <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center gap-6">
          <p className="font-bold text-blue-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} />
            Quick filter:
          </p>
          <div className="flex gap-3 flex-wrap">
            {TABS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActiveTab(f);
                  setShowFilterPanel(false);
                }}
                className="px-3 py-1.5 text-sm font-semibold bg-white border-2 border-blue-300 rounded-lg cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TABS */}
      <section className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-5 text-lg font-semibold text-gray-500 overflow-x-auto">
          {TABS.map((tab) => {
            const active = activeTab === tab;
            const count = tabCount(tab);
            return (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative group cursor-pointer px-2 py-2 transition flex items-center gap-2 whitespace-nowrap ${
                  active ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {tab}
                {count > 0 && tab !== "All" && (
                  <span className="text-xs font-bold bg-gray-200 text-gray-700 rounded-full px-1.5 py-0.5">
                    {count}
                  </span>
                )}
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
        <p className="text-lg font-bold text-gray-600 whitespace-nowrap ml-6">
          Showing {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        </p>
      </section>

      <div className="w-full h-1 mb-5 -translate-y-1 bg-gray-300 rounded-full"></div>

      {/* LIST */}
      <section className="flex flex-col gap-3 mt-5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FontAwesomeIcon
              icon={faBell}
              className="text-5xl mb-4 opacity-30"
            />
            <p className="text-xl font-bold">No notifications</p>
            <p className="font-semibold">You're all caught up!</p>
          </div>
        ) : (
          filtered.map((notif) => {
            const meta = TYPE_META[notif.type] || TYPE_META.default;
            return (
              <div
                key={notif._id}
                className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 transition group ${
                  notif.read
                    ? "bg-white border-gray-200 hover:border-gray-300"
                    : "bg-blue-50 border-blue-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {!notif.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                  )}
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full ${meta.bg}`}
                  >
                    <FontAwesomeIcon
                      icon={meta.icon}
                      className={`text-xl ${meta.color}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <h2
                      className={`text-lg font-bold ${notif.read ? "text-gray-800" : "text-gray-900"}`}
                    >
                      {notif.title}
                    </h2>
                    <p className="text-base font-semibold text-black/60 truncate max-w-xl">
                      {notif.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <p className="text-base font-semibold text-gray-500 whitespace-nowrap">
                    {formatTime(notif.createdAt)}
                  </p>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif._id)}
                        title="Mark as read"
                        className="p-2 text-sm text-green-600 hover:bg-green-100 rounded-lg cursor-pointer transition"
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif._id)}
                      title="Delete"
                      className="p-2 text-sm text-red-500 hover:bg-red-100 rounded-lg cursor-pointer transition"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Notification;
