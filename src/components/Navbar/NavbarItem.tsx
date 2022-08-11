import React from "react";
import { NavLink } from "react-router-dom";

const NavbarItem = ({ href, title }: { href: string; title: string }) => {
  return (
    <li>
      <NavLink className="hover:text-sky-500 font-poppins text-lg" to={href}>
        {title}
      </NavLink>
    </li>
  );
};

export default NavbarItem;