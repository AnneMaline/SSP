"use client";
import { useState, useEffect } from "react";
import GroupDropDown from "../../components/GroupDropDown";
import { jwtDecode } from "jwt-decode";

type GroupItem = {
  name: string;
  email: string;
  description: string;
};

type DecodedToken = {
  exp: number;
};

export default function EntitlementsPage() {
  const [GroupItems, setGroupItems] = useState<GroupItem[]>([]);

  const handleDelete = (email: string) => {
    setGroupItems((prev) => prev.filter((member) => member.email !== email));
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
          data.groups.map((item: GroupItem) => ({
            name: item.name,
            email: item.email,
            description: item.description,
          }))
        );
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }

    // async function getMembersCount(
    //   group_email: string,
    //   data_partition_id: string,
    //   role: string,
    //   authToken: string
    // ) {
    //   if (!authToken) {
    //     console.error("No token available for getMembersCount");
    //     return;
    //   }

    //   try {
    //     const response = await fetch(
    //       `/api/entitlements/v2/groups/${group_email}/membersCount`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "data-partition-id": data_partition_id,
    //           group_email: group_email,
    //           role,
    //           Authorization: `Bearer ${authToken}`,
    //         },
    //       }
    //     );
    //     if (!response.ok) {
    //       throw new Error(`Error: ${response.status} ${response.statusText}`);
    //     }
    //     const data = await response.json();
    //     setGroupItems((prevGroupItems) =>
    //       prevGroupItems.map((group) =>
    //         group.name === group_email
    //           ? { ...group, membersCount: data.membersCount }
    //           : group
    //       )
    //     );
    //   } catch (error) {
    //     console.error("Error fetching members count:", error);
    //   }
    // }

    // async function getMembers(
    //   group_email: string,
    //   data_partition_id: string,
    //   role: string,
    //   includeType: string,
    //   authToken: string
    // ) {
    //   if (!authToken) {
    //     console.error("No token available for getMembers");
    //     return;
    //   }

    //   try {
    //     const response = await fetch(
    //       `/api/entitlements/v2/groups/${group_email}/members`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "data-partition-id": data_partition_id,
    //           group_email: group_email,
    //           role,
    //           includeType,
    //           Authorization: `Bearer ${authToken}`,
    //         },
    //       }
    //     );
    //     if (!response.ok) {
    //       throw new Error(`Error: ${response.status} ${response.statusText}`);
    //     }
    //     const data = await response.json();
    //     console.log("Members:", data);
    //   } catch (error) {
    //     console.error("Error fetching members:", error);
    //   }
    // }

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
        {GroupItems.map((item) => (
          <li key={item.email}>
            <GroupDropDown
              name={item.name}
              group_email={item.email}
              description={item.description}
              data_partition_id={data_partition_id}
              onDelete={() => handleDelete(item.email)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
