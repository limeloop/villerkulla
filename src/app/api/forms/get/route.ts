import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    
    if (!body.formId) {
      return NextResponse.json(
        { error: "Invalid form id" },
        { status: 400 }
      );
    }

    const requestData = {
      websiteId: process.env.WEBSITE_ID,
      projectId: process.env.PROJECT_ID,
      formId: body.formId,
    };
    
    const response = await fetch(`${baseUrl}/forms/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json({ok: true, data});

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error calling get forms by id endpoint:", error);
      return null; // Added explicit return here
    } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  }
}
