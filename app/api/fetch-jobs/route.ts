import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://remotive.io/api/remote-jobs");
        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
        }
        // return NextResponse.json(data, { status: 200 });

       
        type SimplifiedJob = {
            title: string;
            company: string;
            description: string;
            tags: string[];
            url: string;
          };
          
          const jobs: SimplifiedJob[] = data.jobs.map((job: any) => ({
            title: job.title,
            company: job.company_name,
            description: job.description,
            tags: job.tags,
            url: job.url,
          }));

        return NextResponse.json({ jobs });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}