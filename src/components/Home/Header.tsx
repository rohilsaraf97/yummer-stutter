import React from "react";

const cheesecakeImage = require("./../../assets/cheesecake.jpg");

const Header = () => {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-stretch my-10 mx-10 align-start rounded-lg shadow-lg overflow-hidden ">
        <div>
          <img src={cheesecakeImage} alt="" />
        </div>
        <div className="bg-sky-100 p-4 flex flex-col justify-center gap-2 lg:max-w-[40%]">
          <p className="italic text-sm">Lorem ipsum dolor sit amet</p>
          <h2 className="font-poppins text-3xl font-bold">
            Lorem, ipsum dolor sit amet consectetur adipisicin
          </h2>
          <div className="text-md">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
              voluptates? Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
