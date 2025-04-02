"use client";
import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await fetch("/api/match-jobs");
      const data = await res.json();
      setMatches(data.matches);
    };

    fetchMatches();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Matched Jobs</h1>
      {matches.map((job: any, idx: number) => (
        <div key={idx} className="p-4 mb-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p className="text-sm">{job.company}</p>
          <p className="mt-2">{job.reason}</p>
          <a href={job.url} target="_blank" className="text-blue-500 underline">Apply Now</a>
        </div>
      ))}
    </div>
  );
}
