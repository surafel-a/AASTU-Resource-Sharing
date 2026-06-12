import { faBan, faPen, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getInitials } from "../../utilities/names";

import { useState } from "react";

const UserRow = ({
  name,
  universityId,
  email,
  userId,
  department,
  role,
  status,
  photo,
  updateUserByAdmin,
  onEditClick,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const normalizedStatus = (status || "").toLowerCase();
  const statusStyles = {
    active: {
      text: "text-green-600",
      dot: "bg-green-600",
    },
    suspended: {
      text: "text-red-600",
      dot: "bg-red-600",
    },
    banned: {
      text: "text-gray-600",
      dot: "bg-gray-600",
    },
  };

  const style = statusStyles[normalizedStatus] || {};

  const handleBanClick = () => {
    const action = status === "banned" ? "unban" : "ban";

    setConfirmAction({
      type: "ban",
      title: `${action.toUpperCase()} USER`,
      message: `Do you want to ${action} ${name}?`,
      onConfirm: () => {
        updateUserByAdmin(userId, {
          status: status === "banned" ? "active" : "banned",
        });
      },
    });

    setConfirmOpen(true);
  };

  const handleRoleClick = () => {
    const newRole = role === "admin" ? "student" : "admin";

    setConfirmAction({
      type: "role",
      title: "CHANGE ROLE",
      message: `Change ${name} role to ${newRole}?`,
      onConfirm: () => {
        updateUserByAdmin(userId, {
          role: newRole,
        });
      },
    });

    setConfirmOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-4 p-6">
        <p className="p-3 rounded-full bg-[#E7EEFB] font-bold text-lg">
          {getInitials(name)}
        </p>
        <div>
          <p className="text-xl font-bold ">{name}</p>
          <p className="font-medium text-black/70">{email}</p>
        </div>
      </div>
      <p className="p-6 text-xl font-semibold">{universityId}</p>
      <p className="p-6 text-lg font-semibold">{department}</p>
      <div className="p-6">
        <p className="px-3 py-1 text-lg font-bold bg-[#e2e5e7] inline-block rounded-full">
          {role}
        </p>
      </div>

      <div
        className={`flex items-center gap-2 p-6 text-xl font-bold ${style.text}`}
      >
        <div className={`w-3 h-3 rounded-full ${style.dot}`}></div>
        <p>{status}</p>
      </div>

      <div className="flex items-center p-6 text-xl text-black/50">
        <FontAwesomeIcon
          icon={faPen}
          onClick={() =>
            onEditClick({
              _id: userId,
              name,
              department,
              role,
              status,
            })
          }
          className="p-3 rounded-full cursor-pointer hover:text-green-600 hover:bg-green-100"
        />
        <FontAwesomeIcon
          icon={faUserShield}
          onClick={handleRoleClick}
          className="p-3 rounded-full cursor-pointer hover:text-blue-600 hover:bg-blue-100"
        />
        <FontAwesomeIcon
          icon={faBan}
          onClick={handleBanClick}
          className="p-3 rounded-full cursor-pointer hover:text-red-600 hover:bg-red-100"
        />
      </div>
      <div className="col-span-6 border border-black/10"></div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[320px] text-center">
            <h3 className="mb-2 text-lg font-bold text-black">
              {confirmAction?.title}
            </h3>

            <p className="mb-6 text-black/60">{confirmAction?.message}</p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  confirmAction?.onConfirm?.();
                  setConfirmOpen(false);
                }}
                className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRow;
