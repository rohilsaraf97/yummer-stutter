import React, { createContext } from "react";

const AuthContext = createContext({
  auth: false,
  logIn: () => {},
  logOut: () => {},
});

export default AuthContext;
