// "use client";

// import { signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation"; // ✅ Correct for App Router
// import Link from "next/link";
// import { Button } from "@/components/ui/button"




// export const Appbar = () => {
//   const router = useRouter();

//   return (
//       <div className="mt-5">
//         <nav className="bg-gray-800 text-white p-4 flex space-x-4 justify-center w-1/2 mx-auto rounded-lg shadow-md">
//           <Link href="/">Home</Link>
//           <Link href="/upload">Upload Resume</Link>
//           <Link href="/jobs">Matched Jobs</Link>
//           <Button onClick={() => signIn()}>Sign In</Button>

//           <Button onClick={() => {
//             router.push("/api/auth/signin")
//           }}>Sign Out</Button>
//         </nav>

//       </div>
    
//   );
// };

"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";

export const Appbar = () => {
  const router = useRouter();

  return (
    <div className="border-b ">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <BriefcaseIcon className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">JobAI</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-foreground transition">
                Home
              </Link>
              <Link href="/upload" className="text-white hover:text-foreground transition">
                Upload Resume
              </Link>
              <Link href="/jobs" className="text-white hover:text-foreground transition">
                Matched Jobs
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button  className="bg-white text-black" variant="ghost" onClick={() => signIn()}>
              Sign In
            </Button>
            <Button className=" bg-white text-black"onClick={() => router.push("/api/auth/signin")}>
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};
