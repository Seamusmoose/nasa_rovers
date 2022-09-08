import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import MarsRover from "../components/MarsRover";
import MarsWeather from "../components/MarsWeather";

export default function Home({}) {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <NavBar setIsShow={setIsShow} />

      <Layout>
        <div className="content__container">
          <MarsRover />
        </div>

        <div
          className={
            isShow ? "sidebar__container--expand" : "sidebar__container"
          }
        >
          <button onClick={() => setIsShow(false)}>close</button>

          <div className="weather__container">{<MarsWeather />}</div>
        </div>
      </Layout>
    </>
  );
}
