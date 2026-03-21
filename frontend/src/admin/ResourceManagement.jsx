import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResourceManagement = () => {
  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">Manage Resources</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          Oversee and moderate all academic materials on the platform.
        </p>
        <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
          <FontAwesomeIcon icon={faAdd} />
          <p>Add Resource</p>
        </div>
      </section>
    </div>
  );
};

export default ResourceManagement;
