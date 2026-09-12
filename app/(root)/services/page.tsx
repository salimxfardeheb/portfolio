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
  FaArrowRight,
} from "react-icons/fa";

const page = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center items-center pt-28 pb-16 md:py-20 gap-6 mx-5 sm:mx-[8%] md:mx-[12%] lg:mx-0">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="uppercase tracking-[0.15em] text-redOrange text-MobileHeader5 font-Header5 text-balance">
          {t.services.tagline}
        </p>
        <h1 className="text-white text-MobileHeader2 font-MobileHeader2 md:text-Header2 md:font-Header2 leading-tight">
          {t.services.title}
        </h1>
        <p className="text-white/60 text-p max-w-xl leading-relaxed">
          {t.services.subtitle}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 my-10 md:my-20 w-full max-w-6xl mx-auto"
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

        <ScrollLink to="contact" smooth={true} duration={600} offset={-80} className="w-full sm:w-fit">
          <button className="btn-primary group w-full sm:w-auto">
            {t.footer.contactLabel}
            <FaArrowRight className="group-hover:translate-x-1 duration-200" />
          </button>
        </ScrollLink>
      </div>
    </div>
  );
};

export default page;
