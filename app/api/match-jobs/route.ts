// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import { Resume } from "@/app/models/resume";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// export async function GET() {
//   try {
//     console.log("📢 Connecting to MongoDB...");
//     await connectDB();

//     const session = await getServerSession(authOptions);
//     if (!session) {
//       console.error("❌ Unauthorized: No session found");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     console.log("✅ User session found:", session.user?.email);

//     // Fetch latest resume
//     console.log("📄 Fetching the latest resume for:", session.user?.email);
//     const resume = await Resume.findOne({ userId: session.user?.email }).sort({ createdAt: -1 });

//     if (!resume) {
//       console.error("❌ Resume not found for user:", session.user?.email);
//       return NextResponse.json({ error: "Resume not found" }, { status: 404 });
//     }

//     console.log("✅ Resume found:", resume);

//     // Fetch jobs from Remotive API
//     console.log("🌍 Fetching jobs from Remotive API...");
//     const jobRes = await fetch("https://remotive.io/api/remote-jobs");
    
//     if (!jobRes.ok) {
//       throw new Error(`Remotive API Error: ${jobRes.statusText}`);
//     }

//     const jobData = await jobRes.json();
//     const jobs = jobData.jobs.slice(0, 10);

//     console.log("✅ Jobs fetched:", jobs.length);

//     // Prepare prompt for OpenAI
//     console.log("💡 Generating AI prompt...");
//     const prompt = `
// Resume:
// Skills: ${resume.extractedData.skills?.join(", ")}
// Experience: ${resume.extractedData.experience}
// Education: ${resume.extractedData.education}

// Jobs:
// ${jobs.map((job: any, i: number) =>
//   `${i + 1}. ${job.title} at ${job.company_name}. Skills: ${job.tags?.join(", ")}`
// ).join("\n")}

// Return top 3 jobs that match the resume with JSON like:
// [{ title, company, url, reason }]
// `;

//     console.log("🤖 Sending request to OpenAI...");
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a job matching assistant." },
//         { role: "user", content: prompt },
//       ],
//     });

//     if (!response.choices || response.choices.length === 0) {
//       throw new Error("OpenAI returned no choices.");
//     }

//     console.log("✅ AI Response received");
//     const answer = response.choices[0].message.content;

//     return NextResponse.json({ matches: JSON.parse(answer!) });
//   } catch (error: any) {
//     console.error("❌ Error in match-jobs API:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Resume } from "@/app/models/resume";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
    console.log("📄 Fetching the latest resume for:", session.user?.email);
    const resume = await Resume.findOne({ userId: session.user?.email }).sort({ createdAt: -1 });

    if (!resume) {
      console.error("❌ Resume not found for user:", session.user?.email);
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    console.log("✅ Resume found:", resume);

    // Fetch jobs from Remotive API
    console.log("🌍 Fetching jobs from Remotive API...");
    const jobRes = await fetch("https://remotive.io/api/remote-jobs");
    console.log("Job Response:", jobRes); // Debugging output

    if (!jobRes.ok) {
      throw new Error(`Remotive API Error: ${jobRes.statusText}`);
    }

    const jobData = await jobRes.json();
    const jobs = jobData.jobs.slice(0, 10);

    console.log("✅ Jobs fetched:", jobs.length);

    // Returning jobs without OpenAI matching
    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error("❌ Error in match-jobs API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
