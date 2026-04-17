import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  // BASE URL
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // STATES
  const [myBookmarks, setMyBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Functions
  const createBookmark = async (resourceId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/api/v1/bookmarks`, {
        resource: resourceId,
      });
      setMyBookmarks((prev) => {
        const newBookmark = data.data.bookmark;
        // const alreadyExists = prev.some((item) => item._id === newBookmark._id);
        const alreadyExists = prev.some(
          (item) =>
            String(item.resource?._id || item.resource) === String(resourceId),
        );

        if (alreadyExists) {
          return prev;
        }

        return [...prev, newBookmark];
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (resourceId) => {
    try {
      setLoading(true);

      await axios.delete(`${BASE_URL}/api/v1/bookmarks/${resourceId}`, {
        withCredentials: true,
      });

      setMyBookmarks((prev) =>
        prev.filter(
          (b) => String(b.resource?._id || b.resource) !== String(resourceId),
        ),
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMyBookmarks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/bookmarks`);
      setMyBookmarks(data.data.bookmarks);
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyBookmarks();
  }, []);

  const value = {
    createBookmark,
    deleteBookmark,
    loading,
    myBookmarks,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);

  if (!context) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }

  return context;
};
