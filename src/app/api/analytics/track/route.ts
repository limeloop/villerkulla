import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON data from the client
    const body = await req.json();
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;

    console.log("Received visitor data:", body);

    // Build the request payload for the external visitor tracking API
    const requestData = {
      websiteId: process.env.WEBSITE_ID,
      projectId: process.env.PROJECT_ID,
      websiteUrl: process.env.WEBSITE_URL,
      visitorData: body, // include all visitor details received from the client
    };

    console.log("Sending request to external API:", requestData);

    // Forward the data to the external API endpoint
    const response = await fetch(`${baseUrl}/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return a successful response to the client
    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    console.error("Error calling analytics visit endpoint:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
