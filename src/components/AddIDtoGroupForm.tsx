"use client";
import { addMember } from "@/utils/entitlement/addMember";
import { getGroups } from "@/utils/entitlement/getGroups";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { decodedToken } from "./RedirectLogIn";
import { RequestDropDownType } from "@/utils/interfaces";

type Environment = "prod" | "test" | "development";
type ID = "bootcamp" | "data";

type AddIDtoGroupFormType = {
  entraID: string;
  environment: Environment[];
  data_partition_id: ID[];
  role: "MEMBER" | "OWNER";
  group: string;
  reason: string;
};

type Groups = {
  name: string;
  email: string;
  description: string;
};

type AddIDtoGroupFormProps = {
  group?: string;
};

const AddIDtoGroupForm = ({ group }: AddIDtoGroupFormProps) => {
  // Initial state for the form
  const initialFormData: AddIDtoGroupFormType = {
    entraID: "",
    environment: ["development"],
    data_partition_id: ["bootcamp"],
    role: "MEMBER",
    group: group || "",
    reason: "",
  };
  const environments: AddIDtoGroupFormType["environment"] = [
    "prod",
    "test",
    "development",
  ];
  const data_partition_id: AddIDtoGroupFormType["data_partition_id"] = [
    "bootcamp",
    "data",
  ];

  // ----------------------Fetch groups----------------------
  const [groups, setGroups] = useState<Groups[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.accessToken) {
      throw new Error("Session not found");
    }
    // TASK: loop over environments to get all the environments
    // TASK: change the parameters in getGroups
    getGroups("bootcamp", "development", session.accessToken).then((groups) => {
      setGroups(groups);
      //setFormData((prev) => ({ ...prev, group: groups })); //TASK: Make this work. Initial group in the form
    });
  }, [session]);

  // ----------------------Make and submitt form----------------------
  const [formData, setFormData] =
    useState<AddIDtoGroupFormType>(initialFormData);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent the default form submission
    e.preventDefault();

    // if environment is empty
    if (formData.environment.length === 0) {
      alert("Please select at least one environment");
      return;
    }

    // ----------------------Store requests in local storage----------------------
    // TASK: find another storage solution
    const existingData = localStorage.getItem("requests");

    // Make requests - number of requests depends on the selected environments and data_partition_id
    const request: RequestDropDownType[] = formData.data_partition_id.flatMap(
      (partitionId, i) =>
        formData.environment.map((env, index) => ({
          requestID:
            (existingData
              ? JSON.parse(existingData).length +
                i +
                index * formData.data_partition_id.length
              : i + index * formData.data_partition_id.length) +
            "-" +
            (session?.accessToken
              ? decodedToken(session.accessToken)?.oid ?? ""
              : ""),
          name: group ? group : formData.group,
          description: groups.find((g) => g.email === group)?.description ?? "",
          applicant: session?.accessToken
            ? decodedToken(session.accessToken)?.oid ?? ""
            : "",
          reason: formData.reason,
          data_partition_id: partitionId,
          environment: env,
          type: {
            type: "ADD_MEMBER",
            entraID: formData.entraID,
            role: "MEMBER",
            group_email: group ? group : formData.group,
          },
        }))
    );

    if (existingData) {
      const parsedData = JSON.parse(existingData);
      parsedData.push(...request);
      localStorage.setItem("requests", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("requests", JSON.stringify(request));
    }

    // Send data to the API
    if (session && session.accessToken) {
      // TASK: loop over environments and data_partition_id to get all the environments and partitions
      if (
        formData.environment.includes("development") &&
        formData.data_partition_id.includes("bootcamp")
      ) {
        // if group was sent as a parameter
        if (group) {
          addMember(
            formData.entraID,
            formData.role,
            "bootcamp",
            group,
            session.accessToken,
            "development"
          );
        } else {
          addMember(
            formData.entraID,
            formData.role,
            "bootcamp",
            formData.group,
            session.accessToken,
            "development"
          );
        }
      }
    }

    // Reset form after submission
    setFormData(initialFormData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border-2 border-dashed border-[#80AFB4] rounded-lg space-y-6"
    >
      {/* EntraID */}
      <div className="space-y-2">
        <label htmlFor="entraID" className="block text-lg font-semibold">
          EntraID
        </label>
        <input
          required
          type="text"
          id="entraID"
          name="entraID"
          value={formData.entraID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              entraID: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Enter entraID"
        />
      </div>

      {/* Role */}
      <div className="space-y-2">
        <legend className="block text-lg font-semibold">Select Role</legend>
        <div className="space-y-1">
          <label className="block">
            <input
              type="radio"
              name="role"
              value="MEMBER"
              checked={formData.role === "MEMBER"}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  role: "MEMBER",
                }))
              }
              className="mr-2"
            />
            Member
          </label>
          <label className="block">
            <input
              type="radio"
              name="role"
              value="OWNER"
              checked={formData.role === "OWNER"}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  role: "OWNER",
                }))
              }
              className="mr-2"
            />
            Owner
          </label>
        </div>
      </div>

      {/* Environment */}
      <fieldset className="space-y-2">
        <legend className="block text-lg font-semibold">Environment</legend>
        <div className="space-y-1">
          {environments.map((type) => (
            <label key={type} className="block">
              <input
                type="checkbox"
                name="environment"
                value={type}
                checked={formData.environment.includes(type)}
                onChange={() =>
                  setFormData((prev) => {
                    const newEnvironments = prev.environment.includes(type)
                      ? prev.environment.filter((env) => env !== type)
                      : [...prev.environment, type];
                    return {
                      ...prev,
                      environment: newEnvironments,
                    };
                  })
                }
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Data Partition ID */}
      <fieldset className="space-y-2">
        <legend className="block text-lg font-semibold">
          Data Partition ID
        </legend>
        <div className="space-y-1">
          {data_partition_id.map((id) => (
            <label key={id} className="block">
              <input
                type="checkbox"
                name="data_partition_id"
                value={id}
                checked={formData.data_partition_id.includes(id)}
                onChange={() =>
                  setFormData((prev) => {
                    const newID = prev.data_partition_id.includes(id)
                      ? prev.data_partition_id.filter((i) => i !== id)
                      : [...prev.data_partition_id, id];
                    return {
                      ...prev,
                      data_partition_id: newID,
                    };
                  })
                }
                className="mr-2"
              />
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Group */}
      <div className="space-y-2">
        <label htmlFor="group" className="block text-lg font-semibold">
          {group ? "Selected Group" : "Select Group"}
        </label>
        {group ? (
          <div>{group}</div>
        ) : (
          <select
            required
            id="group"
            name="group"
            value={formData.group}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormData((prev) => ({
                ...prev,
                group: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select a group</option>
            {groups.map((group) => (
              <option key={group.email} value={group.email}>
                {group.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Reason */}
      <div className="space-y-2">
        <label htmlFor="reason" className="block text-lg font-semibold">
          Reason
        </label>
        <input
          required
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              reason: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Enter reason"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default AddIDtoGroupForm;
