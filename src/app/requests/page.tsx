"use client";

import RequestDropDown from "@/components/RequestDropDown";
import { RequestDropDownType } from "@/utils/interfaces";
import { useState } from "react";

const requestsTemp: RequestDropDownType[] = [
  {
    name: "Request 1",
    description: "Description for request 1",
    applicant: "Applicant 1",
    reason: "Reason for request 1",
    type: {
      type: "CREATE_GROUP",
      group_type: "Group Type 1",
      access_type: "Access Type 1",
    },
  },
  {
    name: "Request 2",
    description: "Description for request 2",
    applicant: "Applicant 2",
    reason: "Reason for request 2",
    type: {
      type: "ADD_MEMBER",
      entraID: "EntraID 2",
      role: "MEMBER",
    },
  },
];

const RequestsPage = () => {
  const [showAgain, setShowAgain] = useState(true);
  const [requests, setRequests] = useState<RequestDropDownType[]>(requestsTemp);
  //TASK: setRequest from API
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      {requests.map((request, index) => (
        <div key={index}>
          <RequestDropDown
            {...request}
            showAgain={showAgain}
            setShowAgain={setShowAgain}
          />
        </div>
      ))}
    </div>
  );
};

export default RequestsPage;
