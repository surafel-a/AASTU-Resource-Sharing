import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faFilter } from "@fortawesome/free-solid-svg-icons";

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
    </div>
  );
};

export default Approvals;
