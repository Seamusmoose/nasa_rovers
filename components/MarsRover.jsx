import { useState, useEffect, useRef } from "react";
import RoverCard from "./RoverCard";
import { DayPicker, DayClickEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";

const MarsRover = ({ dataForRender }) => {
  const size = 48;

  return (
    <div className="grid">
      {dataForRender.length > 0 ? (
        dataForRender
          .slice(0, size)
          .map(({ earth_date, img_src, camera, id, sol }) => {
            return (
              <div key={id}>
                <RoverCard
                  earthDate={earth_date}
                  image={img_src}
                  camera={camera.name}
                  sol={sol}
                />
              </div>
            );
          })
      ) : (
        <div>no Data provided</div>
      )}
    </div>
  );
};

export default MarsRover;
