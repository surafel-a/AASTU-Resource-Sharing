// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faDownload,
//   faListCheck,
//   faCircleExclamation,
//   faSquareCheck,
//   faExclamation,
//   faChevronLeft,
//   faChevronRight,
//   faFileLines,
//   faCommentAlt,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import ReportOverview from "../components/admin/ReportOverview";
// import ReportRow from "../components/admin/ReportRow";

// const ReportManagement = () => {
//   return (
//     <div className="px-10 py-6">
//       <h1 className="text-3xl font-bold">Report Management</h1>
//       <section className="flex items-center justify-between mb-5">
//         <p className="text-xl font-semibold text-black/50">
//           Review and action flagged content across the platform.
//         </p>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-1 px-4 py-2 font-semibold bg-white rounded-lg cursor-pointer text-black/60">
//             <FontAwesomeIcon icon={faListCheck} />
//             <p>Bulk Action</p>
//           </div>

//           <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
//             <FontAwesomeIcon icon={faDownload} />
//             <p>Export Log</p>
//           </div>
//         </div>
//       </section>

//       {/* REPORT OVERVIEW */}
//       <section className="grid grid-cols-3 gap-5 mb-8">
//         <ReportOverview
//           icon={faCircleExclamation}
//           title="Total active reports"
//           value="42"
//           description="+5% from last week"
//           color="blue"
//         />
//         <ReportOverview
//           icon={faExclamation}
//           title="High Priority"
//           value="12"
//           description="Immediate action required"
//           color="red"
//         />
//         <ReportOverview
//           icon={faSquareCheck}
//           title="Resolved Today"
//           value="18"
//           description="72% efficiency rate"
//           color="blue"
//         />
//       </section>

//       {/* GRID CONTAINER */}
//       <section className="grid items-center grid-cols-[auto_1.5fr_1fr_1fr_1fr_auto] overflow-hidden bg-white shadow-xl rounded-xl">
//         <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
//           Type
//         </p>
//         <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
//           Reported Content
//         </p>
//         <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
//           Reporter
//         </p>
//         <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
//           Reasons
//         </p>
//         <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
//           Status
//         </p>
//         <p className="py-6 pr-6 bg-[#e4e4e9] font-bold text-black/50 text-right uppercase">
//           Actions
//         </p>

//         {/* GRID CONTAINER */}
//         <ReportRow
//           icon={faFileLines}
//           type="Document"
//           content="Advanced Calculus Notes - Unit 3"
//           contentDescription="ID: #DOC-9921"
//           reporter="Abebe K."
//           reason="Incorrect Category"
//           status="New"
//         />
//         <ReportRow
//           icon={faCommentAlt}
//           type="Comment"
//           content={`"This is not helpful it is confusing"`}
//           contentDescription={`On 'Physics lab report'`}
//           reporter="Anonymous"
//           reason="Harassment"
//           status="Under Review"
//         />
//         <ReportRow
//           icon={faUser}
//           type="User"
//           content="User_ID_77821"
//           contentDescription="Joined Oct 2023"
//           reporter="Mulu G."
//           reason="Spamming"
//           status="New"
//         />
//         <ReportRow
//           icon={faFileLines}
//           type="Document"
//           content="Mechanical Engineering Quiz 1 Answers"
//           contentDescription="ID: #DOC-1025"
//           reporter="Hanna T."
//           reason="Plagiarism"
//           status="New"
//         />

//         {/* FOOTER */}
//         <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-6">
//           <p>Showing 4 of 12 resources</p>
//           <button className="flex items-center gap-2">
//             <FontAwesomeIcon
//               icon={faChevronLeft}
//               className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
//             />

//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
//             />
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ReportManagement;

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faListCheck,
  faCircleExclamation,
  faSquareCheck,
  faExclamation,
  faChevronLeft,
  faChevronRight,
  faFileLines,
  faCommentAlt,
  faUser,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import ReportOverview from "../components/admin/ReportOverview";
import ReportRow from "../components/admin/ReportRow";
import { useReport } from "../contexts/ReportContext";

const ITEMS_PER_PAGE = 10;

const ReportManagement = () => {
  const {
    reports,
    stats,
    loading,
    total,
    getAllReports,
    getReportStats,
    updateReportStatus,
    deleteReport,
  } = useReport();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Fetch stats and reports on mount + when filters/page change
  useEffect(() => {
    getReportStats();
  }, [getReportStats]);

  useEffect(() => {
    getAllReports({
      ...(filterStatus && { status: filterStatus }),
      ...(filterType && { targetType: filterType }),
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    });
  }, [filterStatus, filterType, currentPage]);

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus);
      toast.success(`Report marked as "${newStatus}"`);
    } catch {
      toast.error("Failed to update report status");
    }
  };

  const handleDelete = async (reportId) => {
    try {
      await deleteReport(reportId);
      toast.success("Report dismissed and deleted");
    } catch {
      toast.error("Failed to delete report");
    }
  };

  const handleExport = () => {
    // Build CSV from current reports
    const headers = ["Type", "Target", "Reporter", "Reason", "Status", "Date"];
    const rows = reports.map((r) => [
      r.targetType,
      r.targetId?.title || r.targetId?.name || r.targetId?._id || "N/A",
      r.reportedBy?.name || "Anonymous",
      r.reason,
      r.status,
      new Date(r.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reports-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Map targetType to the right icon
  const getIcon = (targetType) => {
    if (targetType === "Resource") return faFileLines;
    if (targetType === "Comment") return faCommentAlt;
    return faUser;
  };

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Report Management</h1>

      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          Review and action flagged content across the platform.
        </p>
        <div className="flex items-center gap-4">
          {/* Filters */}
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 font-semibold bg-white border border-gray-200 rounded-lg cursor-pointer text-black/60"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
            <option value="Dismissed">Dismissed</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 font-semibold bg-white border border-gray-200 rounded-lg cursor-pointer text-black/60"
          >
            <option value="">All Types</option>
            <option value="Resource">Resource</option>
            <option value="Comment">Comment</option>
            <option value="User">User</option>
          </select>

          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer"
          >
            <FontAwesomeIcon icon={faDownload} />
            <p>Export Log</p>
          </button>
        </div>
      </section>

      {/* REPORT OVERVIEW — live stats from API */}
      <section className="grid grid-cols-3 gap-5 mb-8">
        <ReportOverview
          icon={faCircleExclamation}
          title="Total Active Reports"
          value={stats.activeReports}
          description="New + Under Review"
          color="blue"
        />
        <ReportOverview
          icon={faExclamation}
          title="High Priority"
          value={stats.highPriority}
          description="Immediate action required"
          color="red"
        />
        <ReportOverview
          icon={faSquareCheck}
          title="Resolved Today"
          value={stats.resolvedToday}
          description={`${stats.efficiencyRate}% efficiency rate`}
          color="blue"
        />
      </section>

      {/* REPORTS TABLE */}
      <section className="grid items-center grid-cols-[auto_1.5fr_1fr_1fr_1fr_auto] overflow-hidden bg-white shadow-xl rounded-xl">
        {/* Header */}
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
          Type
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
          Reported Content
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
          Reporter
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
          Reason
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50 uppercase">
          Status
        </p>
        <p className="py-6 pr-6 bg-[#e4e4e9] font-bold text-black/50 text-right uppercase">
          Actions
        </p>

        {/* Loading */}
        {loading && (
          <div className="col-span-6 flex justify-center py-12">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-3xl text-[#1152D4] animate-spin"
            />
          </div>
        )}

        {/* Empty state */}
        {!loading && reports.length === 0 && (
          <div className="col-span-6 py-12 text-center text-black/40 font-semibold text-lg">
            No reports found.
          </div>
        )}

        {/* Rows */}
        {!loading &&
          reports.map((report) => (
            <ReportRow
              key={report._id}
              icon={getIcon(report.targetType)}
              type={report.targetType}
              content={
                report.targetId?.title ||
                report.targetId?.name ||
                `ID: ${report.targetId?._id || "N/A"}`
              }
              contentDescription={`ID: ${report.targetId?._id || "N/A"}`}
              reporter={report.reportedBy?.name || "Anonymous"}
              reason={report.reason}
              status={report.status}
              onStatusChange={(newStatus) =>
                handleStatusUpdate(report._id, newStatus)
              }
              onDelete={() => handleDelete(report._id)}
            />
          ))}

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-6">
          <p>
            Showing {reports.length} of {total} reports
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="disabled:opacity-30"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
              />
            </button>
            <span className="text-sm">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="disabled:opacity-30"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportManagement;
