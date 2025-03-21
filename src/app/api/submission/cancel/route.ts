import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    

    if (!body.submissionId) {
      return NextResponse.json(
        { error: "Invalid submission, missing submission id" },
        { status: 400 }
      );
    }
    
    const requestData = {
      submissionId: body.submissionId,
      websiteUrl: process.env.WEBSITE_URL,
      publicKey: body.publicKey,
    };
    
    const response = await fetch(`${baseUrl}/submission/cancel`, {
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
  }  catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error calling cancel submission endpoint:", error);
      return null; // Added explicit return here
    } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  }
}
