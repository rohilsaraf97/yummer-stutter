import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AddRecipe from "./components/pages/AddRecipe";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import RecipeDetail from "./components/pages/RecipeDetail";
import PrivateRoutes from "./PrivateRoutes";
import AuthContext from "./store/Auth/auth-context";
import UpdateRecipe from "./components/pages/UpdateRecipe";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/recipes" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route
          path="/login"
          element={authCtx.auth ? <Navigate to="/recipes" /> : <Login />}
        />
        <Route element={<PrivateRoutes isAuth={authCtx.auth} />}>
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/updaterecipe/:id" element={<UpdateRecipe />} />
        </Route>
        <Route path="*" element={<Navigate to="/recipes" replace />} />
      </Routes>
    </>
  );
};

export default App;
