import React from "react";
import Logo from "../images/logo-SF.png";

const menuItems = [
  {
    id: 1,
    name: "Home",
    link: "#",
  },
  {
    id: 2,
    name: "About",
    link: "#",
  },
  {
    id: 3,
    name: "Portfolio",
    link: "#",
  },
  {
    id: 4,
    name: "Services",
    link: "#",
  },
];

const NavbarDesktop = () => {
  return (
    <div>
      <div className="flex justify-between mx-[12%] pt-[30px] items-baseline">
        {/* logo */}
        <div>
          <img src={Logo} alt="logo" className="h-[75px] object-contain" />
        </div>
        {/* menu items */}
        <div>
          <ul
            className="flex gap-16
          "
          >
            {menuItems.map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  className=" text-white text-Header5  hover:text-redOrange"
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* get in touch button*/}
        <div>
          <button className="px-5 py-2 bg-redOrange text-white text-p hover:bg-opacity-0 hover:border-2">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
