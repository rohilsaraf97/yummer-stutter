import React from "react";
import NavbarList from "./NavbarList";

const Navbar = ({
  auth,
  setAuth,
}: {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 supports-backdrop-blur:bg-white/95">
      <NavbarList isAuth={auth} setAuth={setAuth} />
    </div>
  );
};

export default Navbar;
