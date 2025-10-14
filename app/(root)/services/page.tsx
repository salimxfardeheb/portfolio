import Card from "@/app/components/ui/cards";
import { descriptionFullstack, descriptionServices } from "@/app/variables";
import React from "react";

const page = () => {
  return (
      <div className="flex flex-col justify-center items-center lg:py-20 py-48 gap-6 mx-[12%] lg:mx-0">
        <p className="uppercase tracking-[0.15em] text-redOrange text-MobileHeader5 font-Header5 text-center">
          DEVELOPPE YOPUR WEBSITE FROM ZERO TO HERO
        </p>
        <div className="flex flex-col justify-center items-center ">
          <p className="text-white text-Header2 flex flex-col-reverse gap-4 text-center leading-tight tracking-wide">
            <span className="text-redOrange md:text-Header5 text-MobileHeader5 mx-4">Dive into these cards to explore what I can build for you</span> Web Developer
          </p>
          <div
            className="flex flex-wrap items-center justify-center mx-[12%] gap-12 my-20 w-full"
            id="services"
          >
            <Card
              icon="/images/Services/Devices.png"
              title="Desktop & Mobile Screens"
              description={descriptionServices[0]}
            />
            <Card
              icon="/images/Services/designSystem.png"
              title="Design System"
              description={descriptionServices[1]}
            />
            <Card
              icon="/images/Services/Figma.png"
              title="Figma & adobe XD Prototype"
              description={descriptionServices[2]}
            />
            <Card
            icon="/images/Services/webInterface.png"
            title="Creating website interface"
            description={descriptionFullstack[0]}
          />
          <Card
            icon="/images/Services/ServerWeb.png"
            title="Server web"
            description={descriptionFullstack[1]}
          />
          <Card
            icon="/images/Services/database.png"
            title="Database optimized"
            description={descriptionFullstack[2]}
          />
          </div>
        </div>
      </div>
  );
};

export default page;
