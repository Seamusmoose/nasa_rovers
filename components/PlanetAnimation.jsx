import Image from "next/image";
import RoverPlc from "../public/placeholderr.png";
import styles from "../styles/PlanetAnimation.module.css";

const PlanetAnimation = ({ scrolle }) => {
  return (
    <div className={styles.animation_container}>
      <div
        className={`${styles.circle}`}
        style={{ transform: `rotate(${scrolle}deg)` }}
      >
        <div
          className={`${styles.circle_inner}`}
          style={{ transform: `rotate(-${scrolle * 5}deg)` }}
        >
          <div
            className={`${styles.circle_inner_inner}`}
            style={{ transform: `rotate(${scrolle}deg)` }}
          >
            <Image src={RoverPlc} width="80px" height="80px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetAnimation;
