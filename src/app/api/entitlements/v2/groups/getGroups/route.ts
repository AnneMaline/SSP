import { NextRequest, NextResponse } from "next/server";

const TOKEN_ENDPOINT = process.env.API_URL + "/groups";

export async function GET(request: NextRequest) {
  const roleRequired = request.headers.get("roleRequired") || "";
  const data_partition_id =
    request.headers.get("data-partition-id") || "bootcamp";
  const on_behalf_of = request.headers.get("on-behalf-of") || "";
  const authToken = request.headers.get("Authorization")?.replace("Bearer", "");

  if (!data_partition_id) {
    return NextResponse.json(
      { error: "Missing required headers" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "data-partition-id": data_partition_id,
        // roleRequired,
        // "on-behalf-of": on_behalf_of,
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching token" },
      { status: 500 }
    );
  }
}
