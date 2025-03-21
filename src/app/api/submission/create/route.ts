import { NextRequest, NextResponse } from "next/server";

// Define an interface for the fields submitted with the form.
interface FormSubmissionFields {
  [key: string]: string | number | boolean; 
}

// Define an interface for the request body from the client.
interface CreateSubmissionBody {
  formId: string;
}

// Define an interface for the payload sent to the external API.
interface CreateSubmissionRequestData {
  websiteId: string;
  projectId: string;
  formId: string;
  fields: FormSubmissionFields;
  websiteUrl: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the incoming JSON data from the client.
    const body: Partial<CreateSubmissionBody> = await req.json();
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    if (!baseUrl) {
      throw new Error("Missing WEBSITE_DATA_ENDPOINT in environment variables");
    }

    console.log("Received form submission:", body);

    // Validate that the formId is present.
    if (!body.formId) {
      return NextResponse.json(
        { error: "Invalid form submission, missing form id" },
        { status: 400 }
      );
    }

    // Extract formId from the body and treat the remaining properties as submission fields.
    const { formId, ...fields } = body;

    // Build the payload for the external API.
    const requestData: CreateSubmissionRequestData = {
      websiteId: process.env.WEBSITE_ID || "",
      projectId: process.env.PROJECT_ID || "",
      formId,
      fields,
      websiteUrl: process.env.WEBSITE_URL || "",
    };

    console.log("Sending submission request:", requestData);

    // Forward the data to the external API endpoint.
    const response = await fetch(`${baseUrl}/submission/create`, {
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
    console.error("Error calling create submission endpoint:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
