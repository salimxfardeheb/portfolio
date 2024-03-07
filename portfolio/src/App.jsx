import React from "react";
import NavbarDesktop from "./navbar/navbarDesktop";
import NavbarMobile from "./navbar/navbarMobile";
import HeroSection from "./hero-section/heroSection";

const App = () => {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
      <HeroSection />
    </>
  );
};

export default App;
