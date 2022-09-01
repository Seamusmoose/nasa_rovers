import { useState, useEffect } from "react";
import RoverCard from "./RoverCard";

const camerasList = [
  "FHAZ",
  "RHAZ",
  "MAST",
  "CHEMCAM",
  "MAHLI",
  "MARDI",
  "NAVCAM",
  "PANCAM",
  "MINITES",
];
const size = 48;
const currentRovers = ["Curiosity", "Opportunity", "Spirit"];

const MarsRover = () => {
  const [selectedRover, selectedRoverSet] = useState(currentRovers[0]);

  const [earthDate, earthDateSet] = useState("");

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

  const getRoverDateMax = () => {
    switch (selectedRover) {
      case "Curiosity":
        return (
          manifestsData?.earth_date || new Date().toISOString().slice(0, 10)
        );
      case "Opportunity":
        return "2018-06-11";
      case "Spirit":
        return "2010-03-22";
      default:
        return (
          manifestsData?.earth_date || new Date().toISOString().slice(0, 10)
        );
    }
  };

  const dataForRender = [
    ...roverData.filter((el) => el.camera.name === selectedCamera),
  ];

  return (
    <div className="RoverImages__Container">
      <select
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

      <input
        name="date"
        type="date"
        min={getRoverDateMin()}
        max={getRoverDateMax()}
        value={earthDate}
        onChange={(e) => earthDateSet(e.currentTarget.value)}
      />

      <div className="grid__container">
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
    </div>
  );
};

export default MarsRover;
