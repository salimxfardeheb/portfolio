import React from "react";
import HamburgerButtonItems from "./HamburgerButtonItems";
import Link from "next/link";

const NavbarMobile = () => {
  return (
    <div className="absolute w-full">
      <div className="flex md:hidden justify-between items-center pt-12 mx-[12%] relative">
        {/* Logo */}
        <div>
          <Link href="/">
            <img
              src="/images/logo-SF.png"
              alt="logoMobile"
              className="h-[50px] object-contain"
            />
          </Link>
        </div>
        {/* humburger button */}
        <HamburgerButtonItems />
      </div>
    </div>
  );
};
export default NavbarMobile;
