import { hashPassword } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import appConfig from "@/utils/appConfig.js";
import { verifyJwtToken } from "@/utils/utils.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";
import { randomBytes } from "node:crypto";

export async function POST(request) {
  const t = await getTranslations("api.signs");

  try {
    const body = await request.json();
    const { password, resetToken } = body;

    const decoded = await verifyJwtToken(resetToken);

    if (!decoded) {
      return NextResponse.json(
        { error: t("forgot.reset.tokenError") },
        { status: 400 },
      );
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      return NextResponse.json(
        { error: t("forgot.reset.tokenError") },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: t("forgot.reset.tokenError") },
        { status: 404 },
      );
    }

    const salt = randomBytes(appConfig.security.password.saltLength).toString(
      "hex",
    );

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashPassword(password, salt),
        emailVerified: true,
        verificationToken: null,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(t("forgot.reset.error"), error);

    return NextResponse.json(
      {
        error: t("forgot.reset.error"),
      },
      { status: 500 },
    );
  }
}
