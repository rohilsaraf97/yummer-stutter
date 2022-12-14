import React from "react";
import { Link } from "react-router-dom";

interface recipeObj {
  id: string;
  title: string;
  cookTime: string;
  prepTime: string;
  image: any;
  author: {
    name: string;
    uid: string;
  };
}

const RecipeCard = ({ recipe }: { recipe: recipeObj }) => {
  return (
    <div className="flex flex-col rounded-md shadow-md overflow-hidden md:basis-[47.5%] lg:basis-[31%] mb-10 cursor-pointer hover:text-sky-500 hover:scale-105 transition-all ease-linear duration-100 justify-between">
      <Link to={`/recipe/${recipe.id}`}>
        <img
          src={recipe.image}
          alt=""
          className="object-fill lg:h-[18vw] md:h-[34vw]"
        />
        <div className="bg-white px-3 py-4 space-y-3 h-[30%]">
          <h2 className="font-poppins font-bold text-lg">
            {recipe.title.substring(0, 31)}
            {recipe.title.length > 31 && "..."}
          </h2>
          <div className="flex">
            <p className="m w-fit">By {recipe.author.name}</p>
            <p className="ml-auto w-fit">
              🕑{" "}
              <span className="text-gray-400 italic">
                {" "}
                {recipe.cookTime} mins
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
