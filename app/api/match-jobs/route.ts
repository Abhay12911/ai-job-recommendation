
// app/api/match-jobs/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Resume } from "@/app/models/resume";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get latest uploaded resume of this user
    const resume = await Resume.findOne({ userId: session.user?.email }).sort({ createdAt: -1 });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Fetch jobs from Remotive API
    const jobRes = await fetch("https://remotive.io/api/remote-jobs");
    const jobData = await jobRes.json();
    const jobs = jobData.jobs.slice(0, 10);

    // Prepare prompt
    const prompt = `
Resume:
Skills: ${resume.extractedData.skills.join(', ')}
Experience: ${resume.extractedData.experience}
Education: ${resume.extractedData.education}

Jobs:
${jobs.map((job: any, i: number) =>
  `${i + 1}. ${job.title} at ${job.company_name}. Skills: ${job.tags.join(', ')}`).join('\n')}

Return top 3 jobs that match the resume with JSON like:
[{ title, company, url, reason }]
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a job matching assistant." },
        { role: "user", content: prompt },
      ],
    });

    const answer = response.choices[0].message.content;

    return NextResponse.json({ matches: JSON.parse(answer!) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
