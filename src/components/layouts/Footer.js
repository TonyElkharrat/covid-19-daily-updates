import React, { useContext } from "react";
import github from "../../assets/images/github.svg";
import styles from "../../CSS/Footer.module.css";
import { ThemeContext } from "../../store/ThemeContext";
const Footer = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <footer
      className={`${styles.footer} ${
        themeContext.state.darkMode ? styles.dark : null
      }`}
    >
      <div
        className={`${styles.link} ${
          themeContext.state.darkMode ? styles.white : null
        }`}
      >
        Created with 💝 by Tony Elkharrat
        <a href="https://github.com/TonyElkharrat/covid-19-daily-updates">
          <img className={styles.img} src={github} alt="Github.img" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
