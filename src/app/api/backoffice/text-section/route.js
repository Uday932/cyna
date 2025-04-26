import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function PATCH(req) {
  const t = await getTranslations("api.text-section");

  try {
    const body = await req.json();
    const updatedText = await prisma.textSection.update({
      where: { id: 1 },
      data: { content: body.textePrincipal },
    });

    return NextResponse.json(updatedText, { status: 200 });
  } catch (error) {
    console.error(t("updateError"), error);

    return NextResponse.json({ error: t("updateError") }, { status: 500 });
  }
}
