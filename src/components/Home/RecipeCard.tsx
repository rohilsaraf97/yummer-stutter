import React from "react";

const RecipeCard = ({
  title,
  duration,
  image,
  author,
}: {
  title: string;
  duration: number;
  image: any;
  author: string;
}) => {
  return (
    <div className="flex flex-col rounded-md shadow-md overflow-hidden md:basis-[47.5%] lg:basis-[31%] mb-10 cursor-pointer hover:text-sky-500 hover:scale-105 transition-all ease-linear duration-100">
      <img src={image} alt="" />
      <div className="bg-white px-3 py-4 space-y-3">
        <h2 className="font-poppins font-bold text-xl">{title}</h2>
        <div className="flex">
          <p className="m w-fit">By {author}</p>
          <p className="ml-auto w-fit">
            🕑 <span className="text-gray-400 italic"> {duration} mins</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
