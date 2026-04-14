import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch user data from backend
  const fetchUser = async () => {
    if (authLoading) return;
    if (!authUser || !authUser?._id) {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${authUser?._id}`,
      );
      setUser(data.data.user);
    } catch (error) {
      console.error(
        "Failed to fetch user:",
        error.response?.data || error.message,
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates) => {
    if (!authUser?._id) {
      toast.error("User session not found. Please log in again.");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`,
        updates,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUser(data.users);
      return data.user;
    } catch (error) {
      console.error(
        "Failed to update user:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/api/v1/users`);
      setUsers(data.users);
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [authUser, authLoading]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const value = { user, users, loading, fetchUser, updateUser, getAllUsers };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
