import React from "react";
import About from "../images/AboutMe.png";

const AboutMe = () => {
  return (
    <div className="mb-[100px] pt-[100px]">
      <div className="mx-[12%] flex flex-col md:flex-row justify-between items-center gap-6">
        {/* image About Me */}
        <div>
          <img
            src={About}
            alt="About Me Cover"
            className="md:w-[447px] w-[313px] object-contain"
          />
        </div>
        {/* text about me */}
        <div className="gap-5 flex flex-col md:w-1/2">
          <p className=" text-redOrange text-MobileHeader5 md:text-Header5">
            About
          </p>
          <p className="text-MobileHeader2 md:text-Header2">About Me</p>
          <p className=" text-p text-nevada">
            As a master’s student in computer science, my passion for graphic
            design led me to follow various online courses, including web
            design, responsive landing pages and mobile applications. During my
            internships, I had the opportunity to put my skills into practice by
            designing the landing page and application for FlexFret, as well as
            for several other projects.
            <br />
            <br />
            With a solid background in UX/UI design, I am committed to creating
            exceptional user experiences. My passion for design is reflected in
            the design of coherent graphic systems, guaranteeing visual
            aesthetics and optimal functionality. My expertise extends to the
            creation of design systems, ensuring a smooth and harmonious user
            experience through various projects.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
