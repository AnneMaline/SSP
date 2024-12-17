"use client";
import { addMember } from "@/utils/entitlement/addMember";
import { createGroup } from "@/utils/entitlement/createGroup";
import { RequestDropDownType } from "@/utils/interfaces";
import { useState } from "react";

interface RequestDropDownProps extends RequestDropDownType {
  showAgain: boolean;
  removeRequest: (request: RequestDropDownType) => void;
  setShowAgain: (showAgain: boolean) => void;
}

const RequestDropDown = ({
  requestID,
  name,
  description,
  applicant,
  data_partition_id,
  reason,
  type,
  removeRequest,
  showAgain,
  setShowAgain,
}: RequestDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [answer, setAnswer] = useState(false);

  // ----------------------Toggle dropdown----------------------
  const toggleDropdown = async () => {
    // toggle isOpen
    setIsOpen((prevState) => !prevState);
  };

  // ----------------------Handle Reply----------------------
  const handleReply = (reply: boolean) => {
    // approve or reject the request, and do the corresponding API requests
    if (reply) {
      if (type.type === "CREATE_GROUP") {
        console.log(
          "CreateGroup - Set correct data_partition_id when done developing: ",
          data_partition_id
        );
        createGroup(name, description, "bootcamp");
      } else {
        console.log(
          "Add Member - Set correct data_partition_id when done developing: ",
          data_partition_id
        );
        addMember(type.entraID, type.role, "bootcamp", type.group_email);
      }
    }
    console.log("API request to remove the request");
    removeRequest({
      requestID,
      name,
      description,
      applicant,
      reason,
      data_partition_id,
      type,
    });
  };

  // ----------------------Handle Confirmation----------------------
  const handleConfirmation = (reply: boolean) => {
    setAnswer(reply);
    if (showAgain) {
      setShowConfirmation(true); // Show the Confirmation pop-up
    } else {
      handleReply(reply);
    }
  };

  return (
    <div className="border border-gray-300 w-full">
      {/* Dropdown Header */}
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{name}</span>
        <span></span>
        {type.type === "CREATE_GROUP" && (
          <img src="globe.svg" alt="Globe Icon" className="w-6 h-6" />
        )}
        {type.type === "ADD_MEMBER" && (
          <img src="file.svg" alt="File Icon" className="w-6 h-6" />
        )}

        <span>{isOpen ? "↑" : "↓"}</span>
      </div>

      {/* Dropdown Body (visible when isOpen is true) */}
      {isOpen && (
        <div className="p-4">
          {/* Information about the request */}
          <div className="bg-blue-300">
            {/* Description */}
            <div className="mb-2">
              <p>
                <b>Description: </b>
                {description}
              </p>
            </div>

            {/* Applicant */}
            <div className="mb-4">
              <p className="mb-2">
                <b>Applicant: </b>
                {applicant}
              </p>
            </div>

            {/* Group type */}
            {type.type === "CREATE_GROUP" && (
              <div className="mb-4">
                <p className="mb-2">
                  <b>Group type: </b>
                  {type.group_type}
                </p>
              </div>
            )}

            {/* Access type */}
            {type.type === "CREATE_GROUP" && (
              <div className="mb-4">
                <p className="mb-2">
                  <b>Access type: </b>
                  {type.access_type}
                </p>
              </div>
            )}

            {/* EntraID */}
            {type.type === "ADD_MEMBER" && (
              <div className="mb-4">
                <p className="mb-2">
                  <b>EntraID: </b>
                  {type.entraID}
                </p>
              </div>
            )}

            {/* Role */}
            {type.type === "ADD_MEMBER" && (
              <div className="mb-4">
                <p className="mb-2">
                  <b>Role: </b>
                  {type.role}
                </p>
              </div>
            )}
          </div>

          {/* Reason for request */}
          <div className="mb-4">
            <b>Reason for request: </b>
            <p className="mb-2">{reason}</p>
          </div>

          {/* Buttons for approval or rejection*/}
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 mr-2"
              onClick={() => handleConfirmation(true)}
            >
              Approve
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 mr-2"
              onClick={() => handleConfirmation(false)}
            >
              Reject
            </button>
          </div>

          {/* Confirmation Pop-up */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <p className="mb-4">
                  Are you sure you want to {answer ? "approve" : "reject"} this
                  request?
                </p>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!showAgain}
                      onChange={(e) => setShowAgain(!e.target.checked)}
                      className="mr-2"
                    />
                    Do not show this again
                  </label>
                </div>
                <button
                  className="mt-4 bg-gray-500 text-white px-4 py-2 mr-2"
                  onClick={() => {
                    setShowConfirmation(false);
                    setShowAgain(true);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="mt-4 bg-green-500 text-white px-4 py-2"
                  onClick={() => {
                    setShowConfirmation(false);
                    handleReply(answer);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestDropDown;
