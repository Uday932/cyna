import { validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function GET(request) {
  const t = await getTranslations("api.users");

  try {
    const userId = request.headers.get("x-user-id");

    const validateParams = await validateRouteData(
      {
        id: parseInt(userId),
      },
      { id: idValidator.required() },
    );

    const user = await prisma.user.findUnique({
      where: {
        id: validateParams.id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: t("notFound"),
        },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(
      t("internalError"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json({ error: t("internalError") }, { status: 500 });
  }
}

export async function PATCH(request) {
  const t = await getTranslations("api.users");

  try {
    const body = await request.json();
    const { firstName, lastName, email } = body;

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

    if (!user) {
      return NextResponse.json(
        {
          error: t("notFound"),
        },
        { status: 404 },
      );
    }

    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== validatedParams.id) {
        return NextResponse.json(
          { error: t("emailAlreadyUsed") },
          { status: 400 },
        );
      }
    }

    await prisma.user.update({
      where: { id: validatedParams.id },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    });

    return NextResponse.json(
      {
        message: t("updateSuccess"),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      t("internalError"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json({ error: t("internalError") }, { status: 500 });
  }
}
