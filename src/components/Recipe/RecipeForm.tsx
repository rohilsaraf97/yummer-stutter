import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import useHttp from "../../hooks/use-http";
import { addRecipe, editRecipeById } from "../../lib/api";
import LoadingSpinner from "../utils/LoadingSpinner";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./../../config/firebase";

interface inputType {
  id?: string;
  title: string;
  prepTime: string;
  cookTime: string;
  ingredients: string;
  image: string;
  directions: string;
}

const RecipeForm = ({
  update,
  recipe,
}: {
  update: boolean;
  recipe: inputType;
}) => {
  const [input, setInput] = useState(recipe);
  const [enabled, setEnabled] = useState(true);

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

  const imageChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files) file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setEnabled(false);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);
          setInput((prev) => {
            return { ...prev, image: url };
          });
          setEnabled(true);
        });
      }
    );
  };

  const navigate = useNavigate();
  const { sendRequest, status, data, error } = useHttp(addRecipe);

  const { sendRequest: sendEditRequest, status: editStatus } =
    useHttp(editRecipeById);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (update) {
      console.log("insubmit handler");
      console.log({
        id: recipe.id,
        data: {
          ...{
            ...input,
            ingredients: input.ingredients.split("\n"),
            directions: input.directions.split("\n"),
          },
          author: {
            name: auth.currentUser?.displayName,
            uid: auth.currentUser?.uid,
          },
        },
      });

      sendEditRequest({
        id: input.id,
        data: {
          ...{
            ...input,
            ingredients: input.ingredients.split("\n"),
            directions: input.directions.split("\n"),
          },
          author: {
            name: auth.currentUser?.displayName,
            uid: auth.currentUser?.uid,
          },
        },
      });
    } else
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
    if (status === "completed" || editStatus === "completed") {
      navigate("/recipes");
    }
  }, [status, editStatus]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex flex-col bg-white shadow-lg rounded-lg mx-10 overflow-hidden">
        <div className="p-10 bg-blue-50">
          <h1 className=" border-b-black text-3xl font-poppins font-bold  text-center">
            {update ? "Update your" : "Add your own"} Recipe!
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
                required
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
                required
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
                required
              />
            </div>
            <div className="recipeform_input">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={imageChangeHandler}
              />
            </div>
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
                required
              />
            </div>
            <div className="recipeform_input">
              <label htmlFor="steps">Directions</label>
              <textarea
                id="steps"
                placeholder=""
                value={input.directions}
                onChange={directionsChangeHandler}
                required
              />
            </div>
            {status === "pending" || editStatus === "pending" ? (
              <div className="max-w-6xl mx-auto my-10 text-center flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <button
                type="submit"
                className={`${
                  !enabled &&
                  "bg-gray-700 cursor-not-allowed hover:bg-bg-gray-700"
                } self-center text-white border border-sky-200 bg-sky-500 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2 mt-10`}
                disabled={!enabled}
              >
                {update ? "Update" : "Add"} Recipe
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
