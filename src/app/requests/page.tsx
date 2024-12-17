"use client";
import RequestDropDown from "@/components/RequestDropDown";
import { RequestDropDownType } from "@/utils/interfaces";
import { useState } from "react";

const requestsTemp: RequestDropDownType[] = [
  {
    requestID: "1",
    name: "string",
    description: "Description for request 1",
    applicant: "Applicant 1",
    data_partition_id: "bootcamp",
    reason: "Reason for request 1",
    type: {
      type: "CREATE_GROUP",
      group_type: "Group Type 1",
      access_type: "Access Type 1",
    },
  },
  {
    requestID: "2",
    name: "string",
    description: "Description for request 2",
    applicant: "Applicant 2",
    data_partition_id: "bootcamp",
    reason: "Reason for request 2",
    type: {
      type: "ADD_MEMBER",
      entraID: "a",
      role: "MEMBER",
      group_email: "string@bootcamp.dataservices.energy",
    },
  },
];

const RequestsPage = () => {
  const [showAgain, setShowAgain] = useState(true);
  const [requests, setRequests] = useState<RequestDropDownType[]>(requestsTemp);

  //TASK: make a storage solution for the requests
  //TASK: get requests from API and set in setRequests
  const removeRequest = (request: RequestDropDownType) => {
    //when approve or reject button is clicked, remove the request from the list
    setRequests(requests.filter((r) => r.requestID !== request.requestID));
    //TASK: remove from storage solution by sending a request to the API
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      {requests.map((request, index) => (
        <div key={index}>
          <RequestDropDown
            {...request}
            showAgain={showAgain}
            setShowAgain={setShowAgain}
            removeRequest={removeRequest}
          />
        </div>
      ))}
    </div>
  );
};

export default RequestsPage;
