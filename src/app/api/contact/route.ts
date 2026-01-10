import { NextRequest } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from "@/lib/api-response";
import { createClient } from "@/lib/supabase/client";

/**
 * POST /api/contact
 * Handle contact form submission
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const supabase = await createClient();
  // 1. Parse request body
  const body = await request.json();

  // 2. Validate input dengan Zod
  const validationResult = contactFormSchema.safeParse(body);

  if (!validationResult.success) {
    return errorResponse("Validation error", 400);
  }

  const data = validationResult.data;

  // 3. Insert ke database via Supabase
  const { data: savedData, error } = await supabase
    .from("contact_submissions")
    .insert({
      name: data.name,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      domicile: data.domicile,
      message: data.message ?? null,
      status: "new",
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Gagal menyimpan data ke database");
  }

  // 4. Return success response
  return successResponse(
    savedData,
    "Pesan berhasil dikirim. Tim kami akan segera menghubungi Anda.",
    201
  );
});
