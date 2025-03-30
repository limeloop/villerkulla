import { NextRequest, NextResponse } from "next/server";

// Define an interface for your visitor data.
// Update this interface based on the expected structure of the visitor data.
interface VisitorData {
  [key: string]: string | number | boolean;
}

// Define an interface for the payload sent to the external API.
interface RequestData {
  websiteId: string;
  projectId: string;
  websiteUrl: string;
  visitorData: VisitorData;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the incoming JSON data from the client and assume it matches VisitorData
    const body: VisitorData = await req.json();

    // Ensure your base URL is defined
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    if (!baseUrl) {
      throw new Error("Missing WEBSITE_DATA_ENDPOINT in environment variables");
    }

    console.log("Received visitor data:", body);

    // Build the request payload for the external visitor tracking API
    const requestData: RequestData = {
      websiteId: process.env.WEBSITE_ID || "",
      projectId: process.env.PROJECT_ID || "",
      websiteUrl: process.env.WEBSITE_URL || "",
      visitorData: body,
    };

    console.log("Sending request to external API:", requestData);
    console.log("Request URL:", `${baseUrl}/analytics/track`);
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
    console.log("Response from external API:", data);
    
    // Return a successful response to the client
    return NextResponse.json({ ok: data.ok }, { status: 200 });
  } catch (error: unknown) {
    // Log the error for debugging purposes
    console.error("Error calling analytics create visit endpoint:", error);

    // Always return a NextResponse to avoid undefined behavior
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
