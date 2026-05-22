import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";

const ReportContext = createContext();

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    activeReports: 0,
    highPriority: 0,
    resolvedToday: 0,
    efficiencyRate: 0,
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // ── Admin: fetch all reports (with optional filters) ───────────────────────
  // filters: { status, targetType, page, limit }
  const getAllReports = useCallback(
    async (filters = {}) => {
      try {
        setLoading(true);
        const params = new URLSearchParams(filters).toString();
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/reports?${params}`,
          { withCredentials: true },
        );
        setReports(data.data.reports);
        setTotal(data.total);
      } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [BASE_URL],
  );

  // ── Admin: fetch dashboard stats ───────────────────────────────────────────
  const getReportStats = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/reports/stats`, {
        withCredentials: true,
      });
      setStats(data.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }, [BASE_URL]);

  // ── Admin: update report status ────────────────────────────────────────────
  const updateReportStatus = async (reportId, status, resolutionNote = "") => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/api/v1/reports/${reportId}/status`,
        { status, resolutionNote },
        { withCredentials: true },
      );
      // Update report in local state immediately
      setReports((prev) =>
        prev.map((r) => (r._id === reportId ? data.data.report : r)),
      );
      // Refresh stats since counts changed
      await getReportStats();
      return data.data.report;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  // ── Admin: delete a report ─────────────────────────────────────────────────
  const deleteReport = async (reportId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/reports/${reportId}`, {
        withCredentials: true,
      });
      setReports((prev) => prev.filter((r) => r._id !== reportId));
      setTotal((prev) => prev - 1);
      await getReportStats();
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  // ── User: submit a report ──────────────────────────────────────────────────
  const submitReport = async ({
    targetType,
    targetId,
    reason,
    description,
  }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/reports`,
        { targetType, targetId, reason, description },
        { withCredentials: true },
      );
      return data.data.report;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  const value = {
    reports,
    stats,
    loading,
    total,
    getAllReports,
    getReportStats,
    updateReportStatus,
    deleteReport,
    submitReport,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
}

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within ReportProvider");
  }
  return context;
};
