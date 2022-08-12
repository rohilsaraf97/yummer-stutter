import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { deleteRecipeById, getRecipeById } from "../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../utils/LoadingSpinner";
import AuthContext from "../../store/Auth/auth-context";
import { auth } from "../../config/firebase";

const cheesecake = require("../../assets/cheesecake.jpg");

const Recipe = () => {
  const { sendRequest, status, data, error } = useHttp(getRecipeById, true);
  const params = useParams();
  const navigate = useNavigate();
  const {
    sendRequest: sendDeleteRequest,
    status: DeleteStatus,
    data: DeleteData,
    error: DeleteError,
  } = useHttp(deleteRecipeById);

  useEffect(() => {
    sendRequest(params.id);
  }, []);

  const foundRecipe = data;

  const authCtx = useContext(AuthContext);

  const editHandler = async (id: string) => {
    navigate(`/updaterecipe/${id}`);
  };

  const deleteHandler = async (id: string) => {
    await sendDeleteRequest(id);
    navigate("/");
  };
  return status === "pending" ? (
    <div className="max-w-6xl mx-auto my-10 text-center flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-6xl mx-10 my-10 rounded-lg shadow-md overflow-hidden bg-white">
        <img
          src={cheesecake}
          alt=""
          className="max-h-[60vh] w-full object-cover"
        />
        <div className=" p-10 pb-0 flex flex-col gap-4">
          <h2 className="text-4xl font-bold font-poppins ">
            {foundRecipe.title}
          </h2>
          <div className="flex justify-between">
            <p className="text-md font-bold font-poppins w-fit">
              Recipe by {foundRecipe.author.name}
            </p>
            <div className="flex flex-col">
              <p className="ml-auto w-fit">
                <span className="text-gray-400 italic">
                  Prep Time: {foundRecipe.prepTime} mins
                </span>
              </p>
              <p className="ml-auto w-fit">
                <span className="text-gray-400 italic">
                  Cook Time: {foundRecipe.cookTime} mins
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 p-10 ">
          <div className="col-span-4">
            <h2 className="text-2xl font-poppins mb-3">Directions</h2>
            <ol className="list-inside list-decimal space-y-5">
              {foundRecipe.directions.map(
                (direction: string, index: number) => {
                  return <li key={index}>{direction}</li>;
                }
              )}
            </ol>
            <h2 className="text-xl font-poppins my-3">
              {foundRecipe.title} is ready!
            </h2>
          </div>
          <div className="col-span-2 self-start sticky top-10 ml-6 bg-blue-50 px-4 py-2 rounded-md shadow-md">
            <h2 className="text-2xl font-poppins ">Ingredients</h2>
            <ol className="list-inside list-disc">
              {foundRecipe.ingredients.map(
                (direction: string, index: number) => {
                  return <li key={index}>{direction}</li>;
                }
              )}
            </ol>
          </div>
        </div>
        {authCtx.auth && auth?.currentUser?.uid === foundRecipe.author.uid && (
          <div className="flex gap-3 p-10 items-center justify-end">
            <button
              className="rounded-md text-white font-poppins px-3 py-2 bg-red-500"
              onClick={() => deleteHandler(foundRecipe.id)}
            >
              Delete Recipe
            </button>
            <button
              className="rounded-md text-white font-poppins px-3 py-2 bg-blue-500"
              onClick={() => editHandler(foundRecipe.id)}
            >
              Edit Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
