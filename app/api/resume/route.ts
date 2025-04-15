// import { authOptions } from './../../lib/auth';
import { NextRequest, NextResponse } from "next/server";
import { Resume } from "@/app/models/resume";
import { connectDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function POST(req : NextRequest){

    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                error: "Unauthorized",
                status: 402,
            })
        }

        const formData = await req.formData();
        const file = formData.get("resume") as File;
        const buffer = Buffer.from(await file.arrayBuffer());
        const text = buffer.toString("utf-8");

        const extractedData = {
            skills: ["JavaScript", "MongoDB"],
            experience: "2 years",
            jobTitle: "Full Stack Developer",
            education: "B.Tech in CSE",
          };
        
          const resume = new Resume({
            userId: session.user?.email,
            fileName: file.name,
            parsedText: text,
            extractedData,
          });

          await resume.save();
          return NextResponse.json({
            message: "Resume uploaded", resume
          });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}