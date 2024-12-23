import { NextRequest, NextResponse } from "next/server";

const DEV_ENDPOINT = process.env.API_DEV_URL + "/groups";
const PROD_ENDPOINT = process.env.API_PROD_URL + "/groups";
const TEST_ENDPOINT = process.env.API_TEST_URL + "/groups";

export async function POST(request: NextRequest) {
  const data_partition_id =
    request.headers.get("data-partition-id") || "bootcamp";
  const description = request.headers.get("description") || "";
  const name = request.headers.get("name") || "";
  const authToken = request.headers.get("Authorization")?.replace("Bearer", "");
  const environment = request.headers.get("environment") || "development";
  let endpoint = DEV_ENDPOINT;

  if (environment === "production") {
    endpoint = PROD_ENDPOINT;
  } else if (environment === "test") {
    endpoint = TEST_ENDPOINT;
  }

  if (!data_partition_id || !authToken || !description || !name) {
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

    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ description, name }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Error creating group" },
      { status: 500 }
    );
  }
}
