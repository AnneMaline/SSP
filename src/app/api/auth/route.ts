import { NextRequest, NextResponse } from "next/server";

const TOKEN_ENDPOINT =
  "https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/v2.0/token";

export async function GET(request: NextRequest) {
  const TOKEN_REQUEST_BODY = new URLSearchParams({
    client_id: process.env.CLIENT_ID || "", // Ensure values are always strings
    client_secret: process.env.CLIENT_SECRET || "", // Default to an empty string if undefined
    grant_type: "client_credentials",
    scope: process.env.SCOPE || "", // Default to an empty string if undefined
  });

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: TOKEN_REQUEST_BODY,
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
