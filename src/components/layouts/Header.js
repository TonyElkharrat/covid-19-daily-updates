import styles from "../../CSS/Header.module.css";
import React from "react";
import coronavirusImg from "../../assets/images/coronavirus.svg";
import settings from "../../assets/images/settings.svg";
import ThemeDialog from "../ThemeDialog";
import { useState, useContext } from "react";
import { ThemeContext } from "../../store/ThemeContext";

const Header = () => {
  const [showThemeDialog, setshowThemeDialog] = useState(false);
  const onShowThemeDialog = () => {
    setshowThemeDialog(!showThemeDialog);
  };
  const themeContext = useContext(ThemeContext);
  return (
    <header
      className={`${styles.header} ${
        themeContext.state.darkMode ? styles.dark : null
      }`}
    >
      <div className={styles.headerWrapper}>
        <img
          src={coronavirusImg}
          className={styles.img}
          alt="coronavirus.img"
        />
        <h1 className={styles.h1}>Covid-19 Daily Updates</h1>
        <img
          onClick={onShowThemeDialog}
          src={settings}
          className={`${styles.img} ${styles.settings}`}
        />
      </div>

      {showThemeDialog && <ThemeDialog showDialog={setshowThemeDialog} />}
    </header>
  );
};

export default Header;
