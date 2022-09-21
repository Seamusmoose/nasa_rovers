import React from "react";
import MarsRover from "./MarsRover";
import MarsWeather from "./MarsWeather";
import Home from "./Navigator";
import styles from '../styles/navbar.module.css'

const NavBar = () => {
  return (
    <div>
      <ul className={styles.navbar}>
        <li className={styles.navbar__item}>
          <button>eg</button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
