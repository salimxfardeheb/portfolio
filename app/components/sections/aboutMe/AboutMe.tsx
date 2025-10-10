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
          <p className=" text-redOrange text-MobileHeader5 md:text-Header5 font-Header5">
            About
          </p>
          <p className={`text-MobileHeader2 md:text-Header2 lg:font-Header2 font-MobileHeader2 ${text}`}>
            About Me
          </p>
          <p className="aboutme_text">
            I'm 24 years old, computer science graduate with a Master's degree
            and over
            <span> more than 3 years of experiance</span> of in
            <span> UI/UX design</span> and <span>Full-stack development</span>.
            <br />
            <br />
            As a passionate<span> Full-Stack developer</span> , I create modern,
            responsive, and high-performance web applications. I focus on{" "}
            <span>building scalable architectures</span>, writing{" "}
            <span>clean and optimized code</span>, and ensuring{" "}
            <span>
              {" "}
              seamless interaction between front-end and back-end for an
              exceptional user experience
            </span>
            .
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
