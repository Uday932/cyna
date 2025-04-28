import { uploadImages, validateRouteData } from "@/apiUtils/apiUtils.js";
import {
  availabilityValidator,
  integerValidator,
  numberValidator,
  stringValidator,
} from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const schemaFields = {
  name: stringValidator("Name"),
  summary: stringValidator("Summary"),
  description: stringValidator("Description", { required: false }),
  technicalCharacteristics: stringValidator("Technical characteristics", {
    required: false,
  }),
  companyBenefits: stringValidator("Company Benefits", { required: false }),
  category: stringValidator("Category", { required: false }),
  monthlyPrice: numberValidator(0).nullable(),
  annualPrice: numberValidator(0).nullable(),
  perUserPrice: numberValidator(0).nullable(),
  perDevicePrice: numberValidator(0).nullable(),
  maxResources: integerValidator.nullable(),
  usedResources: integerValidator.nullable(),
  availability: availabilityValidator,
  priority: integerValidator.required("Priority is required"),
};

export async function POST(request) {
  const formData = await request.formData();

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

  const validatedBody = await validateRouteData(body, schemaFields);

  if (validatedBody instanceof NextResponse) {
    return validatedBody;
  }

  const uploadedImages = await uploadImages(formData, "services");

  try {
    await prisma.service.create({
      data: {
        ...validatedBody,
        images: uploadedImages,
      },
    });

    return NextResponse.json(
      { message: "Service successfully created!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error:", error instanceof Error ? error : new Error(error));

    return NextResponse.json(
      { error: "Internal server error, please try again." },
      { status: 500 },
    );
  }
}
