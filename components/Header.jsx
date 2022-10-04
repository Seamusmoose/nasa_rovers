import Image from "next/image";
import styles from "../styles/header.module.css";
import marsStation from "../public/station2.png";

const Header = () => {
  return (
    <>
      <div className={`${styles.header} flex center responsive-col`}>
        <Image src={marsStation} height={500} width={600} />

        <p className={`${styles.text} flex center marg-4`}>
          Nasa currenly has 2 working Rovers, Perservence and Curiosity. However
          on this site you can also see the images of all previous four rovers
          with data access. Moving from place to place, the rovers perform
          on-site geological investigations. Each rover is sort of the
          mechanical equivalent of a geologist walking the surface of Mars. The
          mast-mounted cameras are mounted 1.5 meters(5 feet) high and provide
          360-degree, stereoscopic, humanlike views of the terrain.
          <br />
        </p>
      </div>
    </>
  );
};

export default Header;
