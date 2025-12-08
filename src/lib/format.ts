/**
 * Format angka ke format Rupiah
 * @param amount - Nominal dalam number
 * @param showPrefix - Tampilkan prefix "Rp" atau tidak
 *
 * @example
 * formatRupiah(1500000) // Output: "Rp 1.500.000"
 * formatRupiah(1500000, false) // Output: "1.500.000"
 */
export function formatRupiah(
  amount: number,
  showPrefix: boolean = true
): string {
  const formatted = new Intl.NumberFormat("id-ID").format(amount);
  return showPrefix ? `Rp ${formatted}` : formatted;
}

/**
 * Format price range untuk display
 * Jika start dan end sama atau end kosong, tampilkan single price
 *
 * @example
 * formatPriceRange(500000000, 800000000) // "Rp 500 Juta - Rp 800 Juta"
 * formatPriceRange(500000000, null) // "Mulai Rp 500 Juta"
 */
export function formatPriceRange(
  priceStart: number | null,
  priceEnd: number | null
): string {
  if (!priceStart) return "Harga Belum Tersedia";

  const formatPrice = (price: number) => {
    if (price >= 1000000000) {
      // Format dalam Miliar
      return `Rp ${(price / 1000000000).toFixed(
        price % 1000000000 === 0 ? 0 : 1
      )} M`;
    } else if (price >= 1000000) {
      // Format dalam Juta
      return `Rp ${(price / 1000000).toFixed(
        price % 1000000 === 0 ? 0 : 1
      )} Juta`;
    }
    return formatRupiah(price);
  };

  if (!priceEnd || priceStart === priceEnd) {
    return `Mulai ${formatPrice(priceStart)}`;
  }

  return `${formatPrice(priceStart)} - ${formatPrice(priceEnd)}`;
}

/**
 * Format date ke format Indonesia
 * @param date - String date atau Date object
 *
 * @example
 * formatDate("2024-01-15") // "15 Januari 2024"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Format date dengan waktu
 * @example
 * formatDateTime("2024-01-15T10:30:00") // "15 Januari 2024, 10:30"
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Truncate text dengan ellipsis
 * @param text - Text yang akan dipotong
 * @param maxLength - Panjang maksimal karakter
 *
 * @example
 * truncateText("Lorem ipsum dolor sit amet", 10) // "Lorem ipsu..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
