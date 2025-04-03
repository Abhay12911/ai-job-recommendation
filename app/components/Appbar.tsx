"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router
import Link from "next/link";

export const Appbar = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>

      <button onClick={()=>{
        router.push("/api/auth/signin")
      }}>Sign Out</button>

<div>
      <nav className="bg-gray-800 text-white p-4 flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/upload">Upload Resume</Link>
        <Link href="/jobs">Matched Jobs</Link>
      </nav>
      
    </div>
    </div>
  );
};
