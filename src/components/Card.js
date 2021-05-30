import React, { useContext } from "react";
import styles from "../CSS/Card.module.css";
import { ThemeContext } from "../store/ThemeContext";
const Card = (props) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      className={`${styles.cardDialog} ${
        themeContext.state.darkMode ? styles.dark : null
      } `}
    >
      {props.children}
    </div>
  );
};

export default Card;
