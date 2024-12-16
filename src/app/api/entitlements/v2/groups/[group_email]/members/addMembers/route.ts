import { NextRequest, NextResponse } from "next/server";

const ENDPOINT = process.env.API_URL + "/groups";

export async function POST(request: NextRequest) {
  const group_email = request.headers.get("group_email") || "";
  const data_partition_id =
    request.headers.get("data-partition-id") || "bootcamp";
  const email = request.headers.get("email") || "";
  const role = request.headers.get("role") || "";
  const authToken = request.headers.get("Authorization")?.replace("Bearer", "");

  if (!group_email || !data_partition_id || !email || !role || !authToken) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const url = `/${group_email}/members`;
    const headers = {
      "Content-Type": "application/json",
      group_email,
      "data-partition-id": data_partition_id,
      Authorization: `Bearer ${authToken}`,
    };
    console.log("Adding member:", email, role);

    const response = await fetch(ENDPOINT + url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ email, role }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    console.log("Response:", response);
    const data = await response.json();
    console.log("Member added successfully:", data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error adding member" }, { status: 500 });
  }
}