import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { getRecipes } from "../../lib/api";
import LoadingSpinner from "../LoadingSpinner";
import RecipeCard from "./RecipeCard";
const cheesecakeImage = require("./../../assets/cheesecake.jpg");

const RecipeList = () => {
  const { sendRequest, status, data, error } = useHttp(getRecipes, true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    sendRequest();
  }, []);

  console.log(data);

  return status === "pending" ? (
    <div className="max-w-6xl mx-auto my-10 text-center flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="max-w-6xl mx-auto">
      <div>
        <h2 className="text-4xl text-center font-curvy font-bold mx-10 my-[3rem]">
          Delicacy Discovery!
        </h2>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-9 mx-10">
        {data.map((recipe: any) => {
          return (
            <RecipeCard
              title={recipe.title}
              duration={recipe.cookTime}
              image={cheesecakeImage}
              author={recipe.author.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecipeList;
