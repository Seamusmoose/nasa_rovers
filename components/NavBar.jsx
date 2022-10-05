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
        <Link href="/about">
          <a className={styles.nav_buttons}>Rover Camera Specs</a>
        </Link>
        <Link href="#content">
          <a className={styles.nav_buttons}>Images</a>
        </Link>
        <Link href="#weather">
          <a className={styles.nav_buttons}>Weather</a>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
