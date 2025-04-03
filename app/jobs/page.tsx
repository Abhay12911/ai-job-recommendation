"use client";

import { useEffect, useState } from "react";

interface Job {
    _id: string;  // Add this
    title: string;
    company_name: string;
    url: string;
    reason: string;
    tags: string[];
    salary: string;
}


export default function JobMatches() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch("/api/match-jobs");
                const data = await res.json();
                console.log("Fetched Jobs:", data); // Debugging output
                setJobs(data.jobs || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setLoading(false);
            }

        }
        fetchJobs();
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Matched Jobs for You</h2>
            {loading ? <p>Loading...</p> : jobs.length === 0 ? <p>No matches found.</p> : (
                <ul className="space-y-4">
                    {jobs.map((job) => (
                        <li key={job._id} className="border p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">{job.title} at {job.company_name}

                            </h3>

                            <div className="flex flex-wrap gap-2 p-3 m-2">
                                {job.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>




                            <h2>
                                Salary : {job.salary ? job.salary : "Not mentioned"}</h2>
                            <p className="text-gray-600">{job.reason}</p>
                            <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                Apply Now →
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}  
