"use client";
import React, { useState } from "react";
import AddIDtoGroupForm from "./AddIDtoGroupForm";
import { useSession } from "next-auth/react";
import styles from "./GroupDropDown.module.css";

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
  const { data: session } = useSession();

  // ----------------------Toggle dropdown and get member count----------------------
  const toggleDropdown = async () => {
    // toggle isOpen
    setIsOpen((prevState) => !prevState);

    // get members count if not already fetched
    if (!isOpen && membersCount === 0) {
      if (!session || !session.accessToken) {
        throw new Error("Session not found");
      }
      try {
        const response = await fetch(
          `/api/entitlements/v2/groups/${group_email}/membersCount`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "data-partition-id": data_partition_id,
              group_email: group_email,
              Authorization: `Bearer ${session.accessToken}`,
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

  // ----------------------Handle see members and get members----------------------
  const handleSeeMembers = async () => {
    // toggle showMembers
    if (showMembers) {
      setShowMembers(false);
      return;
    } else {
      setShowMembers(true);
    }

    // get members if not already fetched
    if (members.length == 0) {
      if (!session || !session.accessToken) {
        throw new Error("Session not found");
      }

      try {
        const response = await fetch(
          `/api/entitlements/v2/groups/${group_email}/members/getMembers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "data-partition-id": data_partition_id,
              group_email: group_email,
              Authorization: `Bearer ${session.accessToken}`,
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

  // ----------------------Handle add member----------------------
  const handleAddMember = () => {
    setShowAddIDForm(true); // Show the AddIDtoGroupForm pop-up
  };

  return (
    <div className={styles.container}>
      {/* Dropdown Header */}
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{name}</span>
        <span>
          {isOpen ? (
            <img src="/icons/upArrow.svg" alt="entraID" />
          ) : (
            <img src="/icons/downArrow.svg" alt="entraID" />
          )}
        </span>
      </div>

      {/* Dropdown Body (visible when isOpen is true) */}
      {isOpen && (
        <div className="p-4">
          {/* Information */}
          <div className="text-bold bg-[#D5EAF4A3] pt-[30px] pl-5 pb-5 pr-6 flex flex-col">
            <p>Description: {description}</p>
            <p>Group email: {group_email}</p>
            {/* See Member button */}
            <button
              className="button"
              style={{
                width: "fit-content",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
              onClick={handleSeeMembers}
            >
              {!showMembers ? "See Members" : "Hide Members"}
            </button>
          </div>

          <div className="grid grid-cols-[auto_auto]">
            {/* Table of Members (visible when showMembers is true) */}
            <div>
              <p className="text-bold pb-5 pt-10 pl-4">
                Number of members: {membersCount}
              </p>
              {showMembers && (
                <div>
                  <p className="text-bold pb-5 pt-10 pl-4">Members</p>
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr>
                        <th className="text-bold px-4 py-2">
                          <i>Email</i>
                        </th>
                        <th className="text-bold px-4 py-2">
                          <i>Role</i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member.email}>
                          <td className="text-small px-4 py-2">
                            {member.email}
                          </td>
                          <td className="text-small px-4 py-2">
                            {member.role}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {/* Add Member Button */}
            <button
              className="button"
              style={{
                alignSelf: "flex-start",
                justifySelf: "end",
                marginTop: "40px",
                marginRight: "1.5rem",
                width: "123px",
              }}
              onClick={handleAddMember}
            >
              Add member
            </button>
          </div>

          {/* AddIDtoGroupForm Pop-up */}
          {showAddIDForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded max-h-[90vh] overflow-y-auto">
                <AddIDtoGroupForm group={name} />
                <button
                  className="button mt-4"
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
