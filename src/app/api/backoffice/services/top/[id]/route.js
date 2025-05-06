import { NotFoundError } from "@/apiUtils/apiError.js";
import { validateSchema } from "@/apiUtils/apiUtils.js";
import {
  endDateTopService,
  idValidator,
  integerValidator,
  startDateTopService,
} from "@/apiUtils/apiValidators.js";
import { handleApiError } from "@/apiUtils/errorHandler.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { serviceId, priority, startDate, endDate } = body;

    const validatedParams = await validateSchema(
      { id: parseInt(id) },
      { id: idValidator.required() },
    );

    const serviceExist = await prisma.topService.findUnique({
      where: {
        id: validatedParams.id,
      },
    });

    if (!serviceExist) {
      throw new NotFoundError(["Top service not found"]);
    }

    const validateBody = await validateSchema(
      {
        serviceId: parseInt(serviceId),
        priority: priority,
        startDate: startDate,
        endDate: endDate,
      },
      {
        serviceId: idValidator,
        priority: integerValidator,
        startDate: startDateTopService,
        endDate: endDateTopService,
      },
    );

    await prisma.topService.update({
      where: {
        id: validatedParams.id,
      },
      data: {
        ...validateBody,
      },
    });

    return NextResponse.json(
      { message: "Top services successfully updated" },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const validatedParams = await validateSchema(
      { id: parseInt(id) },
      {
        id: idValidator.required(),
      },
    );

    const serviceExist = await prisma.topService.findUnique({
      where: {
        id: validatedParams.id,
      },
    });

    if (!serviceExist) {
      throw new NotFoundError(["Top service not found"]);
    }

    await prisma.topService.delete({
      where: {
        id: validatedParams.id,
      },
    });

    return NextResponse.json(
      { status: 200 },
      { message: "top services successfully deleted" },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
