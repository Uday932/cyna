import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function POST(request) {
  const t = await getTranslations("api.contact");

  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: t("errorRequiredField") },
        { status: 400 },
      );
    }

    const mailOptions = {
      from: `"Cyna" <${process.env.AUTH_USER}>`,
      to: process.env.AUTH_USER,
      subject: t("mail.subject", { name: name, email: email }),
      text: t("mail.text", {
        name: name,
        email: email,
        message: message,
      }),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: t("messageSuccess") }, { status: 200 });
  } catch (error) {
    console.error(t("errorInternalServer"), error);

    return NextResponse.json(
      { error: t("errorInternalServer") },
      { status: 500 },
    );
  }
}
