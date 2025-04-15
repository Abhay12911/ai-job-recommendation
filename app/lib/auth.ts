// app/lib/authOptions.ts
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { username, password } = credentials;
        await connectDB();

        const user = await User.findOne({ email: username });
        if (!user) throw new Error("No user found");

        const cleanHashedPassword = user.password.trim().replace(/\.$/, "");
        const isPasswordValid = await bcrypt.compare(password, cleanHashedPassword);

        if (!isPasswordValid) throw new Error("Incorrect password");

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        const { name, email } = user;
        try {
          await connectDB();
          const userExists = await User.findOne({ email });
          if (!userExists) await User.create({ name, email, password: "" });
        } catch (error) {
          console.error("Google Sign-in error:", error);
          return false;
        }
      }
      return true;
    },
  },
};
