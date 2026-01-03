import { NextRequest } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from "@/lib/api-response";
import prisma from "@/lib/prisma";

/**
 * POST /api/contact
 * Handle contact form submission
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  // 1. Parse request body
  const body = await request.json();

  // 2. Validate input dengan Zod
  const validationResult = contactFormSchema.safeParse(body);

  if (!validationResult.success) {
    return errorResponse("Validation error", 400);
  }

  const data = validationResult.data;

  // 3. Insert ke database via Prisma
  const savedData = await prisma.contact_submissions.create({
    data: {
      name: data.name,
      gender: data.gender ?? null,
      phone: data.phone,
      email: data.email,
      domicile: data.domicile ?? null,
      message: data.message ?? null,
      status: "new",
    },
  });

  // 4. Return success response
  return successResponse(
    savedData,
    "Pesan berhasil dikirim. Tim kami akan segera menghubungi Anda.",
    201
  );
});
