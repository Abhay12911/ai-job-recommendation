import { connectDB } from '@/app/lib/mongodb';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
; // Correct import path
import User from '@/app/models/User'; // Ensure correct path

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn({ user, account }: any) { // Use `any` if strict types are causing issues
      if (account?.provider === "google") {
        const { name, email } = user;
        try {
          await connectDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            });

            if (res.ok) {
              return true; // Allow sign-in
            }
          }
        } catch (error) {
          console.error("Sign-in error:", error);
          return false; // Block sign-in on error
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
