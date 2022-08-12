import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { getRecipes } from "../../lib/api";
import LoadingSpinner from "../utils/LoadingSpinner";
import RecipeCard from "./RecipeCard";
import SearchInput from "./SearchInput";
const cheesecakeImage = require("./../../assets/cheesecake.jpg");

const RecipeList = () => {
  const { sendRequest, status, data, error } = useHttp(getRecipes, true);
  const [recipes, setRecipes] = useState([]);
  const orgData = data;
  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    if (status === "completed") setRecipes(data);
  }, [status]);

  const searchList = (query: string): void => {
    const words = query.split(" ");
    setRecipes((prev) => {
      return data.filter((recipe: any) => {
        return (
          words.some((word) =>
            recipe.title.toLowerCase().includes(word.toLowerCase())
          ) ||
          words.some((word) =>
            recipe.ingredients
              .join(" ")
              .toLowerCase()
              .includes(word.toLowerCase())
          )
        );
      });
    });
  };

  const showAllHandler = () => {
    setRecipes(data);
  };

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
      <SearchInput onSubmit={searchList} onShowAll={showAllHandler} />
      {recipes.length > 0 ? (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-9 mx-10">
          {recipes.map((recipe: any) => {
            return <RecipeCard recipe={{ ...recipe }} key={recipe.id} />;
          })}
        </div>
      ) : (
        <div className="">
          <h2 className="text-3xl font-poppins font-bold text-center p-10 my-10">
            Sorry! No recipes to show. 😔
          </h2>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
