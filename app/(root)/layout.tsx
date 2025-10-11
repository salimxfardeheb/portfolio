import React from "react";
import Footer from "../components/ui/Footer";
import NavbarDesktop from "../components/ui/navbarDesktop";
import NavbarMobile from "../components/ui/navbarMobile";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-black">
        <header>
          <NavbarDesktop absolute={false} />
          <NavbarMobile />
        </header>
        <main>{children}</main>\
      </div>
  );
}
