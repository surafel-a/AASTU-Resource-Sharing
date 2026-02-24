import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

axios.defaults.withCredentials = true;

export function AuthProvider({ children }){
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  const signup = async (formData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData);
    console.log(data);
    setUser(data.user);
  }

  const login = async (email, password) => {
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { email, password });
    setUser(data.user);
  }

  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`);
    setUser(null);
  }

  const value = {user, isAuthenticated: !!user, loading, login, logout, signup}

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { useAuth };