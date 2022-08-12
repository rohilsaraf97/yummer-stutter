import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import useHttp from "../../hooks/use-http";
import { addRecipe } from "../../lib/api";
import LoadingSpinner from "../utils/LoadingSpinner";

interface inputType {
  title: string;
  prepTime: string;
  cookTime: string;
  ingredients: string;
  image: object;
  directions: string;
}

const initialInput: inputType = {
  title: "",
  prepTime: "",
  cookTime: "",
  ingredients: "",
  image: {},
  directions: "",
};

const RecipeForm = () => {
  const [input, setInput] = useState(initialInput);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  const prepChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, prepTime: e.target.value };
    });
  };
  const cookChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, cookTime: e.target.value };
    });
  };
  const ingredientsChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput((prev) => {
      return { ...prev, ingredients: e.target.value };
    });
  };

  const directionsChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput((prev) => {
      return { ...prev, directions: e.target.value };
    });
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      if (e.target.files) return { ...prev, image: e.target.files[0] };
      return { ...prev, image: {} };
    });
  };

  const navigate = useNavigate();
  const { sendRequest, status, data, error } = useHttp(addRecipe);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendRequest({
      ...{
        ...input,
        ingredients: input.ingredients.split("\n"),
        directions: input.directions.split("\n"),
      },
      author: {
        name: auth.currentUser?.displayName,
        uid: auth.currentUser?.uid,
      },
    });
  };

  useEffect(() => {
    if (status === "completed") {
      navigate("/recipes");
    }
  }, [status]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex flex-col bg-white shadow-lg rounded-lg mx-10 overflow-hidden">
        <div className="p-10 bg-blue-50">
          <h1 className=" border-b-black text-3xl font-poppins font-bold  text-center">
            Add your own Recipe!
          </h1>
        </div>
        <div className="lg:mx-auto w-full my-10">
          <form
            onSubmit={submitHandler}
            className="max-w-4xl mx-3 lg:mx-auto flex flex-col"
          >
            <div className="recipeform_input">
              <label htmlFor="title">Recipe Title</label>
              <input
                id="title"
                type="text"
                placeholder="Ex: Sweet Corn Soup"
                value={input.title}
                onChange={titleChangeHandler}
              />
            </div>
            <div className="recipeform_input">
              <label htmlFor="ptime">Preparation Time (minutes)</label>
              <input
                id="ptime"
                type="number"
                placeholder="Ex: 20"
                value={input.prepTime}
                onChange={prepChangeHandler}
              />
            </div>
            <div className="recipeform_input">
              <label htmlFor="ctime">Cooking Time (minutes)</label>
              <input
                id="ctime"
                type="number"
                placeholder="Ex: 40"
                value={input.cookTime}
                onChange={cookChangeHandler}
              />
            </div>
            {/* <div className="recipeform_input">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={imageChangeHandler}
              />
            </div> */}
            <p className="text-sm font-bold font-poppins">
              Add every step in a new line
            </p>
            <div className="recipeform_input">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                id="ingredients"
                placeholder=""
                value={input.ingredients}
                onChange={ingredientsChangeHandler}
              />
            </div>
            <div className="recipeform_input">
              <label htmlFor="steps">Directions</label>
              <textarea
                id="steps"
                placeholder=""
                value={input.directions}
                onChange={directionsChangeHandler}
              />
            </div>
            {status === "pending" ? (
              <div className="max-w-6xl mx-auto my-10 text-center flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <button
                type="submit"
                className="self-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2 mt-10 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Add Recipe
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
