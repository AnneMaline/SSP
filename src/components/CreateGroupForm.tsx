"use client";
import { useState } from "react";
import { createGroup } from "@/utils/entitlement/createGroup";
import { useSession } from "next-auth/react";

type Environment = "prod" | "test" | "development" | "bootcamp";

type CreateGroupFormType = {
  environment: Environment[];
  data_partition_id: "bootcamp" | "data";
  //type: "data" | "service" | "users";
  name: string;
  description: string;
  //accessType: "view" | "data" | "edit";
};

const CreateGroupForm = () => {
  // Initial state for the form
  const initialFormData: CreateGroupFormType = {
    environment: ["development"],
    data_partition_id: "bootcamp",
    //type: "data",
    name: "",
    description: "",
    //accessType: "view",
  };
  const environments: CreateGroupFormType["environment"] = [
    "prod",
    "test",
    "development",
  ];
  const data_partition_id: CreateGroupFormType["data_partition_id"][] = [
    "bootcamp",
    "data",
  ];
  // const types: CreateGroupFormType["type"][] = ["data", "service", "users"];
  // const accessTypes: CreateGroupFormType["accessType"][] = [
  //   "view",
  //   "data",
  //   "edit",
  // ];
  const { data: session } = useSession();

  // feedback and questions form
  const [formData, setFormData] =
    useState<CreateGroupFormType>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent the default form submission
    e.preventDefault();

    console.log(formData);

    // Send data to the API
    if (!session || !session.accessToken) {
      throw new Error("Session not found");
    }

    const existingData = localStorage.getItem("CreateGroup");
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const updatedData = Array.isArray(parsedData)
        ? [...parsedData, formData]
        : [parsedData, formData];
      localStorage.setItem("CreateGroup", JSON.stringify(updatedData));
    } else {
      localStorage.setItem("CreateGroup", JSON.stringify([formData]));
    }

    // createGroup(
    //   formData.name,
    //   formData.description,
    //   "bootcamp",
    //   session.accessToken
    // );

    // Reset form after submission
    setFormData(initialFormData);
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

      {/* Group Type */}
      {/* <fieldset className="space-y-2">
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
      </fieldset> */}

      {/* Data Partition ID */}
      <fieldset className="space-y-2">
        <legend className="block text-lg font-semibold">
          Data Partition ID
        </legend>
        <div className="space-y-1">
          {data_partition_id.map((id) => (
            <label key={id} className="block">
              <input
                type="radio"
                name="data_partition_id"
                value={id}
                checked={formData.data_partition_id === id}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    data_partition_id:
                      id as CreateGroupFormType["data_partition_id"],
                  }))
                }
                className="mr-2"
              />
              {id.charAt(0).toUpperCase() + id.slice(1)}
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

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-lg font-semibold">
          Description
        </label>
        <input
          required
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Enter group description"
        />
      </div>

      {/* Access Type */}
      {/* <fieldset className="space-y-2">
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
      </fieldset> */}

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
