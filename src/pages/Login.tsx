import React, { useEffect } from "react";
import { auth, provider } from "./../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({
  setAuth,
}: {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  let navigate = useNavigate();
  const loginHandler = () => {
    signInWithPopup(auth, provider).then((result) => {
      setAuth(true);
      localStorage.setItem("isAuth", "true");
      navigate("/");
    });
  };

  return (
    <div className="max-w-6xl mx-auto flex items-center justify-center h-[80vh]">
      <div className="shadow-lg rounded-lg bg-gray-100 p-10 flex flex-col ">
        <h2 className="text-2xl">🍩 Sign in to continue</h2>
        <button
          onClick={loginHandler}
          className="px-6 py-3 mt-4 mx-auto font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
