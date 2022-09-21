import styles from '../styles/rovermodal.module.css'

export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <dialog open className={styles.overlay}>
      <div className={styles.modal_container}>
        <button onClick={onClose}>close Modal</button>
        {children}
      </div>
    </dialog>
  );
};
