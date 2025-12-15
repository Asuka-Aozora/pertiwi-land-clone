import { NextRequest, NextResponse } from "next/server";

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Success response helper
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

/**
 * Error response helper
 */
export function errorResponse(error: string, status: number = 400) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error,
    },
    { status }
  );
}

/**
 * Handle async API route dengan try-catch wrapper
 * Menangkap error dan return formatted error response
 */
export function withErrorHandling<T>(
  handler: (
    request: NextRequest,
    context: { params?: Record<string, string> }
  ) => Promise<NextResponse<ApiResponse<T>>>
) {
  return async (
    request: NextRequest,
    context: { params?: Record<string, string> }
  ) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error("API Error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan pada server";

      return errorResponse(message, 500);
    }
  };
}
