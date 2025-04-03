import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
      const newUser = new User({ name, email });
      await newUser.save();
      return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "User already exists" }, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
