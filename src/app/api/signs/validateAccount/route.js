import prisma from "@/apiUtils/prisma-client.js";
import { verifyJwtToken } from "@/utils/utils.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const t = await getTranslations("api.signs.validate");

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    const decoded = await verifyJwtToken(token);

    if (!token) {
      return NextResponse.json({ error: t("tokenError") }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: t("tokenError") }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(
      t("error"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json({ error: t("error") }, { status: 500 });
  }
}
