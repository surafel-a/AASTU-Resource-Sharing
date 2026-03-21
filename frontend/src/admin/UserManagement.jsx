import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserManagement = () => {
  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <section className="flex items-center justify-between mb-5">
        <p className="text-xl font-semibold text-black/50">
          Manage and oversee all registered students and platform
          administrators.
        </p>
        <div className="flex items-center gap-1 px-4 py-2 bg-[#1152D4] text-white font-semibold rounded-lg cursor-pointer">
          <FontAwesomeIcon icon={faUserPlus} />
          <p>Add New User</p>
        </div>
      </section>
    </div>
  );
};

export default UserManagement;
