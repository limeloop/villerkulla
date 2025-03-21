import { NextRequest, NextResponse } from "next/server";

// Define an interface for the request body expected from the client.
interface FormRequestBody {
  formId: string;
}

// Define an interface for the payload sent to the external API.
interface FormRequestData {
  websiteId: string;
  projectId: string;
  formId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the incoming JSON data from the client.
    const body: Partial<FormRequestBody> = await req.json();

    // Ensure the base URL is defined.
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    if (!baseUrl) {
      throw new Error("Missing WEBSITE_DATA_ENDPOINT in environment variables");
    }

    // Validate that the formId exists.
    if (!body.formId) {
      return NextResponse.json({ error: "Invalid form id" }, { status: 400 });
    }

    // Build the request payload for the external API.
    const requestData: FormRequestData = {
      websiteId: process.env.WEBSITE_ID || "",
      projectId: process.env.PROJECT_ID || "",
      formId: body.formId,
    };

    // Forward the data to the external API endpoint.
    const response = await fetch(`${baseUrl}/forms/get`, {
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
    console.error("Error calling get forms by id endpoint:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
