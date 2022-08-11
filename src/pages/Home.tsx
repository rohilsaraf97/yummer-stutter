import React from "react";
import Header from "../components/Home/Header";
import RecipeList from "../components/Home/RecipeList";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <RecipeList />
    </div>
  );
};

export default Home;
