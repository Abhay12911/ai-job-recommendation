

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";
import { useEffect } from "react";

export function Appbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/api/auth/signin");
  //   }
  // }, [status, router]);

  // if (status === "loading") {
  //   return null; // or a loader/spinner
  // }

  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <BriefcaseIcon className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">JobAI</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-fuchsia-300 transition">
                Home
              </Link>
              <Link href="/upload" className="text-white hover:text-fuchsia-300 transition">
                Upload Resume
              </Link>
              <Link href="/jobs" className="text-white hover:text-fuchsia-300 transition">
                Matched Jobs
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              className="bg-white text-black hover:bg-blue-300 cursor-pointer"
              variant="ghost"
              onClick={() => (session ? signOut() : signIn())}
            >
              {session ? "Sign Out" : "Sign In"}
            </Button>
            <Button
              className="bg-white text-black hover:bg-blue-300 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}

