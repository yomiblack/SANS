import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";

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

    //Check database if user's email already exist

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const subscribersCollection = db.collection("subscribers");

    const existingSubscribers = await subscribersCollection.findOne({
      email: userEmail,
    });

    if (existingSubscribers) {
      await client.close();
      return NextResponse.json(
        {
          success: false,
          message:
            "You have already subscribed to our newsletter. Stay tuned for updates!",
        },
        { status: 200 }
      );
    }

    // Insert new subscriber to database
    await subscribersCollection.insertOne({ email: userEmail });
    const subscribers = await subscribersCollection.find().toArray();
    const subscriberEmails = subscribers
      .map((subscriber) => subscriber.email)
      .join(", ");

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
        html: `
           <div style='text-align: center; padding: 20px;'>
            <h2>New Newsletter Subscriber</h2>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Total Subscribers:</strong> ${subscribers.length}</p>
            <p><strong>Subscriber List:</strong> ${subscriberEmails}</p>
          </div>
        `,
      }),

      // Email to the User
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Subscription Confirmation",
        html: `
        <div style='text-align: center; padding: 20px;'>
        <img src='cid:sansFooterLogo' alt='SANS Logo' width='50' style='margin-bottom: 5px;'/>
          <h2>Thank you for subscribing!</h2>
          <p>Stay tuned for updates.</p>
          <p><strong>- The SANS Team</strong></p>
        </div>
        `,
        attachments: [
          {
            filename: "sansFooterLogo.png",
            path: "./app/components/assets/sansFooterLogo.png",
            cid: "sansFooterLogo",
          },
        ],
      }),
    ]);

    await client.close();

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
