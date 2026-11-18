import { Send } from "lucide-react";
import { getTelegramUrl } from "@/lib/site";

/** Floating Telegram contact — only rendered when URL is configured. */
export function TelegramFab() {
  const telegramUrl = getTelegramUrl();
  if (!telegramUrl) return null;

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact ITQAN DEVELOPERS on Telegram"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-emerald-deep"
    >
      <Send className="h-4 w-4" />
      <span className="hidden sm:inline">Telegram</span>
    </a>
  );
}
