/** Public runtime site configuration. */
export function getTelegramUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_TELEGRAM_URL?.trim();
  if (!url) return null;
  if (!/^https?:\/\//i.test(url)) return null;
  return url;
}

export function getContactEmail(): string {
  return (
    process.env.CONTACT_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "astumsjbootcamp2026@gmail.com"
  );
}
