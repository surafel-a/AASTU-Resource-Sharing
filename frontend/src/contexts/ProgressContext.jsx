import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progresses, setProgresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // GET ALL PROGRESS
  const getAllProgress = async () => {
    try {
      setLoading(true);

      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/api/v1/progress`, {
        withCredentials: true,
      });

      setProgresses(data.progresses);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // SAVE PROGRESS
  const saveProgress = async (resourceId, progress, totalPages) => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/progress`,
        {
          resourceId,
          progress,
          totalPages,
        },
        {
          withCredentials: true,
        },
      );

      getAllProgress();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProgress();
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progresses,
        loading,
        saveProgress,
        getAllProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }

  return context;
};
