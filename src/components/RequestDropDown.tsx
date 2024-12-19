"use client";
import { addMember } from "@/utils/entitlement/addMember";
import { createGroup } from "@/utils/entitlement/createGroup";
import { RequestDropDownType } from "@/utils/interfaces";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  // ----------------------Toggle dropdown----------------------
  const toggleDropdown = async () => {
    // toggle isOpen
    setIsOpen((prevState) => !prevState);
  };

  // ----------------------Handle Reply----------------------
  const handleReply = (reply: boolean) => {
    // approve or reject the request, and do the corresponding API requests
    if (reply) {
      if (!session || !session.accessToken) {
        throw new Error("Session not found");
      }
      if (type.type === "CREATE_GROUP") {
        console.log(
          "CreateGroup - Set correct data_partition_id when done developing: ",
          data_partition_id
        );
        createGroup(name, description, "bootcamp", session.accessToken);
      } else {
        console.log(
          "Add Member - Set correct data_partition_id when done developing: ",
          data_partition_id
        );
        addMember(
          type.entraID,
          type.role,
          "bootcamp",
          type.group_email,
          session.accessToken
        );
      }
    }
    console.log("API request to remove the request");

    const storedRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const updatedRequests = storedRequests.filter(
      (request: RequestDropDownType) => request.requestID !== requestID
    );
    localStorage.setItem("requests", JSON.stringify(updatedRequests));

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
    <div className="bg-white border border-gray-300 w-full">
      {/* Dropdown Header */}
      <div
        className="grid grid-cols-[auto_100px_100px_25px] px-4 py-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-small">{name}</span>
        {type.type === "CREATE_GROUP" && (
          <>
            <span></span>
            <img src="/icons/check.svg" alt="entraID" />
          </>
        )}
        {type.type === "ADD_MEMBER" && (
          <>
            <img src="/icons/addMember.svg" alt="entraID" />
            <span></span>
          </>
        )}

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
          {/* Information about the request */}
          <div className="text-bold bg-[#D5EAF4A3] pt-[30px] pl-5 pb-5 pr-6 flex flex-col">
            {/* Description */}
            <p>Description: {description}</p>
            {/* Applicant */}
            <p>Applicant: {applicant}</p>
            {/* Group type */}
            {type.type === "CREATE_GROUP" && (
              <p>Group type: {type.group_type}</p>
            )}
            {/* Access type */}
            {type.type === "CREATE_GROUP" && (
              <p>Access type: {type.access_type}</p>
            )}
            {/* EntraID */}
            {type.type === "ADD_MEMBER" && <p>EntraID: {type.entraID}</p>}
            {/* Role */}
            {type.type === "ADD_MEMBER" && <p>Role: {type.role}</p>}
          </div>

          {/* Reason for request */}
          <div className="mb-4">
            <b>Reason for request: </b>
            <p className="mb-2">{reason}</p>
          </div>

          {/* Buttons for approval or rejection*/}
          <div className="mb-4 gap-5 flex">
            <button className="button" onClick={() => handleConfirmation(true)}>
              Approve
            </button>
            <button
              className="button"
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
