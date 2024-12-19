"use client";
import { addMember } from "@/utils/entitlement/addMember";
import { getGroups } from "@/utils/entitlement/getGroups";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Environment = "prod" | "test" | "development" | "bootcamp";

type AddIDtoGroupFormType = {
  entraID: string;
  environment: Environment[];
  role: "MEMBER" | "OWNER";
  group: string;
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
    environment: [],
    role: "MEMBER",
    group: group || "",
  };
  const environments: AddIDtoGroupFormType["environment"] = [
    "prod",
    "test",
    "development",
    "bootcamp",
  ];

  // ----------------------Fetch groups----------------------
  const [groups, setGroups] = useState<Groups[]>([]);
  const data_partition_id = "bootcamp";
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.accessToken) {
      throw new Error("Session not found");
    }
    getGroups(data_partition_id, session.accessToken).then((groups) => {
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

    // Reset form after submission
    setFormData(initialFormData);

    // Send data to the API
    if (session && session.accessToken) {
      if (group) {
        addMember(
          formData.entraID,
          formData.role,
          "bootcamp",
          group,
          session.accessToken
        );
      } else {
        addMember(
          formData.entraID,
          formData.role,
          "bootcamp",
          formData.group,
          session.accessToken
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border-2 border-dashed border-[#80AFB4] rounded-lg space-y-6"
    >
      {/* EntraID */}
      <div className="space-y-2">
        <label htmlFor="entraID" className="block text-lg font-semibold">
          Enter ID
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
