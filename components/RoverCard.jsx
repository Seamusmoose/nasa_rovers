import React from "react";
import { useState } from "react";
import { Modal } from "./Modal";
import styles from "../styles/rovermodal.module.css";

const RoverCard = ({ earthDate, id, camera, image, sol }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeCard = () => setModalIsOpen(false);

  return (
    <>
      <div className={styles.grid_image_container}>
        <img className={styles.grid_image} src={image} />
        <button
          className={styles.grid_image_button}
          onClick={() => setModalIsOpen(true)}
        >
          <a>Modal</a>
        </button>
      </div>

      <Modal open={modalIsOpen} onClose={closeCard}>
        {/* <h3>{earthDate}</h3>
        <h3>{sol}</h3>
        <h3>{id}</h3> */}
        {/* <h4>{camera}</h4> */}
        <img className={styles.modal_image} src={image} />
      </Modal>
    </>
  );
};

export default RoverCard;
