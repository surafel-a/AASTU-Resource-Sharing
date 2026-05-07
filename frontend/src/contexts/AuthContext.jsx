import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// always send cookies
axios.defaults.withCredentials = true;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // SIGNUP
  const signup = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/signup`, formData);
      setUser(data.data.user);
      return data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      setUser(data.data.user);

      return data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/logout`);
      setUser(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // CHECK AUTH ON REFRESH (VERY IMPORTANT)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/v1/users/me`);
        setUser(data.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// CUSTOM HOOK
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { useAuth };
