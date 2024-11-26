"use client";
import { useState } from "react";

type AddIDtoGroupFormType = {
  entraID: string;
  environment: "prod" | "test" | "development";
  group: string;
};

const AddIDtoGroupForm = () => {
  // Initial state for the form
  const initialFormData: AddIDtoGroupFormType = {
    entraID: "",
    environment: "prod",
    group: "",
  };
  const environments: AddIDtoGroupFormType["environment"][] = [
    "prod",
    "test",
    "development",
  ];

  // Dummy dynamic groups (update when the API is connected)
  const [groups, setGroups] = useState<string[]>([
    "Group 1",
    "Group 2",
    "Group 3",
  ]);

  // feedback and questions form
  const [formData, setFormData] =
    useState<AddIDtoGroupFormType>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    // Reset form after submission
    setFormData(initialFormData);

    /*// Send data to the server or API
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Form submitted successfully!");
    } else {
      console.error("Form submission failed.");
    }*/
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow space-y-6"
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
                    environment: type as AddIDtoGroupFormType["environment"],
                  }))
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
          Select Group
        </label>
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
          {groups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
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
