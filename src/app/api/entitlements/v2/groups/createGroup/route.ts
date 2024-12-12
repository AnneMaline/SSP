import { NextRequest, NextResponse } from "next/server";

const ENDPOINT = process.env.API_URL + "/groups";

export async function POST(request: NextRequest) {
  const data_partition_id =
    request.headers.get("data-partition-id") || "bootcamp";
  const description = request.headers.get("description") || "";
  const name = request.headers.get("name") || "";
  const authToken = request.headers.get("Authorization")?.replace("Bearer", "");

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

    const response = await fetch(ENDPOINT, {
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
