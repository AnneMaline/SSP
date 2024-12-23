import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

const DEV_ENDPOINT = process.env.API_DEV_URL + "/groups";
const PROD_ENDPOINT = process.env.API_PROD_URL + "/groups";
const TEST_ENDPOINT = process.env.API_TEST_URL + "/groups";

export async function GET(request: NextRequest) {
  const roleRequired = request.headers.get("roleRequired") || "";
  const data_partition_id =
    request.headers.get("data-partition-id") || "bootcamp";
  const on_behalf_of = request.headers.get("on-behalf-of") || "";
  const authToken = request.headers.get("Authorization")?.replace("Bearer", "");
  const environment = request.headers.get("environment") || "development";
  let endpoint = DEV_ENDPOINT;

  if (environment === "production") {
    endpoint = PROD_ENDPOINT;
  } else if (environment === "test") {
    endpoint = TEST_ENDPOINT;
  }

  if (!data_partition_id || !authToken) {
    return NextResponse.json(
      { error: "Missing required headers" },
      { status: 400 }
    );
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "data-partition-id": data_partition_id,
      Authorization: `Bearer ${authToken}`,
    };

    if (roleRequired) {
      headers.roleRequired = roleRequired;
    }

    if (on_behalf_of) {
      headers["on-behalf-of"] = on_behalf_of;
    }

    const response = await fetch(endpoint, {
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
