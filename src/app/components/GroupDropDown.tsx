"use client";
import React, { useState } from "react";

type Member = {
  id: string;
  role: string;
};

type GroupDropDownProps = {
  name: string;
  description: string;
  members: Member[];
  onDelete: () => void;
};

const GroupDropDown: React.FC<GroupDropDownProps> = ({
  name,
  description,
  members: initialMembers,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Add member. Template - Change!!!!
  const handleAddMember = () => {
    const newId = (members.length + 1).toString();
    const newRole = `New Role ${newId}`;
    setMembers((prev) => [...prev, { id: newId, role: newRole }]);
  };

  return (
    <div className="border border-gray-300 mr-2 ml-2">
      {/* Dropdown Header */}
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{name}</span>
        <span>{isOpen ? "↑" : "↓"}</span>
      </div>

      {/* Dropdown Body (visible when isOpen is true) */}
      {isOpen && (
        <div className="p-4">
          {/* Description */}
          <div className="mb-4 text-gray-600">
            <p>{description}</p>
          </div>

          {/* Table of Members */}
          <div className="mb-4">
            <p className="font-semibold text-lg mb-2">
              Number of members: {members.length}
            </p>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleAddMember}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Member
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDropDown;
