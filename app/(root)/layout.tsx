"use client";
import React, { ReactNode } from "react";
import Footer from "../components/ui/Footer";
import NavbarDesktop from "../components/ui/navbarDesktop";
import NavbarMobile from "../components/ui/navbarMobile";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header>
        <NavbarDesktop />
        <NavbarMobile />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
