import React from "react";
import loading from "../assets/images/giphy.gif";
import styles from "../CSS/ImageLoading.module.css";

const ImageLoading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <img src={loading} className={styles.img} alt="loading.img" />
    </div>
  );
};

export default ImageLoading;
