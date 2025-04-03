import { connectDB } from '@/app/lib/mongodb';

import User from "../models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  const { name, email } = await req.json();
  await connectDB();
  await User.create({ name, email });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}