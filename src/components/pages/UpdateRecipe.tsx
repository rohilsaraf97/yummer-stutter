import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../Recipe/RecipeForm";
import useHttp from "../../hooks/use-http";
import { getRecipeById } from "../../lib/api";
import { auth } from "../../config/firebase";

const UpdateRecipe = () => {
  const { sendRequest, status, data, error } = useHttp(getRecipeById, true);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    sendRequest(params.id);
  }, []);

  useEffect(() => {
    if (status === "completed")
      if (data?.author?.uid !== auth?.currentUser?.uid) {
        navigate("/");
      }
  }, [status]);

  return status === "pending" ? (
    <div>loading</div>
  ) : (
    <RecipeForm
      update={true}
      recipe={{
        ...data,
        ingredients: data.ingredients.join("\n"),
        directions: data.directions.join("\n"),
      }}
    />
  );
};

export default UpdateRecipe;
