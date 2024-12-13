"use client";
import { useState } from "react";
import { validateAuth } from "@/utils/validateAuth";

type CreateGroupFormType = {
  environment: "prod" | "test" | "development" | "bootcamp";
  type: "data" | "service" | "users";
  name: string;
  description: string;
  accessType: "view" | "data" | "edit";
};

const CreateGroupForm = () => {
  // Initial state for the form
  const initialFormData: CreateGroupFormType = {
    environment: "bootcamp",
    type: "data",
    name: "string",
    description: "string",
    accessType: "view",
  };
  const environments: CreateGroupFormType["environment"][] = [
    "prod",
    "test",
    "development",
    "bootcamp",
  ];
  const types: CreateGroupFormType["type"][] = ["data", "service", "users"];
  const accessTypes: CreateGroupFormType["accessType"][] = [
    "view",
    "data",
    "edit",
  ];

  // feedback and questions form
  const [formData, setFormData] =
    useState<CreateGroupFormType>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    // Reset form after submission
    setFormData(initialFormData);

    // Send data to the server or API
    async function createGroup(
      name: string,
      description: string,
      data_partition_id: string
    ) {
      const authToken = await validateAuth();

      try {
        const response = await fetch(
          "/api/entitlements/v2/groups/createGroup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "data-partition-id": data_partition_id,
              Authorization: `Bearer ${authToken}`,
              name,
              description,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Group created successfully:", data);
        // Optionally, update the state or perform other actions with the response data
      } catch (error) {
        console.error("Error creating group:", error);
      }
    }

    createGroup(formData.name, formData.description, "bootcamp");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border-2 border-dashed border-[#80AFB4] rounded-lg  space-y-6"
    >
      {/* Environment */}
      <fieldset className="space-y-2">
        <legend className="block text-lg font-semibold">Environment</legend>
        <div className="space-y-1">
          {environments.map((type) => (
            <label key={type} className="block">
              <input
                type="radio"
                name="environment"
                value={type}
                checked={formData.environment === type}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    environment: type as CreateGroupFormType["environment"],
                  }))
                }
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Group Type */}
      <fieldset className="space-y-2">
        <legend className="block text-lg font-semibold">Group Type</legend>
        <div className="space-y-1">
          {types.map((type) => (
            <label key={type} className="block">
              <input
                type="radio"
                name="type"
                value={type}
                checked={formData.type === type}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: type as CreateGroupFormType["type"],
                  }))
                }
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Group Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-lg font-semibold">
          Group Name
        </label>
        <input
          required
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Enter group name"
        />
      </div>

      {/* Access Type */}
      <fieldset className="space-y-2">
        <legend className="block text-lg font-semibold">Access Type</legend>
        <div className="space-y-1">
          {accessTypes.map((type) => (
            <label key={type} className="block">
              <input
                type="radio"
                name="accessType"
                value={type}
                checked={formData.accessType === type}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    accessType: type as CreateGroupFormType["accessType"],
                  }))
                }
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Create
      </button>
    </form>
  );
};

export default CreateGroupForm;
