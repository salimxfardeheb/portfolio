// HamburgerButton.js
import React, { useState } from "react";
import menuItems from "./menuItems";
import AnchorLink from "react-anchor-link-smooth-scroll"; 


const HamburgerButtonItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="border-2 border-white h-fit flex p-2 rounded-md">
        {/* hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden text-white focus:outline-none transition-transform ${
            isOpen ? "transform rotate-90" : ""
          }`}
        >
          <svg
            className=" h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              /* drawing the close icon */
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              /*  drawing the open icon */
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-16 6h16"
              />
            )}
          </svg>
        </button>
      </div>
      {/* menu Items */}
      <div
        className={
          isOpen
            ? "menuItems top-28 scale-100"
            : "menuItems -top-96 scale-0"
        }
      >
        <ul className="flex flex-col items-center space-y-4">
          {menuItems.map((data) => (
            <li key={data.id}>
              <AnchorLink href={data.link} className="lg:text-Header5 text-p">
              {data.name}
              </AnchorLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HamburgerButtonItems;
