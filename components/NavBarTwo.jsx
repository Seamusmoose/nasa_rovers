import React from "react";
import MarsRover from "./MarsRover";
import MarsWeather from "./MarsWeather";
import Home from "./Navigator";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

const NavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <Link href="/">
          <a className={styles.nav_buttons}>Home</a>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
