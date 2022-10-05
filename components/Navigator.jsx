import { DayPicker, DayClickEventHandler } from "react-day-picker";
import { useState, useEffect, useRef } from "react";
import "react-day-picker/dist/style.css";
import styles from "../styles/navigator.module.css";
import PlanetAnimation from "./PlanetAnimation";

const Navigator = ({
  selectedRover,
  selectedRoverSet,
  currentRovers,
  selectedCamera,
  availableCameras,
  selectedCameraSet,
  handleDayClick,
  disabledDays,
  month,
  setMonth,
  scrolle,
  selectedDay,
}) => {
  return (
    <>
      <div className="marg-top">
        <PlanetAnimation scrolle={scrolle} />
        <div className="flex row center">
          <select
            className="marg-5 light-1"
            name="rover-select"
            value={selectedRover}
            onChange={(e) => selectedRoverSet(e.currentTarget.value)}
          >
            <option value="">Select a rover</option>
            {currentRovers.map((rover) => (
              <option key={rover} value={rover}>
                {rover}
              </option>
            ))}
          </select>
          <select
            className="light-1"
            name="camera-select"
            value={selectedCamera}
            onChange={(e) => selectedCameraSet(e.currentTarget.value)}
          >
            <option value="">Select a camera</option>
            {availableCameras.map((camera) => (
              <option key={camera} value={camera}>
                {camera}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <DayPicker
          mode="single"
          utcOffset={0}
          dateFormat="DD-MMM HH:mm"
          onDayClick={handleDayClick}
          disabled={disabledDays}
          selected={selectedDay}
          // onSelect={setSelectedDay}
          month={month}
          onMonthChange={setMonth}
        />
      </div>
    </>
  );
};

export default Navigator;
