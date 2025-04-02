"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router

export const Appbar = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>

      <button onClick={()=>{
        router.push("/api/auth/signin")
      }}>Sign Out</button>
    </div>
  );
};
