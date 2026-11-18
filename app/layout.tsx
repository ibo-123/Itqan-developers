import type { Metadata } from "next";
import { Amiri, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "ITQAN DEVELOPERS is a technology community at ASTU where students learn, collaborate, and build meaningful digital solutions with purpose and mastery.",
  keywords: [
    "ITQAN DEVELOPERS",
    "إتقان",
    "ASTU",
    "software community",
    "student developers",
    "recruitment",
  ],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${sora.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-soft text-ink">
        {children}
      </body>
    </html>
  );
}
