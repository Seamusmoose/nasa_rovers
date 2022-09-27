import styles from "../styles/rovermodal.module.css";

export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <dialog open className={styles.overlay}>
      <div className={styles.button_container}>
        <button onClick={onClose}>close Modal</button>
      </div>
      <div className={styles.modal_container}>{children}</div>
    </dialog>
  );
};
