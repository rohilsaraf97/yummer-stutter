import React from "react";
import NavbarList from "./NavbarList";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur-md flex-none transition-colors duration-500 lg:z-50 supports-backdrop-blur:bg-white/95">
      <NavbarList />
    </div>
  );
};

export default Navbar;
