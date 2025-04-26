import { signJwtToken } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import routes from "@/utils/routes.js";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers.js";
import { NextResponse } from "next/server.js";
import nodemailer from "nodemailer";

export async function POST(request) {
  const t = await getTranslations("api.signs");

  try {
    const body = await request.json();
    const { email } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: t("forgot.request.message") },
        { status: 200 },
      );
    }

    const resetToken = await signJwtToken({ userId: user.id });

    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken: resetToken },
    });

    const headersList = await headers();
    const baseUrl = `${headersList.get("x-forwarded-proto") || "http"}://${headersList.get("host")}`;

    const resetUrl = `${baseUrl}${routes.signs.forgotPassword.reset(
      resetToken,
    )}`;

    const text = t("forgot.request.mail.text", {
      firstName: user.firstName,
      resetUrl: resetUrl,
    });

    const mailOptions = {
      from: `"Cyna" <${process.env.AUTH_USER}>`,
      to: user.email,
      subject: t("forgot.request.mail.subject"),
      text: text,
    };

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: t("forgot.request.message") },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: t("forgot.request.error") },
      { status: 500 },
    );
  }
}
