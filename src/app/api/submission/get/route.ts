import { NextRequest, NextResponse } from "next/server";

// Define an interface for the expected request body from the client.
interface GetSubmissionBody {
  formId: string;
  submissionId?: string;
  publicKey?: string;
  // [key: string]: string;
}


// Define an interface for the payload sent to the external API.
interface GetSubmissionRequestData {
  websiteId: string;
  projectId: string;
  publicKey?: string;
  formId: string;
  submissionId?: string;
  websiteUrl: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the incoming JSON data from the client.
    const body: Partial<GetSubmissionBody> = await req.json();

    // Validate that the base URL is set.
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    if (!baseUrl) {
      throw new Error("Missing WEBSITE_DATA_ENDPOINT in environment variables");
    }

    // Ensure that the required formId is provided.
    if (!body.formId) {
      return NextResponse.json(
        { error: "Invalid form submission, missing form id" },
        { status: 400 }
      );
    }

    // Build the request payload for the external API.
    const requestData: GetSubmissionRequestData = {
      websiteId: process.env.WEBSITE_ID || "",
      projectId: process.env.PROJECT_ID || "",
      publicKey: body.publicKey,
      formId: body.formId,
      submissionId: body.submissionId,
      websiteUrl: process.env.WEBSITE_URL || "",
    };

    const response = await fetch(`${baseUrl}/submission/get`, {
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

    return NextResponse.json({ ok: true, data });
  } catch (error: unknown) {
    console.error("Error calling get submission endpoint:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
