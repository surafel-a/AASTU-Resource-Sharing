import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchNotifications = useCallback(
    async (params = {}) => {
      if (!isAuthenticated || user?.role !== "admin") return;
      try {
        setLoading(true);
        const query = new URLSearchParams(params).toString();
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/notifications${query ? `?${query}` : ""}`,
          { withCredentials: true },
        );
        setNotifications(data.data.notifications);
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, user, BASE_URL],
  );

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/v1/notifications/${id}`,
        {},
        { withCredentials: true },
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error(
        "Failed to mark as read:",
        error.response?.data || error.message,
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/api/v1/notifications/mark-all-read`,
        {},
        { withCredentials: true },
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Failed to mark all as read:",
        error.response?.data || error.message,
      );
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/notifications/${id}`, {
        withCredentials: true,
      });
      const deleted = notifications.find((n) => n._id === id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      if (deleted && !deleted.read)
        setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error(
        "Failed to delete notification:",
        error.response?.data || error.message,
      );
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/notifications`, {
        withCredentials: true,
      });
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Failed to clear notifications:",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const value = {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  return context;
};
