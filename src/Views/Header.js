import React from "react";

import { NavLink } from "react-router-dom";
import routers from "../routes"
import style from "../Style/header.module.css";
// https://igormazur78-goit-react-hw-04-movies.netlify.app/
const Navigation = () => {
  return (
    <ul className={style.ListNavigation}>
      <li>
        <NavLink
          exact
          to={routers.home}
          className={style.ItemNavigation}
          activeClassName={style.activeItemNavigation}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={style.ItemNavigation}
          to={routers.movies}
          activeClassName={style.activeItemNavigation}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};
export default Navigation;
