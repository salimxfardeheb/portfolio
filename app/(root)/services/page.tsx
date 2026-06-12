"use client";
import Card from "@/app/components/ui/cards";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Link as ScrollLink } from "react-scroll";
import {
  FaBrain,
  FaCloudUploadAlt,
  FaShoppingCart,
  FaMobileAlt,
  FaFigma,
  FaCode,
  FaServer,
  FaDatabase,
  FaPlug,
} from "react-icons/fa";

const page = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center items-center lg:py-20 py-48 gap-6 mx-[12%] lg:mx-0">
      <p className="uppercase tracking-[0.15em] text-redOrange text-MobileHeader5 font-Header5 text-center">
        {t.services.tagline}
      </p>
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-white text-Header2 flex flex-col-reverse gap-4 text-center leading-tight tracking-wide">
          <span className="text-redOrange md:text-Header5 text-MobileHeader5 mx-4">
            {t.services.subtitle}
          </span>{" "}
          {t.services.title}
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-20 w-full max-w-6xl mx-auto"
          id="services"
        >
          <Card
            icon={<FaMobileAlt />}
            title={t.services.desktopMobile}
            description={t.services.desktopMobileDesc}
            color="blue"
          />
          <Card
            icon={<FaFigma />}
            title={t.services.prototype}
            description={t.services.prototypeDesc}
            color="pink"
          />
          <Card
            icon={<FaCode />}
            title={t.services.webInterface}
            description={t.services.webInterfaceDesc}
            color="cyan"
          />
          <Card
            icon={<FaServer />}
            title={t.services.serverWeb}
            description={t.services.serverWebDesc}
            color="indigo"
          />
          <Card
            icon={<FaDatabase />}
            title={t.services.database}
            description={t.services.databaseDesc}
            color="yellow"
          />
          <Card
            icon={<FaPlug />}
            title={t.services.api}
            description={t.services.apiDesc}
            color="orange"
          />
          <Card
            icon={<FaBrain />}
            title={t.services.aiMl}
            description={t.services.aiMlDesc}
            color="purple"
          />
          <Card
            icon={<FaCloudUploadAlt />}
            title={t.services.deployment}
            description={t.services.deploymentDesc}
            color="redOrange"
          />
          <Card
            icon={<FaShoppingCart />}
            title={t.services.ecommerce}
            description={t.services.ecommerceDesc}
            color="green"
          />
        </div>

        <ScrollLink to="contact" smooth={true} duration={600} offset={-80} className="w-fit">
          <button className="px-9 py-5 text-white text-MobileHeader4 border-2 hover:bg-redOrange hover:scale-105 duration-200">
            {t.footer.contactLabel}
          </button>
        </ScrollLink>
      </div>
    </div>
  );
};

export default page;
