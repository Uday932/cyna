import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function GET() {
  const t = await getTranslations("common");

  try {
    const textSection = await prisma.textSection.findFirst();

    return NextResponse.json(textSection, { status: 200 });
  } catch (error) {
    console.error(t("textFetchError"), error);

    return NextResponse.json({ error: t("textFetchError") }, { status: 500 });
  }
}
