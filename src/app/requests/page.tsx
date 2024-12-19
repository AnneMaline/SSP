"use client";
import RequestDropDown from "@/components/RequestDropDown";
import { RequestDropDownType } from "@/utils/interfaces";
import { useState } from "react";
import { RedirectHome } from "@/components/RedirectHome";
import TitleBanner from "@/components/TitleBanner";

const RequestsPage = () => {
  const reqs = localStorage.getItem("requests");
  const [showAgain, setShowAgain] = useState(true);
  const [requests, setRequests] = useState<RequestDropDownType[]>(
    JSON.parse(reqs || "[]")
  );
  //TASK: make a storage solution for the requests
  //TASK: get requests from API and set in setRequests
  const removeRequest = (request: RequestDropDownType) => {
    //when approve or reject button is clicked, remove the request from the list
    setRequests(requests.filter((r) => r.requestID !== request.requestID));
    //TASK: remove from storage solution by sending a request to the API
  };

  return (
    <RedirectHome data_partition_id="bootcamp">
      <TitleBanner
        title="Requests"
        description="Approve request from users"
        back={true}
      />
      <div className="p-4">
        <div className="text-bold grid grid-cols-[auto_100px_100px_25px] px-4 py-2">
          <p className="text-title mb-1 mt-2" style={{ fontSize: "28px" }}>
            Development
          </p>
          <p className="self-end" style={{ fontSize: "14px" }}>
            Add Member
          </p>
          <p className="self-end" style={{ fontSize: "14px" }}>
            Create Group
          </p>
        </div>
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
        <p className="text-title mb-1 mt-2" style={{ fontSize: "28px" }}>
          Test
        </p>
        <p className="text-title mb-1 mt-2" style={{ fontSize: "28px" }}>
          Production
        </p>
      </div>
    </RedirectHome>
  );
};

export default RequestsPage;
