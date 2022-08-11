import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import RecipeForm from "./components/Recipe/RecipeForm";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const checkIfAuth = localStorage.getItem("isAuth") ? true : false;
  const [isAuth, setIsAuth] = useState(checkIfAuth);

  return (
    <>
      <Navbar auth={isAuth} setAuth={setIsAuth} />
      <Routes>
        <Route path="/recipes" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuth ? <Navigate to="/recipes" /> : <Login setAuth={setIsAuth} />
          }
        />
        <Route path="*" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes/new" element={<RecipeForm />} />
      </Routes>
    </>
  );
};

export default App;
