import React from "react";
import NavbarDesktop from "./navbar/navbarDesktop";
import NavbarMobile from "./navbar/navbarMobile";
import HeroSection from "./hero-section/heroSection";

const App = () => {
  return (
    <>
      <div className="relative">
        <NavbarDesktop />
        <NavbarMobile />
        <HeroSection />
      </div>
    </>
  );
};

export default App;
