import { StyleRounded } from "@material-ui/icons";
import React, { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";
import styles from "../CSS/CardData.module.css";

const CardData = (props) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      className={styles.card}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className={styles.content}>
        <h2
          className={`${styles.h2} ${
            themeContext.state.darkMode ? styles.white : null
          }`}
        >
          {props.status}
        </h2>
        <span
          className={`${styles.span} ${
            themeContext.state.darkMode ? styles.white : null
          }`}
        >
          New : {props.news}
        </span>
        <span
          className={`${styles.span} ${
            themeContext.state.darkMode ? styles.white : null
          }`}
        >
          Total : {props.total}
        </span>
      </div>
    </div>
  );
};

export default CardData;
