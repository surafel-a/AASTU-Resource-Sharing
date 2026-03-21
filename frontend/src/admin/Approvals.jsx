import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faCheckDouble,
  faFilePdf,
  faFilter,
  faCheck,
  faFileLines,
  faCancel,
  faX,
  faFilePowerpoint,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faFile } from "@fortawesome/free-regular-svg-icons";

import ApprovalsOverview from "../components/admin/ApprovalsOverview";
import ApprovalsPendings from "../components/admin/ApprovalsPendings";

const Approvals = () => {
  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Pending Approvals</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          <span className="text-[#1152D4]">12</span> items waiting for review
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 px-4 py-2 font-semibold bg-white rounded-lg cursor-pointer text-black/60">
            <FontAwesomeIcon icon={faFilter} />
            <p>Filter</p>
          </div>

          <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faCheckDouble} />
            <p>Bulk Actions</p>
          </div>
        </div>
      </section>

      {/* GRID CONTAINER */}
      <section className="grid grid-cols-3 gap-8 mb-8">
        {/* INDIVIDUAL GRIDS */}
        <ApprovalsOverview
          icon={faFilePdf}
          iconDiscription="+12%"
          textTitle="New Submissions"
          textValue="48 Today"
          colorPrimary="blue"
          colorSecondary="green"
        />
        <ApprovalsOverview
          icon={faClock}
          iconDiscription="Urgent"
          textTitle="Avg. Wait Time"
          textValue="4.2 Hours"
          colorPrimary="orange"
          colorSecondary="orange"
        />
        <ApprovalsOverview
          icon={faArrowTrendUp}
          iconDiscription="Weekly"
          textTitle="Total Shared"
          textValue="1,204 Items"
          colorPrimary="purple"
          colorSecondary="purple"
        />
      </section>

      <section className="grid items-center grid-cols-[auto_1.5fr_1fr_1fr_1fr_auto] overflow-hidden bg-white shadow-xl rounded-xl">
        {/* HEADER */}
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer accent-blue-600"
          />
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Resource Title
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Contributor
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Department
        </p>
        <p className="p-6 bg-[#e4e4e9] font-bold text-black/50  uppercase">
          Submitted
        </p>
        <p className="py-6 pr-6 bg-[#e4e4e9] font-bold text-black/50 text-right uppercase">
          Actions
        </p>

        {/* APPROVALS PENDINGS */}
        <ApprovalsPendings
          iconFile={faFileLines}
          color="blue"
          course="CS101 Lecture Notes"
          courseDescription="PDF - 4.2 MB"
          contributor="Abebe Kebede"
          department="Software Engineering"
          day="Oct, 24"
          year="2023"
          time="02:15 PM"
        />
        <ApprovalsPendings
          iconFile={faFilePowerpoint}
          color="orange"
          course="Engineering Mechanics"
          courseDescription="eBook - 12.8 MB"
          contributor="Sara Tekle"
          department="Electrical Engineering"
          day="Oct, 23"
          year="2023"
          time="09:30 AM"
        />
        <ApprovalsPendings
          iconFile={faFileLines}
          color="blue"
          course="Lab Report Template"
          courseDescription="DOCX - 45 KB"
          contributor="Samuel Girma"
          department="Architecture"
          day="Oct, 22"
          year="2023"
          time="11:12 AM"
        />
        <ApprovalsPendings
          iconFile={faFilePowerpoint}
          color="orange"
          course="Algorithms Quiz Solutions"
          courseDescription="ZIP - 2.1 MB"
          contributor="Elena Bekele"
          department="Software Engineering"
          day="Oct, 22"
          year="2023"
          time="04:45 PM"
        />

        {/* FOOTER */}
        <div className="flex items-center justify-between p-6 font-bold text-black/50 bg-[#e4e4e9] col-span-6">
          <p>Showing 4 of 12 resources</p>
          <button className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="p-3 transition-all duration-200 transform rounded-full cursor-pointer hover:bg-white hover:text-[#1152D4]"
            />

            <p className="px-4 py-2 rounded-lg cursor-pointer border-black/30  hover:bg-[#1152D4] hover:text-white">
              1
            </p>
            <p className="px-4 py-2 rounded-lg cursor-pointer border-black/30  hover:bg-[#1152D4] hover:text-white">
              2
            </p>
            <p className="px-4 py-2 rounded-lg cursor-pointer border-black/30  hover:bg-[#1152D4] hover:text-white">
              3
            </p>

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

export default Approvals;
