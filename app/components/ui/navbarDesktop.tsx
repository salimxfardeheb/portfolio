"use client";
import React from "react";
import { menuItems } from "@/app/variables";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

const NavbarDesktop = () => {
  return (
    <div className="w-full absolute top-0" id="up">
      <div className="md:flex justify-between mx-[5%] lg:mx-[12%] pt-[30px] items-baseline hidden">
        {/* logo */}
        <div>
          <Link href="/">
            <img
              src="/images/logo-SF.png"
              alt="logo"
              className="h-[75px] object-contain"
            />
          </Link>
        </div>
        {/* menu items */}
        <div>
          <ul className="md:flex lg:gap-16 md:gap-10">
            {menuItems.map((data) => (
              <li key={data.id} className="relative">
                <Link
                  href={data.link}
                  className="text-white lg:text-Header5 text-p hover:text-redOrange"
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ScrollLink to="contact" smooth={true} duration={600} offset={-80}>
          <button className="lg:px-5 px-3 py-2 lg:py-2 bg-redOrange text-white text-p hover:bg-opacity-0 hover:border-2">
            Get in Touch
          </button>
        </ScrollLink>
      </div>
    </div>
  );
};

export default NavbarDesktop;
