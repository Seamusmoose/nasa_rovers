import React, { useState, useEffect } from "react";


const MarsWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  console.log(weatherData, "asdfasfas");

  useEffect(() => {
    const fetchWeatherData = async () => {
     const res = await fetch(`/api/puppeteer`)   
     const data = await res.json()
        setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  let weatherDataResult = [];

  weatherData.forEach((item) => {
    weatherDataResult.push([...Object.entries(item)]);
  });



  return (
    <>
      {/* <h1>Last recorded Mars Weather with Curiosty Rover</h1> */}

      {weatherData.length === 0 ? (
        <h1>...Loading</h1>
      ) : (
        weatherDataResult.map((item, i) => {
          return (
            <div key={i} className="weather-item">
              <h3>{item[0].join(": ")}</h3>
              <h3>{item[1].join(": ")}</h3>
              <h3>{item[2].join(": ")}</h3>
              <h3>{item[3].join(": ")}</h3>
            </div>
          );
        })
      )}
    </>
  );
};

export default MarsWeather;
