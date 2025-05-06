import { NotFoundError } from "@/apiUtils/apiError.js";
import { validateSchema } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import { handleApiError } from "@/apiUtils/errorHandler.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

export async function POST(request) {
  const body = await request.json();

  const { serviceId, priority, startDate, endDate } = body;

  const validatedParams = await validateSchema(
    { id: parseInt(serviceId) },
    { id: idValidator.required() },
  );

  const serviceExist = await prisma.service.findUnique({
    where: { id: validatedParams.id },
  });

  if (!serviceExist) {
    throw new NotFoundError(["Top service not found"]);
  }

  try {
    await prisma.topService.create({
      data: {
        serviceId: parseInt(serviceId),
        priority: priority,
        startDate: startDate,
        endDate: endDate,
      },
    });

    return NextResponse.json(
      { message: "Top service successfully created!" },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
