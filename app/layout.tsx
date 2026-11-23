import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/content/site";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Sites et logiciels sur mesure à Oran`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Agence web à Oran : boutiques en ligne, sites vitrines, menus QR et logiciels de gestion sur mesure pour les commerces en Algérie. Paiement unique, sans abonnement.",
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    siteName: SITE_NAME,
  },
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
