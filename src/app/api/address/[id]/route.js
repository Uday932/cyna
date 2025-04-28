import { validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function DELETE(request, { params }) {
  const t = await getTranslations("api.address");
  const { id } = await params;
  const userId = request.headers.get("x-user-id");

  try {
    const validateParams = await validateRouteData(
      { id: parseInt(id) },
      { id: idValidator.required() },
    );

    const addressToDelete = await prisma.address.findUnique({
      where: {
        id: validateParams.id,
      },
    });

    if (addressToDelete && addressToDelete.isDefault) {
      const addressCount = await prisma.address.count({
        where: {
          userId: parseInt(userId),
          id: { not: validateParams.id },
        },
      });

      if (addressCount > 0) {
        const nextAddress = await prisma.address.findFirst({
          where: {
            userId: parseInt(userId),
            id: { not: validateParams.id },
          },
        });

        if (nextAddress) {
          await prisma.address.update({
            where: {
              id: nextAddress.id,
            },
            data: {
              isDefault: true,
            },
          });
        }
      }
    }

    await prisma.address.delete({
      where: {
        id: validateParams.id,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(
      t("errorPatch"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json({ error: t("error") }, { status: 500 });
  }
}
