"use client";
import Card from "@/app/components/ui/cards";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const page = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center items-center lg:py-20 py-48 gap-6 mx-[12%] lg:mx-0">
      <p className="uppercase tracking-[0.15em] text-redOrange text-MobileHeader5 font-Header5 text-center">
        {t.services.tagline}
      </p>
      <div className="flex flex-col justify-center items-center ">
        <p className="text-white text-Header2 flex flex-col-reverse gap-4 text-center leading-tight tracking-wide">
          <span className="text-redOrange md:text-Header5 text-MobileHeader5 mx-4">
            {t.services.subtitle}
          </span>{" "}
          {t.services.title}
        </p>
        <div
          className="flex flex-wrap items-center justify-center mx-[12%] gap-12 my-20 w-full"
          id="services"
        >
          <Card
            icon="/images/Services/Devices.png"
            title={t.services.desktopMobile}
            description={t.services.desktopMobileDesc}
          />
          <Card
            icon="/images/Services/designSystem.png"
            title={t.services.designSystem}
            description={t.services.designSystemDesc}
          />
          <Card
            icon="/images/Services/Figma.png"
            title={t.services.prototype}
            description={t.services.prototypeDesc}
          />
          <Card
            icon="/images/Services/webInterface.png"
            title={t.services.webInterface}
            description={t.services.webInterfaceDesc}
          />
          <Card
            icon="/images/Services/ServerWeb.png"
            title={t.services.serverWeb}
            description={t.services.serverWebDesc}
          />
          <Card
            icon="/images/Services/database.png"
            title={t.services.database}
            description={t.services.databaseDesc}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
