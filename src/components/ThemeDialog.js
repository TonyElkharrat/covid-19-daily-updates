import React from "react";
import Switch from "@material-ui/core/Switch";
import Modal from "./Modal";
import Card from "./Card";
import ReactDom from "react-dom";
import Button from "../UI/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { useState, useContext, useEffect } from "react";
import styles from "../CSS/Button.module.css";
import { ThemeContext } from "../store/ThemeContext";

const ThemeDialog = (props) => {
  const themeContext = useContext(ThemeContext);
  const [switchTheme, setSwitchTheme] = useState(themeContext.state.darkMode);

  const handleChange = (event) => {
    setSwitchTheme(!switchTheme);
    themeContext.setDarkMode(
      switchTheme ? { type: "LIGHTMODE" } : { type: "DARKMODE" }
    );
  };
  const onShowDialog = (event) => {
    props.showDialog(false);
  };
  return (
    <>
      {ReactDom.createPortal(
        <Modal showModal={onShowDialog} />,
        document.getElementById("backdrop-root")
      )}

      <Card>
        <h2>Change Theme Color</h2>
        <span>Change theme color to black</span>
        <Switch
          checked={switchTheme}
          onChange={handleChange}
          color="default"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <DialogActions>
          <Button
            style={styles.buttonDialog}
            text={"Ok"}
            onClick={onShowDialog}
            color="primary"
          />
        </DialogActions>
      </Card>
    </>
  );
};

export default ThemeDialog;
