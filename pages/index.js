import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import MarsRover from "../components/MarsRover";
import MarsWeather from "../components/MarsWeather";
import Navigator from "../components/Navigator";
import { DayPicker, DayClickEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import RoverCard from "../components/RoverCard";
import styles from "../styles/index.module.css";
import addDays from "date-fns/addDays";

export default function Home() {
  const currentRovers = ["Curiosity", "Opportunity", "Spirit", "Perseverance"];
  const [selectedRover, selectedRoverSet] = useState(currentRovers[0]);

  const [earthDate, earthDateSet] = useState();
  const [manifestsData, manifestsDataSet] = useState();

  useEffect(() => {
    async function handleAsync() {
      if (typeof selectedRover === "undefined") {
        return;
      }

      const res = await fetch(`/api/manifests?rover=${selectedRover}`);

      if (!res.ok) {
        console.error(await res.json());
        return;
      }

      const data = await res.json();

      const { photos, max_date } = data.photo_manifest;

      earthDateSet(max_date);

      const latestPhotoManifest = photos[photos.length - 1];

      manifestsDataSet(latestPhotoManifest);
    }
    handleAsync();
  }, [selectedRover]);

  const [selectedCamera, selectedCameraSet] = useState("");
  const [availableCameras, availableCamerasSet] = useState([]);

  const [roverData, setRoverData] = useState([]);

  useEffect(() => {
    async function handleAsync() {
      if (typeof earthDate === "undefined" || earthDate === "") {
        return;
      }

      const res = await fetch(
        `/api/rovers?rover=${selectedRover}&earth_date=${earthDate}`
      );

      if (!res.ok) {
        console.error(await res.json());
        return;
      }

      const { photos } = await res.json();

      const availableCameras = photos.map((i) => i.camera.name);
      const uniqueAvailableCameras = [...new Set(availableCameras)];

      availableCamerasSet(uniqueAvailableCameras);
      selectedCameraSet(uniqueAvailableCameras[0]);
      earthDateSet(earthDate);

      setRoverData(photos);
    }
    handleAsync();
  }, [selectedRover, earthDate]);

  const getRoverDateMin = () => {
    switch (selectedRover) {
      case "Curiosity":
        return "2012-08-06";
      case "Opportunity":
        return "2004-01-26";
      case "Spirit":
        return "2004-01-05";
      default:
        return "2012-08-06";
    }
  };

  const [earthDateforCalendar, setearthDateforCalendar] = useState();

  useEffect(() => {
    async function handleAsync() {
      if (
        typeof manifestsData?.earth_date === "undefined" ||
        manifestsData?.earth_date === NaN
      ) {
        return;
      }
      const initialDate = new Date(manifestsData?.earth_date);
      const nextDate = new Date(manifestsData?.earth_date).setDate(
        initialDate.getDate() + 1
      );

      const earthDateAmended = new Date(nextDate).toISOString().slice(0, 10);

      setearthDateforCalendar(earthDateAmended);
    }
    handleAsync();
  }, [manifestsData?.earth_date]);

  console.log(earthDateforCalendar);

  const getRoverDateMax = () => {
    switch (selectedRover) {
      case "Curiosity":
        return earthDateforCalendar || new Date().toISOString().slice(0, 10);
      case "Opportunity":
        return "2018-06-11";
      case "Spirit":
        return "2010-03-22";
      default:
        return earthDateforCalendar || new Date().toISOString().slice(0, 10);
    }
  };

  const handleDayClick = (day) => {
    const localConversion = new Date(
      day.getTime() - day.getTimezoneOffset() * 60000
    );
    setSelectedDay(localConversion.toISOString().slice(0, 10));
    earthDateSet(localConversion.toISOString().slice(0, 10));
  };

  // console.log(new Date(getRoverDateMax()), "g");

  const disabledDays = [
    {
      from: new Date(-8640000000000000),
      to: new Date(getRoverDateMin()),
    },
    {
      from: new Date(getRoverDateMax()),
      to: new Date(`December 22, 9999 04:00:00`),
    },
  ];

  const dataForRender = [
    ...roverData.filter((el) => el.camera.name === selectedCamera),
  ];

  const currentPropsDate = new Date(earthDate);
  const [month, setMonth] = useState();
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    setMonth(currentPropsDate);
  }, [earthDate]);

  const [scrolle, setScrolle] = useState(0);
  const [fix, setFix] = useState(false);

  const handleScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrolle(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fix]);

  if (typeof window !== "undefined") {
    const setFixedSidebar = () =>
      window.scrollY >= 400 ? setFix(true) : setFix(false);

    window.addEventListener("scroll", setFixedSidebar);
  }

  return (
    <Layout>
      <div
        className={
          fix
            ? " flex center weather_container w-fixed"
            : " flex center weather_container"
        }
      >
        <MarsWeather />
      </div>

      <div className="flex responsive-col">
        <div
          id="content"
          className={fix ? "flex sidebar fixed row" : "flex sidebar row"}
        >
          <Navigator
            selectedRover={selectedRover}
            selectedRoverSet={selectedRoverSet}
            currentRovers={currentRovers}
            selectedCamera={selectedCamera}
            availableCameras={availableCameras}
            selectedCameraSet={selectedCameraSet}
            handleDayClick={handleDayClick}
            disabledDays={disabledDays}
            month={month}
            setMonth={setMonth}
            scrolle={scrolle}
          />
        </div>

        <div onScroll={handleScroll} className="grow-two light-1">
          <MarsRover dataForRender={dataForRender} />
        </div>
      </div>
    </Layout>
  );
}
