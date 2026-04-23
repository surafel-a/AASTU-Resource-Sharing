import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  // BASE URL
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // STATES
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // FUNCTIONS
  const createCourse = async (courseData) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/courses`,
        courseData,
      );

      setCourses((prev) => [...prev, data.data.course]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (courseId, courseData) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${BASE_URL}/api/v1/courses/${courseId}`,
        courseData,
      );
      setCourses((prev) =>
        prev.map((course) =>
          course._id === courseId ? data.data.course : course,
        ),
      );
      await getAllCourses();
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/v1/courses/${courseId}`);
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
      await getAllCourses();
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/courses`);
      setCourses(data.data.courses);
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
    createCourse,
    updateCourse,
    deleteCourse,
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
