import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cel from "../public/9254126_celcius_temprature_degrees_celsius_thermometer_icon.svg";
import Earth from "../public/1715795_earth_planet_space_icon.svg";
import Mars from "../public/1715796_mars_planet_space_icon.svg";
import Sunrise from "../public/1530387_weather_morning_sun_sunrise_icon.svg";
import Sunset from "../public/1530384_weather_evening_sun_sunset_icon.svg";

const MarsWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const res = await fetch(`/api/weatherAPI`);

      if (!res.ok) {
        console.error(await res.json());
        return;
      }

      const data = await res.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  return (
    <>
      {/* <h1>Last recorded Mars Weather with Curiosty Rover</h1> */}

      {weatherData.length === 0 ? (
        <h1>...Loading</h1>
      ) : (
        weatherData.map(
          ({
            id,
            sol,
            terrestrial_date,
            season,
            min_temp,
            max_temp,
            pressure,
            wind_speed,
            wind_direction,
            atmo_opacity,
            sunrise,
            sunset,
            min_gts_temp,
            max_gts_temp,
          }) => {
            const convertedDate = new Date(terrestrial_date)
              .toUTCString()
              .split(" ")
              .map((i) => i)
              .slice(0, 4)
              .join(" ");

            return (
              <div key={id} className="weather-item">
                <div className="flex space-between onMediaSpace">
                  {convertedDate}
                  <Image src={Earth} width="50px" height="50px" />
                </div>
                <div className="flex space-between">
                  {sol} <Image src={Mars} width="30px" height="30px" />
                </div>
                <div className="flex space-between pad-right1">
                  {min_temp} <Image src={Cel} width="20px" height="20px" />
                </div>
                <div className="flex space-between pad-right1">
                  {max_temp} <Image src={Cel} width="20px" height="20px" />
                </div>
                <div className="flex space-between">
                  {sunrise} <Image src={Sunrise} width="40px" height="40px" />
                </div>
                <div className="flex space-between">
                  {sunset} <Image src={Sunset} width="40px" height="40px" />
                </div>
              </div>
            );
          }
        )
      )}
    </>
  );
};

export default MarsWeather;
