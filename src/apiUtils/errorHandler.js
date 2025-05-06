import { AppError } from "@/apiUtils/apiError.js";
import { NextResponse } from "next/server";

export const handleApiError = async (error, t) => {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: t ? t(error.errors.join(" | ")) : error.errors.join(" | "),
        code: error.code,
        details: error.details,
      },
      { status: error.httpCode },
    );
  }

  console.error(
    t ? t("api.generic.internalError") : "Internal Server Error",
    error,
  );

  return NextResponse.json(
    { error: t ? t("api.generic.internalError") : "Internal Server Error" },
    { status: 500 },
  );
};
