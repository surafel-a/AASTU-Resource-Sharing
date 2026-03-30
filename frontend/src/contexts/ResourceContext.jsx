import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ResourceContext = createContext();

export function ResourceProvider({ children }) {
  const [resources, setResources] = useState([]);
  const [myResources, setMyResources] = useState([]);

  const [loading, setLoading] = useState(false);
  const { user: authUser } = useAuth();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // GET ALL RESOURCES
  const getAllResources = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/api/v1/resources`);

      setResources(data.resources);
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllResources();
  }, []);

  // MY RESOURCES
  useEffect(() => {
    if (resources.length > 0 && authUser) {
      const filteredResources = resources.filter(
        (resource) => authUser?._id === resource.uploadedBy?._id,
      );

      setMyResources(filteredResources);
    }
  }, [resources, authUser]);

  const value = { resources, loading, getAllResources, myResources };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}

export const useResource = () => {
  const context = useContext(ResourceContext);

  if (!context) {
    throw new Error("useResource must be used within AuthProvider");
  }

  return context;
};
