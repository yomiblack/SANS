import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = verifyToken(token);

    if (!decoded) {
        return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: decoded });
}
