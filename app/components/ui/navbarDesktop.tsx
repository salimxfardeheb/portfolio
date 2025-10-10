import React, { useState } from "react";
import {menuItems} from "@/app/variables";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Link from "next/link";

const NavbarDesktop = () => {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  const togglePortfolioMenu = () => {
    setIsPortfolioOpen(!isPortfolioOpen);
  };

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
        <AnchorLink href="/contact">
          <button
            className="lg:px-5 px-3 py-2 lg:py-2 bg-redOrange text-white text-p hover:bg-opacity-0 hover:border-2"
            onClick={() => {}}
          >
            Get in Touch
          </button>
        </AnchorLink>
      </div>
    </div>
  );
};

export default NavbarDesktop;