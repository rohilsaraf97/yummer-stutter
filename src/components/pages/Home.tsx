import React from "react";
import Header from "../Home/Header";
import RecipeList from "../Home/RecipeList";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <RecipeList />
    </div>
  );
};

export default Home;
