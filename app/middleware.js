import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req) {
    const token = req.cookies.get("auth_token")?.value;
    const { pathname } = req.nextUrl;

    // Only protect admin routes
    if (!pathname.startsWith("/choirs/form")) {
        return NextResponse.next();
    }

    // Not logged in
    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const decoded = verifyToken(token);

    // Invalid or expired token
    if (!decoded) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Logged in but not admin
    if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // All good
    return NextResponse.next();
}
