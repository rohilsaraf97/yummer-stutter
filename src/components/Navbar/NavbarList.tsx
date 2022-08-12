import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/Auth/auth-context";

const loggedInItems = [
  {
    title: "Recipes",
    href: "/recipes",
  },
  {
    title: "New Recipe",
    href: "/addrecipe",
  },
];

const loggedOutItems = [
  {
    title: "Recipes",
    href: "/recipes",
  },
  {
    title: "Login",
    href: "/login",
  },
];

const NavbarList = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const items = authCtx.auth ? loggedInItems : loggedOutItems;
  const signUserOut = () => {
    authCtx.logOut();
    navigate("/login");
  };
  return (
    <div className="max-w-6xl mx-auto">
      <div className="py-4 border-b  lg:px-8 lg:py-3 lg:border-0 mx-4 lg:mx-3">
        <div className="relative flex items-center">
          <Link className="mr-3 flex-none md:w-auto" to="/">
            <span className="sr-only">Yummybite home page</span>
            <h1 className="font-curvy text-xl lg:text-2xl">
              <span className="text-2xl lg:text-4xl">🍩</span> Yummy bites
            </h1>
          </Link>
          <div className="relative flex items-center ml-auto">
            <nav className="text-sm leading-6 font-semibold text-slate-700">
              <ul className="flex space-x-8">
                {items.map((item, index) => {
                  return (
                    <NavbarItem
                      title={item.title}
                      href={item.href}
                      key={index}
                    />
                  );
                })}
                {authCtx.auth && (
                  <li>
                    <button
                      className="hover:text-sky-500 font-poppins text-lg text-black"
                      onClick={signUserOut}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarList;
