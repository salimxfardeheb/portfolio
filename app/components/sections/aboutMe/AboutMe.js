import React from "react";

const AboutMe = ({ text = "text-black" }) => {
  return (
    <div className="mb-[100px] pt-[100px]" id="about">
      <div className="mx-[12%] flex flex-col md:flex-row justify-between items-center gap-6">
        {/* image About Me */}
        <div>
          <img
            src="/images/profile_picture.png"
            alt="About Me Cover"
            className="md:w-[447px] w-[313px] object-contain"
          />
        </div>
        {/* text about me */}
        <div className="gap-5 flex flex-col md:w-1/2">
          <p className=" text-redOrange text-MobileHeader5 md:text-Header5">
            About
          </p>
          <p className={`text-MobileHeader2 md:text-Header2 ${text}`}>
            About Me
          </p>
          <p className="aboutme_text">
            I'm 24 years old, computer science graduate with a Master's degree
            and over
            <span>3 years of experiance</span> of in
            <span> UI/UX design</span> and <span>Full-stack development</span>.
            <br />
            <br />
            My passion for graphic design drives me to create stunning, modern,
            and responsive models for websites and mobile applications,
            utilizing <span>UI/UX design</span> principles and{" "}
            <span>design system</span> to ensure seamless and user-friendly
            experiences. As a <span>Full-Stack developer</span>, I specialize in
            turning into fully functional, modern, and responsive
            websites—whether static or dynamic. My approach shaped by experience
            focuses on <span>Code optimization</span> and efficient delivery to
            ensure <span>high-quality result in a timely manner</span>.
            <br />
            <br />
            Turn your vision into an exceptional digital experience: modern,
            responsive, and tailor-made websites where every detail is crafted
            to combine performance, aesthetics, and speed. Your project, in the
            right hands, becomes a reality that leaves a lasting impression.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
