import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/content/site";
import { DEFAULT_TITLE } from "@/content/seo";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  // Chaque page définit sa description et son Open Graph via pageMetadata() (content/seo.ts).
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={interTight.variable}>
      <body className="font-sans antialiased">
        {children}
        {/* Chatbot masqué en attendant sa refonte : app/components/chatbot/ est conservé tel quel.
            Pour le réafficher : importer Chatbot et LanguageProvider puis les monter ici. */}
      </body>
    </html>
  );
}
