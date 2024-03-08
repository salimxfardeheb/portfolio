import React from "react";
import NavbarDesktop from "./navbar/navbarDesktop";
import NavbarMobile from "./navbar/navbarMobile";
import HeroSection from "./hero-section/heroSection";
import Card from "./cards/cards";
import Professional from "./images/rating-cards/Professional.png"
import Fast from "./images/rating-cards/Fast.png"
import Communication from "./images/rating-cards/Communications.png"


const professionalDescription = "A seasoned professional in my field, I bring expertise and dedication to ensure top-tier work."
const FastDescription = "Swift and efficient, I prioritize timely project delivery without compromising quality."
const CommunicationDescription = "Adept at clear and open communication, I foster collaboration for successful project outcomes."


const App = () => {
  return (
    <>
      <div className="relative">
        <NavbarDesktop />
        <NavbarMobile />
        <HeroSection />
        <div className="flex flex-col md:flex-row mx-[12%] gap-12 absolute top-[90%]">
        <Card icon={Professional} title="Professional" description={professionalDescription}/>
        <Card icon={Fast} title="Fast" description={FastDescription}/>
        <Card icon={Communication} title="Communication" description={CommunicationDescription}/>
        </div>
      </div>
    </>
  );
};

export default App;
