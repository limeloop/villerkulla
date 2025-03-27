import { NextRequest, NextResponse } from "next/server";

// Define an interface for the expected request body.
interface UpdateSubmissionBody {
  formId: string;
  submissionId: string;
  publicKey: string;
}

// Define an interface for the payload sent to the external API.
interface UpdateSubmissionRequestData {
  submissionId: string;
  websiteId: string;
  projectId: string;
  formId: string;
  fields: { [key: string]: string | number | boolean };
  publicKey: string;
  websiteUrl: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the incoming JSON data from the client.
    const body: Partial<UpdateSubmissionBody> = await req.json();

    // Ensure the base URL is defined.
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    if (!baseUrl) {
      throw new Error("Missing WEBSITE_DATA_ENDPOINT in environment variables");
    }

    // Validate that the required formId is provided.
    if (!body.formId) {
      return NextResponse.json(
        { error: "Invalid form submission, missing form id" },
        { status: 400 }
      );
    }

    // Destructure the known properties from the body.
    const { formId, submissionId, publicKey, ...fields } = body;

    // Build the request payload for the external API.
    const requestData: UpdateSubmissionRequestData = {
      submissionId: submissionId || "",
      websiteId: process.env.WEBSITE_ID || "",
      projectId: process.env.PROJECT_ID || "",
      formId,
      fields,
      publicKey: publicKey || "",
      websiteUrl: process.env.WEBSITE_URL || "",
    };

    console.log('update submission request data:', requestData);

    // Forward the data to the external API endpoint.
    const response = await fetch(`${baseUrl}/submission/update`, {
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
    console.log('update submission response data:', data);
    
    // Return a successful response to the client.
    return NextResponse.json({ ok: true, data });
  } catch (error: unknown) {
    console.error("Error calling update submission endpoint:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
