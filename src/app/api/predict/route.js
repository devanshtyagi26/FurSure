import { NextResponse } from "next/server";

export async function POST(request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("Proxy received request, forwarding to:", apiUrl);
  try {
    // 1. Parse the incoming multipart form data from the user's browser
    const incomingFormData = await request.formData();
    const file = incomingFormData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 2. Re-pack the file into a new FormData instance for the Python backend
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    // 3. Send it to the internal Docker container over plain HTTP
    const response = await fetch(`${apiUrl}/predict`, {
      method: "POST",
      body: backendFormData,
    });

    // 4. Handle downstream errors gracefully
    if (!response.ok) {
      const errorDetail = await response.text();
      return NextResponse.json(
        { error: "Python backend failed", details: errorDetail },
        { status: response.status },
      );
    }

    // 5. Stream the results back to the frontend browser
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Next.js Proxy Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error during proxying",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
