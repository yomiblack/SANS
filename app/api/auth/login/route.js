import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectDB } from "@/lib/mongodb";
import { signToken } from "@/lib/auth";

export async function POST(req) {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user || !user.active) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.role !== "admin") {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const token = signToken({
        id: user._id,
        email: user.email,
        role: user.role,
    });

    const res = NextResponse.json({ success: true });

    res.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 60, // 30 minutes
    });

    return res;
}


