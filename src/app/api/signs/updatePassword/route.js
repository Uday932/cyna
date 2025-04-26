import { hashPassword, validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import appConfig from "@/utils/appConfig.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export async function PATCH(request) {
  const t = await getTranslations();

  try {
    const body = await request.json();
    const { oldPassword, newPassword } = body;

    const userId = request.headers.get("x-user-id");

    const validatedParams = await validateRouteData(
      { id: parseInt(userId) },
      {
        id: idValidator.required(),
      },
    );

    const user = await prisma.user.findUnique({
      where: {
        id: validatedParams.id,
      },
    });

    const hashedPasword = hashPassword(oldPassword, user.passwordSalt);

    if (!user || user.passwordHash !== hashedPasword) {
      return NextResponse.json(
        {
          error: t("common.invalidPassword"),
        },
        { status: 400 },
      );
    }

    const salt = randomBytes(appConfig.security.password.saltLength).toString(
      "hex",
    );

    await prisma.user.update({
      where: { id: validatedParams.id },
      data: {
        passwordHash: hashPassword(newPassword, salt),
        passwordSalt: salt,
      },
    });

    return NextResponse.json(
      { message: t("api.signs.update.passwordUpdated") },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      t("api.signs.update.internalError"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json(
      { error: t("api.signs.update.internalError") },
      { status: 500 },
    );
  }
}
