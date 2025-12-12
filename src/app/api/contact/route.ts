import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { contactFormSchema } from "@/lib/validations/contact";
import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from "@/lib/api-response";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const supabase = await createClient();


  // Parse request body
  const body = await request.json();

  // Validate input dengan Zod
  const validationResult = contactFormSchema.safeParse(body);

  if (!validationResult.success) {
    // Return validation errors
    const errors = validationResult.error
    return errorResponse(`Validation error: ${errors}`, 400);
  }

  const validatedData = validationResult.data;

  // Insert ke Supabase
  
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert([
      {
        name: validatedData.name,
        gender: validatedData.gender || null,
        phone: validatedData.phone,
        email: validatedData.email,
        domicile: validatedData.domicile || null,
        message: validatedData.message || null,
        status: "new",
      },
    ])
    // .select() pakai ini jika ingin menampilkan data 
    .single();

  if (error) {
    console.error("Database error:", error);
    return errorResponse("Gagal menyimpan data. Silakan coba lagi.", 500);
  }

  return successResponse(
    data,
    "Pesan berhasil dikirim. Tim kami akan segera menghubungi Anda.",
    201
  );
});

// baru contact kuyy