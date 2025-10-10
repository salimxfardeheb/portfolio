'use client'
import React, { useState } from "react";
import { menuItems } from "@/app/variables";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { sendEmail } from "@/app/utils/send-email";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success } = await sendEmail({ name, email, message });
    setSuccess(success);

    if (success) {
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="bg-black py-24 flex flex-col md:gap-24 gap-12" id="contact">
      <div className="mx-[12%] flex flex-col gap-6">
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

        <form onSubmit={handleSubmit}>
          <div className="input-group flex flex-col gap-6 text-white">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="inputContact"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="inputContact"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              name="message"
              cols={30}
              rows={10}
              className="inputContact"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-redOrange py-3 hover:opacity-90 duration-150"
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
          <p className="hidden md:block copyRight">
            © Copyright by Salim Fardeheb.
          </p>
          <div className="flex gap-8">
            <a
              href="https://github.com/salimxfardeheb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="socialMedia" />
            </a>
            <a
              href="https://www.linkedin.com/in/salim-fardeheb-ba6060256/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="socialMedia" />
            </a>
            <a
              href="https://wa.me/213670668790?text=Bonjour%20Salim%2C%20je%20souhaite%20plus%20d'informations"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="socialMedia" />
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
