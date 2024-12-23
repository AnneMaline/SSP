"use client";
import RequestDropDown from "@/components/RequestDropDown";
import { RequestDropDownType } from "@/utils/interfaces";
import { useState } from "react";
import { RedirectHome } from "@/components/RedirectHome";
import TitleBanner from "@/components/TitleBanner";
import styles from "./requests.module.css";

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
      {/* TASK: change data_partition_id */}
      <div className={styles.page}>
        <TitleBanner
          title="Requests"
          description="Approve request from users"
          back={true}
        />
        <div className="p-4">
          <div className={styles.section}>
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
          {requests
            .filter((req) => req.environment === "development")
            .map((request, index) => (
              <div key={index}>
                <RequestDropDown
                  {...request}
                  showAgain={showAgain}
                  setShowAgain={setShowAgain}
                  removeRequest={removeRequest}
                />
              </div>
            ))}
          <div className={styles.section}>
            <p className="text-title mb-1 mt-2" style={{ fontSize: "28px" }}>
              Test
            </p>
            <p className="self-end" style={{ fontSize: "14px" }}>
              Add Member
            </p>
            <p className="self-end" style={{ fontSize: "14px" }}>
              Create Group
            </p>
          </div>
          {requests
            .filter((req) => req.environment === "development")
            .map((request, index) => (
              <div key={index}>
                <RequestDropDown
                  {...request}
                  showAgain={showAgain}
                  setShowAgain={setShowAgain}
                  removeRequest={removeRequest}
                />
              </div>
            ))}

          <div className={styles.section}>
            <p className="text-title mb-1 mt-2" style={{ fontSize: "28px" }}>
              Production
            </p>
            <p className="self-end" style={{ fontSize: "14px" }}>
              Add Member
            </p>
            <p className="self-end" style={{ fontSize: "14px" }}>
              Create Group
            </p>
          </div>
          {requests
            .filter((req) => req.environment === "development")
            .map((request, index) => (
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
      </div>
    </RedirectHome>
  );
};

export default RequestsPage;
