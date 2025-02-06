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
        to: process.env.EMAIL_USER, // Admin notification
        subject: "New Newsletter Subscription",
        text: `A new user has subscribed: ${userEmail}`,
      }),

      // Email to the User
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Subscription Confirmation",
        html: `
        <div style='text-align: center; padding: 20px;'>
          <h2>Thank you for subscribing!</h2>
          <p>Stay tuned for updates.</p>
          <p><strong>The SANS Team!</strong></p>
          <img src='cid:sansFooterLogo' alt='SANS Logo' width='50' style='margin-top: 10px;'/>
        </div>
        `,
        attachments: [
          {
            filename: "sansFooterLogo.png",
            path: "./public/sansFooterLogo.png",
            cid: "sansFooterLogo",
          },
        ],
      }),
    ]);

    return NextResponse.json(
      { success: true, message: "Subscription successful" },
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
