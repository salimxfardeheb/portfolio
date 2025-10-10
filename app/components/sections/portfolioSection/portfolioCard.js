import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion as m } from "framer-motion";

const portfolioCard = ({ Job }) => {
  const [itemsPortfolio, setItemsPortfolio] = useState([]);
  const apiUrl = "https://portfolio-l4ki.onrender.com";

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const response = await axios.get(`${apiUrl}/portfolio`);
        console.log("data imported succesfully !");
        setItemsPortfolio(response.data);
      } catch (error) {
        console.error("failed import data ! \nerror : ", error);
      }
    };
    getPortfolio();
  }, []);

  return (
    <div className="bg-black flex flex-col justify-center items-center gap-24 md:pt-56 py-28 px-[12%] md:px-[8%]">
      <div className="flex flex-col justify-center items-center gap-5 text-center md:w-1/2">
        <p className="text-redOrange text-MobileHeader5 md:text-Header5">
          My Works
        </p>
        <p className="text-white text-MobileHeader2 md:text-Header2">{Job}</p>
      </div>
      <div className="flex flex-wrap justify-around gap-y-20 w-full">
        {itemsPortfolio.map((data) =>
          (data.type_dev && Job == "Full-Stack Developer") ||
          (data.type_design && Job == "UI & UX Designer") ? (
            <div key={data.id} className="flex flex-col gap-4 md:gap-10">
              <m.img src={data.image} alt={data.title} className="min-w-xl" />
              <p className="text-white text-Header4">{data.title}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default portfolioCard;
