import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  // BASE URL
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // STATES
  const [courses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // FUNCTIONS
  const getAllCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/courses`);
      setAllCourses(data.data.courses);
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const value = {
    courses,
    loading,
    getAllCourses,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }

  return context;
};
