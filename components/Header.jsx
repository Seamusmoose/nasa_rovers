import Image from "next/image";
import styles from "../styles/header.module.css";
import marsStation from "../public/station2.png";

const Header = () => {
  return (
    <>
      <div className={`${styles.header} flex responsive-col`}>
        <Image src={marsStation} height={500} width={600} />

        <p className={`${styles.text} flex center`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          voluptatem necessitatibus tempore natus, sint quae facilis modi
          corrupti perferendis unde accusamus ipsum. Aliquid enim optio
          voluptatem aliquam pariatur? Saepe, dolore!
        </p>
      </div>
    </>
  );
};

export default Header;
