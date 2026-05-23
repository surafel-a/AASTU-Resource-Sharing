import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AdminSettingsContext = createContext();

export function AdminSettingsProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchSettings = useCallback(async () => {
    if (!isAuthenticated || user?.role !== "admin") return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/admin/settings`, {
        withCredentials: true,
      });
      setSettings(data.data.settings);
    } catch (error) {
      console.error(
        "Failed to fetch settings:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, BASE_URL]);

  // Update preferences / notifications / security toggles
  const updateSettings = async (updates) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/api/v1/admin/settings`,
        updates,
        { withCredentials: true },
      );
      setSettings(data.data.settings);
      return data.data.settings;
    } catch (error) {
      console.error(
        "Failed to update settings:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  // Update name / phone / photo (hits /account sub-route)
  const updateAccountInfo = async (formData) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/api/v1/admin/settings/account`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return data.data.user;
    } catch (error) {
      console.error(
        "Failed to update account:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const value = {
    settings,
    loading,
    fetchSettings,
    updateSettings,
    updateAccountInfo,
  };

  return (
    <AdminSettingsContext.Provider value={value}>
      {children}
    </AdminSettingsContext.Provider>
  );
}

export const useAdminSettings = () => {
  const context = useContext(AdminSettingsContext);
  if (!context)
    throw new Error(
      "useAdminSettings must be used within AdminSettingsProvider",
    );
  return context;
};
