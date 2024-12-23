// fetches groups from the API
export async function getGroups(
  data_partition_id: string,
  environment: string,
  authToken: string
) {
  try {
    const response = await fetch("/api/entitlements/v2/groups/getGroups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "data-partition-id": data_partition_id,
        environment,
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
