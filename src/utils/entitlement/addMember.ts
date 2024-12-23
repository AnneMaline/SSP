// send request to add member to the API
export async function addMember(
  email: string,
  role: string,
  data_partition_id: string,
  group_email: string,
  authToken: string,
  environment: string
) {
  try {
    const response = await fetch(
      `/api/entitlements/v2/groups/${group_email}/members/addMembers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          group_email,
          "data-partition-id": data_partition_id,
          Authorization: `Bearer ${authToken}`,
          email,
          role,
          environment,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Member added successfully:", data);
    // Update the state or perform other actions with the response data
  } catch (error) {
    console.error("Error adding member:", error);
  }
}
