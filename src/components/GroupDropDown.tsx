"use client";
import React, { useState } from "react";
import AddIDtoGroupForm from "./AddIDtoGroupForm";
import { validateAuth } from "@/utils/validateAuth";

type Member = {
  email: string;
  role: string;
};

type GroupDropDownProps = {
  name: string;
  group_email: string;
  description: string;
  data_partition_id: string;
};

const GroupDropDown = ({
  name,
  group_email,
  description,
  data_partition_id,
}: GroupDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [membersCount, setMembersCount] = useState<number>(0);
  const [showMembers, setShowMembers] = useState(false);
  const [showAddIDForm, setShowAddIDForm] = useState(false);

  const toggleDropdown = async () => {
    setIsOpen((prevState) => !prevState);
    if (!isOpen && membersCount === 0) {
      const authToken = await validateAuth();

      try {
        const response = await fetch(
          `/api/entitlements/v2/groups/${group_email}/membersCount`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "data-partition-id": data_partition_id,
              group_email: group_email,
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setMembersCount(data.membersCount);
      } catch (error) {
        console.error("Error fetching members count:", error);
      }
    }
  };

  const handleSeeMembers = async () => {
    if (showMembers) {
      setShowMembers(false);
      return;
    } else {
      setShowMembers(true);
    }

    if (members.length == 0) {
      const authToken = await validateAuth();

      try {
        const response = await fetch(
          `/api/entitlements/v2/groups/${group_email}/members/getMembers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "data-partition-id": data_partition_id,
              group_email: group_email,
              // role,
              // includeType,
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setMembers(data.members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
  };

  const handleAddMember = () => {
    setShowAddIDForm(true); // Show the AddIDtoGroupForm pop-up
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

          {/* Number of Members */}
          <div className="mb-4">
            <p className="font-semibold text-lg mb-2">
              Number of members: {membersCount}
            </p>
          </div>

          {/* Buttons */}
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 mr-2"
              onClick={handleSeeMembers}
            >
              {!showMembers ? "See Members" : "Hide Members"}
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 mr-2"
              onClick={handleAddMember}
            >
              Add Member
            </button>
          </div>

          {/* Table of Members (visible when showMembers is true) */}
          {showMembers && (
            <div className="mb-4">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Role</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.email}>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* AddIDtoGroupForm Pop-up */}
          {showAddIDForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <AddIDtoGroupForm />
                <button
                  className="mt-4 bg-gray-500 text-white px-4 py-2"
                  onClick={() => setShowAddIDForm(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupDropDown;
