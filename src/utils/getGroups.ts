import { validateAuth } from "./validateAuth";

export async function getGroups(
  roleRequired: string,
  data_partition_id: string
  //on_behalf_of: string
) {
  const authToken = await validateAuth();

  try {
    const response = await fetch("/api/entitlements/v2/groups/getGroups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        roleRequired,
        "data-partition-id": data_partition_id,
        //"on-behalf-of": on_behalf_of,
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
}
