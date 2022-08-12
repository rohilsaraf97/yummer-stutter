import RecipeForm from "../Recipe/RecipeForm";

const initialInput = {
  id: "01",
  title: "",
  prepTime: "",
  cookTime: "",
  ingredients: "",
  image: "",
  directions: "",
};

const AddRecipe = () => {
  return <RecipeForm update={false} recipe={initialInput} />;
};

export default AddRecipe;
