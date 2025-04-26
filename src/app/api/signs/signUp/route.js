import { hashPassword, signJwtToken } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import appConfig from "@/utils/appConfig.js";
import routes from "@/utils/routes.js";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers.js";
import { NextResponse } from "next/server.js";
import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";

export async function POST(request) {
  const t = await getTranslations("api.signs.signUp");

  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return NextResponse.json({ message: t("userExist") }, { status: 400 });
    }

    const salt = randomBytes(appConfig.security.password.saltLength).toString(
      "hex",
    );
    const hashedPasword = hashPassword(password, salt);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordHash: hashedPasword,
        passwordSalt: salt,
      },
    });

    const token = await signJwtToken({ userId: newUser.id });

    await prisma.user.update({
      where: { id: newUser.id },
      data: { verificationToken: token },
    });

    const headersList = await headers();
    const baseUrl = `${headersList.get("x-forwarded-proto") || "http"}://${headersList.get("host")}`;

    const validationUrl = `${baseUrl}${routes.signs.validate(token)}`;

    const mailOptions = {
      from: `"Cyna" <${process.env.AUTH_USER}>`,
      to: email,
      subject: t("mail.subject"),
      text: t("mail.text", {
        firstName: firstName,
        validationUrl: validationUrl,
      }),
    };

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return console.log(error);
      }
    });

    return NextResponse.json(
      {
        jwt: token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      t("error"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json({ error: t("error") }, { status: 500 });
  }
}
