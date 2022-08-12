import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AddRecipe from "./components/pages/AddRecipe";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import AuthContext from "./store/Auth/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/recipes" element={<Home />} />
        <Route
          path="/login"
          element={authCtx.auth ? <Navigate to="/recipes" /> : <Login />}
        />
        <Route element={<PrivateRoutes isAuth={authCtx.auth} />}>
          <Route path="/addrecipe" element={<AddRecipe />} />
        </Route>
        <Route path="*" element={<Navigate to="/recipes" replace />} />
      </Routes>
    </>
  );
};

export default App;
