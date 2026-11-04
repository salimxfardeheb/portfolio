import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/ui/Footer";
import Chatbot from "./components/chatbot/Chatbot";
import { LanguageProvider } from "./context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SALIM FARDEHEB",
  description: "Développeur web Oran / Algérie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={` ${poppins.variable} antialiased`}>
        <LanguageProvider>
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </LanguageProvider>
        <Analytics />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="e80b0366-078a-4eac-9094-4a823a0f7e51"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
