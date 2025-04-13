import { validateRouteData } from "@/apiUtils/apiUtils.js";
import {
  availabilityValidator,
  idValidator,
  imagesValidator,
  integerValidator,
  numberValidator,
  stringValidator,
} from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

const handler = {
  PATCH: async (request, { params }) => {
    try {
      const body = await request.json();
      const { id } = await params;

      const validatedParams = await validateRouteData(
        { id: parseInt(id) },
        {
          id: idValidator.required(),
        },
      );

      if (validatedParams instanceof NextResponse) {
        return validatedParams;
      }

      const validatedBody = await validateRouteData(body, {
        name: stringValidator("name"),
        summary: stringValidator("summary"),
        description: stringValidator("description", { nullable: true }),
        technicalCharacteristics: stringValidator("technicalCharacteristics", {
          nullable: true,
        }),
        companyBenefits: stringValidator("companyBenefits", { nullable: true }),
        category: stringValidator("category", { nullable: true }),
        monthlyPrice: numberValidator(),
        annualPrice: numberValidator(),
        perUserPrice: numberValidator(),
        perDevicePrice: numberValidator(),
        maxResources: numberValidator(),
        usedResources: numberValidator(),
        availability: availabilityValidator,
        priority: integerValidator,
        images: imagesValidator,
      });

      if (validatedBody instanceof NextResponse) {
        return validatedBody;
      }

      const updateData = {
        name: validatedBody.name,
        summary: validatedBody.summary,
        description: validatedBody.description,
        companyBenefits: validatedBody.companyBenefits,
        technicalCharacteristics: validatedBody.technicalCharacteristics,
        category: validatedBody.category,
        monthlyPrice: validatedBody.monthlyPrice,
        annualPrice: validatedBody.annualPrice,
        perUserPrice: validatedBody.perUserPrice,
        perDevicePrice: validatedBody.perDevicePrice,
        maxResources: validatedBody.maxResources,
        usedResources: validatedBody.usedResources,
        availability: validatedBody.availability,
        priority: validatedBody.priority,
      };

      if (validatedBody.images !== undefined) {
        updateData.images = validatedBody.images;
      }

      const updatedService = await prisma.service.update({
        where: {
          id: validatedParams.id,
        },
        data: updateData,
      });

      return NextResponse.json(
        {
          updatedService,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error(
        "Erreur:",
        error instanceof Error ? error : new Error(error),
      );

      return NextResponse.json(
        { error: "Erreur interne du serveur, veuillez réessayer." },
        { status: 500 },
      );
    }
  },
};

export const { PATCH } = handler;
