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
} from "@fortawesome/free-solid-svg-icons";
import ReportOverview from "../components/admin/ReportOverview";
import ReportRow from "../components/admin/ReportRow";

const ReportManagement = () => {
  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Report Management</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          Review and action flagged content across the platform.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 px-4 py-2 font-semibold bg-white rounded-lg cursor-pointer text-black/60">
            <FontAwesomeIcon icon={faListCheck} />
            <p>Bulk Action</p>
          </div>

          <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faDownload} />
            <p>Export Log</p>
          </div>
        </div>
      </section>

      {/* REPORT OVERVIEW */}
      <section className="grid grid-cols-3 gap-5 mb-8">
        <ReportOverview
          icon={faCircleExclamation}
          title="Total active reports"
          value="42"
          description="+5% from last week"
          color="blue"
        />
        <ReportOverview
          icon={faExclamation}
          title="High Priority"
          value="12"
          description="Immediate action required"
          color="red"
        />
        <ReportOverview
          icon={faSquareCheck}
          title="Resolved Today"
          value="18"
          description="72% efficiency rate"
          color="blue"
        />
      </section>

      {/* GRID CONTAINER */}
      <section className="grid items-center grid-cols-[auto_1.5fr_1fr_1fr_1fr_auto] overflow-hidden bg-white shadow-xl rounded-xl">
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Type
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Reported Content
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Reporter
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Reasons
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Status
        </p>
        <p className="py-6 pr-6 bg-[#e4e4e9] font-bold text-black/50 text-right uppercase">
          Actions
        </p>

        {/* GRID CONTAINER */}
        <ReportRow
          icon={faFileLines}
          type="Document"
          content="Advanced Calculus Notes - Unit 3"
          contentDescription="ID: #DOC-9921"
          reporter="Abebe K."
          reason="Incorrect Category"
          status="New"
        />
        <ReportRow
          icon={faCommentAlt}
          type="Comment"
          content={`"This is not helpful it is confusing"`}
          contentDescription={`On 'Physics lab report'`}
          reporter="Anonymous"
          reason="Harassment"
          status="Under Review"
        />
        <ReportRow
          icon={faUser}
          type="User"
          content="User_ID_77821"
          contentDescription="Joined Oct 2023"
          reporter="Mulu G."
          reason="Spamming"
          status="New"
        />
        <ReportRow
          icon={faFileLines}
          type="Document"
          content="Mechanical Engineering Quiz 1 Answers"
          contentDescription="ID: #DOC-1025"
          reporter="Hanna T."
          reason="Plagiarism"
          status="New"
        />

        {/* FOOTER */}
        <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-6">
          <p>Showing 4 of 12 resources</p>
          <button className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
            />

            <FontAwesomeIcon
              icon={faChevronRight}
              className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ReportManagement;
