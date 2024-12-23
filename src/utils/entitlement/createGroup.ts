// creates group
export async function createGroup(
  name: string,
  description: string,
  data_partition_id: string,
  authToken: string,
  environment: string
) {
  try {
    const response = await fetch("/api/entitlements/v2/groups/createGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "data-partition-id": data_partition_id,
        Authorization: `Bearer ${authToken}`,
        name,
        description,
        environment,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating group:", error);
  }
}
