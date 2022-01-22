import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

const NavLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      className={`flex items-center hover:text-violet-700 hover:bg-violet-100 py-2 px-3 rounded-full transition ${
        match ? "text-violet-700 bg-violet-100" : ""
      }`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
