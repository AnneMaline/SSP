import { NextRequest, NextResponse } from "next/server";

const DEV_ENDPOINT = process.env.API_DEV_URL + "/groups";
const PROD_ENDPOINT = process.env.API_PROD_URL + "/groups";
const TEST_ENDPOINT = process.env.API_TEST_URL + "/groups";

export async function GET(request: NextRequest) {
  const group_email =
    request.headers.get("group_email") || "users@bootcamp.dataservices.energy";
  const role = request.headers.get("role") || "";
  const includeType = request.headers.get("includeType") || "";
  const data_partition_id =
    request.headers.get("data-partition-id") || "bootcamp";
  const authToken = request.headers.get("Authorization")?.replace("Bearer", "");
  const environment = request.headers.get("environment") || "development";
  let endpoint = DEV_ENDPOINT;

  if (environment === "production") {
    endpoint = PROD_ENDPOINT;
  } else if (environment === "test") {
    endpoint = TEST_ENDPOINT;
  }

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

    if (includeType) {
      headers.includeType = includeType;
    }

    const response = await fetch(endpoint + "/" + group_email + "/members", {
      method: "GET",
      headers: headers,
    });

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
