import React, { useState, useEffect } from "react";

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
            return (
              <ul key={id} className="weather-item">
                <li> {terrestrial_date}</li>
                <li> {sol}</li>
                <li> {min_temp}</li>
                <li> {max_temp}</li>
                <li> {sunrise}</li>
                <li> {sunset}</li>
              </ul>
            );
          }
        )
      )}
    </>
  );
};

export default MarsWeather;
