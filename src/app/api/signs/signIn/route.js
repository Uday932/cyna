import { hashPassword, signJwtToken } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function POST(request) {
  const t = await getTranslations();

  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: t("api.signs.signIn.userNotFound") },
        { status: 400 },
      );
    }

    const hashedPasword = hashPassword(password, user.passwordSalt);

    if (user.passwordHash !== hashedPasword) {
      return NextResponse.json(
        {
          error: t("api.signs.signIn.invalidPassword"),
        },
        { status: 400 },
      );
    }

    const jwt = await signJwtToken({ userId: user.id, role: user.role });

    return NextResponse.json({ jwt }, { status: 200 });
  } catch (error) {
    console.error(
      t("common.error"),
      t("common.connection"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json(
      { error: t("api.signs.signIn.error") },
      { status: 500 },
    );
  }
}
