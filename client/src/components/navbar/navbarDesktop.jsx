import React from "react";
import Logo from "../../images/logo-SF.png";
import menuItems from "./menuItems";


const NavbarDesktop = () => {
  return (
    <div className="w-full absolute top-0 ">
      <div className="md:flex justify-between mx-[12%] pt-[30px] items-baseline hidden">
        {/* logo */}
        <div>
          <a href="/home"><img src={Logo} alt="logo" className="h-[75px] object-contain"/></a>
        </div>
        {/* menu items */}
        <div>
          <ul
            className="md:flex lg:gap-16 md:gap-10
          "
          >
            {menuItems.map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  className=" text-white lg:text-Header5 text-p hover:text-redOrange"
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* get in touch button*/}
        <div className="">
          <button className="lg:px-5 px-3 py-2 lg:py-2 bg-redOrange text-white text-p hover:bg-opacity-0 hover:border-2"
          /* onClick={contactMe} */>
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
