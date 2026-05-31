import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UserEditModal = ({ user, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        department: user.department || "",
        role: user.role || "student",
        status: user.status || "active",
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onSave(user._id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Card */}
      <div className="w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1152D4] text-white">
          <h2 className="text-xl font-bold">Edit User</h2>

          <FontAwesomeIcon
            icon={faXmark}
            onClick={onClose}
            className="cursor-pointer text-xl hover:opacity-70"
          />
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-black/60">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-semibold text-black/60">
              Department
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-semibold text-black/60">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-semibold text-black/60">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1152D4]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white border hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-[#1152D4] text-white font-semibold hover:bg-blue-700 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
