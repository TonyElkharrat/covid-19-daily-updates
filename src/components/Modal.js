import React from "react";
import styles from "../CSS/Modal.module.css";

const Modal = (props) => {
  return (
    <div onClick={props.showModal} className={styles.modal}>
      {props.children}
    </div>
  );
};

export default Modal;
