import React from "react";

import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import NavSearch from "./NavSearch";
import NavBasket from "./NavBasket";
import NavUser from "./NavUser";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item nav__item--logo">
          <NavLogo />
        </li>
        <li className="nav__item nav__item--menu">
          <NavMenu />
        </li>
        <li className="nav__item nav__item--search">
          <NavSearch />
        </li>
        <li className="nav__item nav__item--search">
          <NavBasket />
        </li>
        <li className="nav__item nav__item--user">
          <NavUser />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
