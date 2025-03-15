import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    
    console.log(body);

    if (!body.formId) {
      return NextResponse.json(
        { error: "Invalid form submission, missing form id" },
        { status: 400 }
      );
    }
    
    const formId = body.formId;
    delete body.formId;

    const requestData = {
      websiteId: process.env.WEBSITE_ID,
      projectId: process.env.PROJECT_ID,
      formId: formId,
      fields: body,
      websiteUrl: process.env.WEBSITE_URL
    };
    
    console.log(requestData);

    const response = await fetch(`${baseUrl}/submission/create`, {
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
  } catch (error: any) {
    console.error("Error calling create submission endpoint:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
