
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Resume } from "@/app/models/resume";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { jsonrepair } from "jsonrepair";

export async function GET() {
  try {
    console.log("📢 Connecting to MongoDB...");
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      console.error("❌ Unauthorized: No session found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ User session found:", session.user?.email);

    // Fetch latest resume
    const resume = await Resume.findOne({ userId: session.user?.email }).sort({ createdAt: -1 });
    if (!resume) {
      console.error("❌ Resume not found for user:", session.user?.email);
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    console.log("✅ Resume found:", resume);

    // Fetch jobs from Remotive API
    console.log("🌍 Fetching jobs from Remotive API...");
    const jobRes = await fetch("https://remotive.io/api/remote-jobs");

    if (!jobRes.ok) {
      throw new Error(`Remotive API Error: ${jobRes.statusText}`);
    }

    const jobData = await jobRes.json();
    const jobs = jobData.jobs.slice(0, 50); // Fetch more for better AI results

    console.log("✅ Jobs fetched:", jobs.length);

    // Updated prompt to request 10 matched jobs
    const prompt = `
Based on the resume:
Skills: ${resume.extractedData.skills?.join(", ")}
Experience: ${resume.extractedData.experience}
Education: ${resume.extractedData.education}

And these jobs:
${jobs.map((job: any, i: number) =>
  `${i + 1}. ${job.title} at ${job.company_name}. Skills: ${job.tags?.join(", ")}`
).join("\n")}

Return the top 10 matched jobs in valid JSON format like:
[
  { "title": "Job Title", "company": "Company Name", "url": "https://...", "reason": "why it matches" },
  ...
]
Only include the matched jobs, and make sure the JSON is valid and complete.
`;

    // Call Cohere API
    console.log("💡 Sending request to Cohere API...");
    const cohereRes = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r-plus",
        message: prompt,
      }),
    });

    if (!cohereRes.ok) {
      throw new Error("Error calling Cohere API");
    }

    const cohereData = await cohereRes.json();
    const output = cohereData.text || cohereData.generations?.[0]?.text;

    console.log("🤖 Raw Cohere output:", output);

    let matches;
    try {
      matches = JSON.parse(output);
    } catch (e) {
      console.warn("⚠️ Malformed JSON detected, attempting to repair...");
      matches = JSON.parse(jsonrepair(output));
    }

    return NextResponse.json({ matches });
  } catch (error: any) {
    console.error("❌ Error in match-jobs API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
