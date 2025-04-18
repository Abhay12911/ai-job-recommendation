// import { connectDB } from "@/app/lib/mongodb";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/app/models/User";
// import bcrypt from "bcryptjs";

// // 👇 Add `as any` here to bypass TypeScript constraint
// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Email", type: "text", placeholder: "you@example.com" },
//         password: { label: "Password", type: "password", placeholder: "••••••••" },
//       },

//       async authorize(credentials: any) {
//         const { username, password } = credentials;
//         await connectDB();

//         const user = await User.findOne({ email: username });
//         if (!user) {
//           console.log("❌ No user found with email:", username);
//           throw new Error("No user found with this email. Please sign up.");
//         }

//         console.log("🔐 Entered password:", password);
//         console.log("🔐 Stored hashed password:", user.password);

//         const cleanHashedPassword = user.password.trim().replace(/\.$/, "");

//         const isPasswordValid = await bcrypt.compare(password, cleanHashedPassword);
//         console.log("✅ Password match:", isPasswordValid);

//         if (!isPasswordValid) {
//           throw new Error("Incorrect password");
//         }

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//         };
//       }
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET ?? "secret",
//   callbacks: {
//     async signIn({ user, account }: any) {
//       if (account?.provider === "google") {
//         const { name, email } = user;
//         try {
//           await connectDB();
//           const userExists = await User.findOne({ email });

//           if (!userExists) {
//             await User.create({ name, email, password: "" });
//           }
//         } catch (error) {
//           console.error("Google Sign-in error:", error);
//           return false;
//         }
//       }
//       return true;
//     },
//   },
// } ; // 👈 This line is the key to Option 2

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
