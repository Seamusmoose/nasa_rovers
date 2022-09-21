import styles from "../styles/header.module.css";
import MarsWeather from "./MarsWeather";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Header</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        voluptatem necessitatibus tempore natus, sint quae facilis modi corrupti
        perferendis unde accusamus ipsum. Aliquid enim optio voluptatem aliquam
        pariatur? Saepe, dolore!
      </p>
      <div className="grid">
        <MarsWeather />
      </div>
    </div>
  );
};

export default Header;
