'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { menuItems } from "@/app/variables";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageServer, setMessageServer] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("operationSuccess") === "true") {
      setSuccess(true);
      localStorage.removeItem("operationSuccess");
    }
  }, []);

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
  };

  const values = { name, email, message };
  const api_url = "https://portfolio-l4ki.onrender.com"

  const sendMail = () => {
    axios
      .post(`${api_url}/send`, values)
      .then((res) => {
        console.log("Success!");

        setName("");
        setEmail("");
        setMessage("");

        localStorage.setItem("operationSuccess", "true");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="bg-black py-24 flex flex-col md:gap-24 gap-12">
      <div className="mx-[12%] flex flex-col gap-6" id="contact">
        <div>
          <p className="md:text-Header5 text-MobileHeader5 text-redOrange">
            Contact Me
          </p>
          <p className="md:text-Header2 text-MobileHeader2 text-white">
            Work Inquiry
          </p>
        </div>

        {success && (
          <p className="text-green-500 font-semibold">
            ✅ Votre message a été envoyé avec succès !
          </p>
        )}

        <form method="post" onSubmit={handleSubmit}>
          <div className="input-group flex flex-col gap-6 text-white">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="inputContact"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="inputContact"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              name="message"
              cols={30}
              rows={10}
              className="inputContact"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="button"
              className="bg-redOrange py-3 hover:opacity-90 duration-150"
              onClick={sendMail}
            >
              Send Your Message
            </button>
          </div>
        </form>
      </div>

      <div className="mx-[17%]">
        <ul className="text-white flex flex-col md:flex-row md:justify-around items-center text-Header5 border-y-2 border-nevada md:py-12 gap-6 py-5 mx-[25%] md:mx-auto">
          {menuItems.map((data) => (
            <li key={data.id} className="hover:text-redOrange">
              <Link href={data.link}>{data.name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center md:mt-[100px] mt-12">
          <img
            src="/images/logo-SF.png"
            alt="Logo"
            className="md:w-[120px] w-[64.15px] object-contain"
          />
          <p className="hidden md:block copyRight">© Copyright by Salim Fardeheb.</p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/salimxfardeheb13/">
              <FaFacebookSquare className="socialMedia" />
            </a>
            <a href="https://www.linkedin.com/in/salim-fardeheb-ba6060256/">
              <FaLinkedin className="socialMedia" />
            </a>
            <a href="https://x.com/salimxfardeheb">
              <FaSquareXTwitter className="socialMedia" />
            </a>
            <a href="https://www.instagram.com/salimsdev">
              <FaSquareInstagram className="socialMedia" />
            </a>
          </div>
        </div>

        <div className="pt-10 md:hidden w-full flex justify-center">
          <p className="copyRight">© Copyright by Salim Fardeheb.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
