import React from "react";

const toolkit = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 my-14 md:my-28">
      <div className="gap-5 flex flex-col md:w-1/2 justify-center items-center">
        <p className=" text-redOrange text-MobileHeader5 md:text-Header5">
          Workspace
        </p>
        <p className="text-MobileHeader2 md:text-Header2">My ToolKit</p>
      </div>
      <div className="toolkit">
        <img src="/images/toolkit/tailwind.png" />
        <img src="/images/toolkit/figma.png" />
        <img src="/images/toolkit/nodejs.png" />
        <img src="/images/toolkit/typescript.png" />
        <img src="/images/toolkit/git.png" />
        <img src="/images/toolkit/react.png" />
        <img src="/images/toolkit/nextjs.png" />
      </div>
      <div className="flex flex-col gap-7 md:hidden">
        <div className="toolkit_mobile">
          <img src="/images/toolkit/figma.png" />
          <img src="/images/toolkit/tailwind.png" />
          <img src="/images/toolkit/react.png" />
        </div>
        <div className="toolkit_mobile">
          <img src="/images/toolkit/nodejs.png" />
          <img src="/images/toolkit/git.png" />
          <img src="/images/toolkit/typescript.png" />
          <img src="/images/toolkit/nextjs.png" />
        </div>
      </div>
    </div>
  );
};

export default toolkit;
