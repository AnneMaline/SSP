"use client";
import { useState, useEffect } from "react";
import GroupDropDown from "../../components/GroupDropDown";
import { jwtDecode } from "jwt-decode";

type GroupItem = {
  name: string;
  description: string;
  members: { id: string; role: string }[];
};

type DecodedToken = {
  exp: number;
};

export default function EntitlementsPage() {
  const [GroupItems, setGroupItems] = useState<GroupItem[]>([]);

  const handleDelete = (index: number) => {
    setGroupItems((prev) => prev.filter((_, i) => i !== index));
  };

  const roleRequired = "";
  const data_partition_id = "bootcamp";
  const on_behalf_of = "";

  const isTokenValid = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  useEffect(() => {
    async function fetchAuth() {
      try {
        const response = await fetch("/api/auth/");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // TASK: hash access_token before adding to local storage. Save hash-secret in env
        localStorage.setItem("access_token", data.access_token);
        return data.access_token;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function getGroups(
      roleRequired: string,
      data_partition_id: string,
      on_behalf_of: string,
      authToken: string
    ) {
      if (!authToken) {
        console.error("No token available for getGroups");
        return;
      }

      try {
        const response = await fetch("/api/entitlements/v2/groups/getGroups", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            roleRequired,
            "data-partition-id": data_partition_id,
            "on-behalf-of": on_behalf_of,
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setGroupItems(
          data.groups.map((item: any) => ({
            name: item.name,
            description: item.description,
            members: [],
          }))
        );
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }

    async function fetchData() {
      let authToken = localStorage.getItem("access_token");
      if (!authToken || !isTokenValid(authToken)) {
        authToken = await fetchAuth();
      }
      if (authToken) {
        await getGroups(
          roleRequired,
          data_partition_id,
          on_behalf_of,
          authToken
        );
      } else {
        console.error("No valid auth token found");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Entitlements</h1>
      <ul className="mb-2 mt-2">
        {GroupItems.map((item, index) => (
          <li key={index}>
            <GroupDropDown
              name={item.name}
              description={item.description}
              members={item.members}
              onDelete={() => handleDelete(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
