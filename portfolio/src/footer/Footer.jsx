import React from "react";
import menuItems from "../navbar/menuItems";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";

import logo from "../images/logo-SF.png";

const Footer = () => {
  return (
    <div className="bg-black py-24 flex flex-col md:gap-24 gap-12">
      <div className="mx-[12%] flex flex-col gap-6">
        <div>
          <p className="md:text-Header5 text-MobileHeader5 text-redOrange">
            Contact Me
          </p>
          <p className="md:text-Header2 text-MobileHeader2 text-white">
            Work Inquiry
          </p>
        </div>
        <form action="">
          <div className="input-group flex flex-col gap-6 text-white ">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="rounded-[20px] bg-black border-2 border-white placeholder:text-white focus:border-redOrange  p-5"
            />
            <input
              type="Email"
              name="name"
              placeholder="Your Email"
              className="rounded-[20px] bg-black border-2 border-white placeholder:text-white focus:border-redOrange p-5 "
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="rounded-[20px] bg-black border-2 border-white placeholder:text-white focus:border-redOrange p-5"
              placeholder="Your Message"
            ></textarea>
            <button className="bg-redOrange py-3 hover:opacity-90 duration-150">
              Send Your Message
            </button>
          </div>
        </form>
      </div>
      <div className="mx-[17%]">
        <div>
          <ul className=" text-white flex flex-col md:flex-row md:justify-around items-center text-Header5 border-y-2 border-nevada md:py-12 gap-6 py-5 mx-[25%] md:mx-auto">
            {menuItems.map((data) => (
              <li key={data.id} className=" hover:text-redOrange">
                <a href={data.link}>{data.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center md:mt-[100px] mt-12">
          <div>
            <img
              src={logo}
              alt=""
              className="md:w-[120px] w-[64.15px] object-contain"
            />
          </div>
          <div className="hidden md:block">
            <p className="text-nevada text-p">© Copyright by Salim Fardeheb.</p>
          </div>
          <div className="flex justify-between md:w-[30%] gap-3">
            <a href="">
              <FaFacebookSquare className="w-10 h-10 text-nevada object-contain hover:text-redOrange" />
            </a>
            <a href="">

              <FaLinkedin className="w-10 h-10 text-nevada object-contain hover:text-redOrange" />
            </a>
            <a href="">
              <FaSquareXTwitter className="w-10 h-10 text-nevada object-contain hover:text-redOrange" />
            </a>
            <a href="">
              <FaSquareInstagram className="w-10 h-10 text-nevada object-contain hover:text-redOrange" />
            </a>
          </div>
        </div>
        <div className="pt-10 md:hidden w-full flex justify-center">
          <p className="text-nevada text-p">© Copyright by Salim Fardeheb.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
