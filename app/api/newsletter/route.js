import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const userEmail = formData.get("subscribe-email");

    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send emails concurrently
    await Promise.all([
      // Email to Admin
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "harmonicchoir1@gmail.com", // Admin notification
        subject: "New Newsletter Subscription",
        text: `A new user has subscribed: ${userEmail}`,
      }),

      // Email to the User
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail, // Send confirmation to user
        subject: "Subscription Confirmation",
        text: `Thank you for subscribing to our newsletter! Stay tuned for updates.

        The SANS Team!`,
      }),
    ]);

    return NextResponse.json(
      { success: true, message: "Subscription successful" }, // Ensure success is set to true
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
