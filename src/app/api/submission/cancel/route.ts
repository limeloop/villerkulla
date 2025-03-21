import { NextRequest, NextResponse } from "next/server";

// Define an interface for the request body expected from the client.
interface CancelSubmissionBody {
  submissionId: string;
  publicKey?: string;
}

// Define an interface for the payload sent to the external API.
interface CancelSubmissionRequestData {
  submissionId: string;
  websiteUrl: string;
  publicKey?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the incoming JSON data from the client.
    const body: Partial<CancelSubmissionBody> = await req.json();

    // Ensure the base URL is defined.
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    if (!baseUrl) {
      throw new Error("Missing WEBSITE_DATA_ENDPOINT in environment variables");
    }

    // Validate that the submissionId exists.
    if (!body.submissionId) {
      return NextResponse.json(
        { error: "Invalid submission, missing submission id" },
        { status: 400 }
      );
    }

    // Build the request payload for the external API.
    const requestData: CancelSubmissionRequestData = {
      submissionId: body.submissionId,
      websiteUrl: process.env.WEBSITE_URL || "",
      publicKey: body.publicKey,
    };

    // Forward the data to the external API endpoint.
    const response = await fetch(`${baseUrl}/submission/cancel`, {
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

    // Return a successful response to the client.
    return NextResponse.json({ ok: true, data });
  } catch (error: unknown) {
    console.error("Error calling cancel submission endpoint:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
