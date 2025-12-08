/**
 * Generate URL-friendly slug dari string
 * Convert ke lowercase, replace spasi dengan dash, remove special chars
 *
 * @example
 * generateSlug("Rumah Malaya - Padalarang") // "rumah-malaya-padalarang"
 */
export function generateSlug(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      // Replace spasi dan underscore dengan dash
      .replace(/[\s_]+/g, "-")
      // Remove karakter special kecuali dash
      .replace(/[^\w\-]+/g, "")
      // Replace multiple dash dengan single dash
      .replace(/\-\-+/g, "-")
      // Remove dash di awal/akhir
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  );
}

/**
 * Generate unique slug dengan suffix number jika sudah ada
 * @param baseSlug - Slug dasar
 * @param existingSlugs - Array slug yang sudah ada di database
 *
 * @example
 * generateUniqueSlug("rumah-malaya", ["rumah-malaya"]) // "rumah-malaya-2"
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  let slug = baseSlug;
  let counter = 2;

  // Loop sampai dapat slug yang unique
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Validate format slug
 * Slug harus lowercase, hanya berisi huruf, angka, dan dash
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
