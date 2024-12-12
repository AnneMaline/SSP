import { NextRequest, NextResponse } from "next/server";

const TOKEN_ENDPOINT = process.env.API_URL + "/groups";

export async function GET(request: NextRequest) {
  const group_email =
    request.headers.get("group_email") || "users@bootcamp.dataservices.energy";
  const role = request.headers.get("role") || "";
  const data_partition_id =
    request.headers.get("data-partition-id") || "bootcamp";
  const authToken = request.headers.get("Authorization")?.replace("Bearer", "");

  if (!data_partition_id || !group_email) {
    return NextResponse.json(
      { error: "Missing required headers" },
      { status: 400 }
    );
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "data-partition-id": data_partition_id,
      gruop_email: group_email,
      Authorization: `Bearer ${authToken}`,
    };

    if (role) {
      headers.role = role;
    }

    const response = await fetch(
      TOKEN_ENDPOINT + "/" + group_email + "/membersCount",
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Error fetching token" },
      { status: 500 }
    );
  }
}
