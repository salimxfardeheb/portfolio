import React from "react";
import Logo from "../images/logo-SF.png";
import HamburgerButtonItems from "./HamburgerButtonItems";

const NavbarMobile = () => {
  return (
    <div className="flex md:hidden justify-between items-center pt-12 mx-[12%] relative">
      {/* Logo */}
      <div>
        <img src={Logo} alt="logoMobile" className="h-[50px] object-contain" />
      </div>
      {/* humburger button */}
      <HamburgerButtonItems />
    </div>
  );
};
export default NavbarMobile;
