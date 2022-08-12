import React, { useReducer } from "react";
import AuthContext from "./auth-context";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const defaultAuthState = localStorage.getItem("isAuth") ? true : false;

const loginUser = async () => {
  await signInWithPopup(auth, provider);
};

const authReducer = (state, action) => {
  if (action.type === "LOGIN_ERROR") {
    return false;
  }
  if (action.type === "LOGIN_SUCCESS") {
    return true;
  }
  if (action.type === "LOGOUT") {
    signOut(auth).then(() => {
      localStorage.clear();
    });
    return false;
  }
  return defaultAuthState;
};

const AuthContextProvider = (props) => {
  const [authState, dispatch] = useReducer(authReducer, defaultAuthState);

  const logInHandler = async () => {
    try {
      await loginUser();
      dispatch({ type: "LOGIN_SUCCESS" });
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
    }
  };

  const logOutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  const authContext = {
    auth: authState,
    logIn: logInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
