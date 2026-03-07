import { NextRequest, NextResponse } from "next/server";

/**
 * Contact API Route Handler
 *
 * Ready for future integration: connect to a database (e.g. Prisma + PostgreSQL)
 * or an email service (e.g. Resend, SendGrid) to store/send contact form
 * submissions. For now, the site uses Google Forms for registrations; this
 * endpoint can be used later for a custom contact form or newsletter signup.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate or sanitize body as needed (e.g. name, email, message)
    // const { name, email, message } = body;

    // TODO: Add database insert or email sending here
    // await db.contact.create({ data: { name, email, message } });
    // await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' });

    return NextResponse.json(
      { success: true, message: "Thank you for your message." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
