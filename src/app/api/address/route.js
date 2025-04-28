import { validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function GET(request) {
  const t = await getTranslations("api.address");

  try {
    const userId = request.headers.get("x-user-id");

    const validateParams = await validateRouteData(
      {
        id: parseInt(userId),
      },
      { id: idValidator.required() },
    );

    const address = await prisma.address.findMany({
      where: {
        userId: validateParams.id,
      },
      select: {
        id: true,
        userId: true,
        firstName: true,
        lastName: true,
        addressLine1: true,
        addressLine2: true,
        city: true,
        postalCode: true,
        country: true,
        mobile: true,
        createdAt: true,
        updatedAt: true,
        isDefault: true,
      },
    });

    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    console.error(
      t("error"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json({ error: t("error") }, { status: 500 });
  }
}

export async function POST(request) {
  const t = await getTranslations("api.address");

  try {
    const userId = request.headers.get("x-user-id");

    const validateParams = await validateRouteData(
      { id: parseInt(userId) },
      { id: idValidator.required() },
    );

    const body = await request.json();

    if (body.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: validateParams.id,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const address = await prisma.address.upsert({
      where: {
        id: body.id ?? 0,
      },
      update: {
        firstName: body.firstName,
        lastName: body.lastName,
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country,
        mobile: body.mobile,
        isDefault: body.isDefault,
      },
      create: {
        userId: validateParams.id,
        firstName: body.firstName,
        lastName: body.lastName,
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country,
        mobile: body.mobile,
        isDefault: body.isDefault,
      },
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    console.error(
      t("errorPatch"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json({ error: t("errorPatch") }, { status: 500 });
  }
}
