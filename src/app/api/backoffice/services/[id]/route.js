import { uploadImages, validateRouteData } from "@/apiUtils/apiUtils.js";
import {
  availabilityValidator,
  idValidator,
  imagesValidator,
  integerValidator,
  numberValidator,
  stringValidator,
} from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const schemaField = {
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
};

export async function PATCH(request, { params }) {
  const formData = await request.formData();

  try {
    const { id } = await params;

    const body = {
      name: formData.get("name"),
      summary: formData.get("summary"),
      description: formData.get("description"),
      technicalCharacteristics: formData.get("technicalCharacteristics"),
      companyBenefits: formData.get("companyBenefits"),
      category: formData.get("category"),
      monthlyPrice: formData.get("monthlyPrice"),
      annualPrice: formData.get("annualPrice"),
      perUserPrice: formData.get("perUserPrice"),
      perDevicePrice: formData.get("perDevicePrice"),
      maxResources: formData.get("maxResources"),
      usedResources: formData.get("usedResources"),
      availability: formData.get("availability"),
      priority: formData.get("priority"),
    };

    const validatedParams = await validateRouteData(
      { id: parseInt(id) },
      { id: idValidator.required() },
    );

    if (validatedParams instanceof NextResponse) {
      return validatedParams;
    }

    const validatedBody = await validateRouteData(body, schemaField);

    if (validatedBody instanceof NextResponse) {
      return validatedBody;
    }

    const service = await prisma.service.findUnique({
      where: { id: validatedParams.id },
      select: { images: true },
    });

    const uploadedImages = await uploadImages(formData, "services");

    const mergedImages = [...service.images, ...uploadedImages];

    const updatedService = await prisma.service.update({
      where: {
        id: validatedParams.id,
      },
      data: {
        ...validatedBody,
        images: mergedImages,
      },
    });

    return NextResponse.json(
      {
        updatedService,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur:", error instanceof Error ? error : new Error(error));

    return NextResponse.json(
      { error: "Erreur interne du serveur, veuillez réessayer." },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const validatedParams = await validateRouteData(
      { id: parseInt(id) },
      {
        id: idValidator.required(),
      },
    );

    const serviceExist = await prisma.service.findUnique({
      where: {
        id: validatedParams.id,
      },
    });

    if (!serviceExist) {
      return NextResponse.json(
        { error: "Service non trouvé" },
        { status: 404 },
      );
    }

    await prisma.service.delete({
      where: {
        id: validatedParams.id,
      },
    });

    return NextResponse.json(
      { status: 200 },
      { message: "services supprimées avec succès" },
    );
  } catch (error) {
    console.error("Erreur lors de la suppression des services:", error);

    return NextResponse.json(
      { error: "Erreur lors de la suppression des services" },
      { status: 500 },
    );
  }
}
