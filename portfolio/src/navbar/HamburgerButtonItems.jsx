// HamburgerButton.js
import React, { useState } from "react";
import menuItems from "./menuItems";

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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
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
            ? "absolute w-full bg-white top-28 p-4 rounded-md shadow-redOrange shadow-2xl ease-in-out duration-500 "
            : "absolute w-full bg-white -top-96 p-4 rounded-md shadow-redOrange shadow-2xl ease-in-out duration-500"
        }
      >
        <ul className="flex flex-col items-center space-y-4">
          {menuItems.map((data) => (
            <li key={data.id} className="">
              <a href={data.link} className="lg:text-Header5 text-p">
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HamburgerButtonItems;
