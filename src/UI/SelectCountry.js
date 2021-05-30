import React, { useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { ThemeContext } from "../store/ThemeContext";
import { useState, useEffect } from "react";
const SelectCountry = (props) => {
  const [userPositionCountry, setUserPositionCountry] = useState("GLOBAL");
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    async function showPosition(position) {
      await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${
          position.coords.latitude
        }+${position.coords.longitude}&key=f6d7ec9141814c2396b5b1f38949a647`
      ).then((response) =>
        response
          .json()
          .then((data) =>
            setUserPositionCountry(data.results[0].components.country)
          )
      );
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Autocomplete
        onChange={props.chooseCountry}
        id="Country"
        options={props.countries}
        getOptionLabel={(option) => (option.Country ? option.Country : "")}
        getOptionSelected={(option) => option.Country === userPositionCountry}
        style={{
          width: 350,
          textAlign: "center",
          backgroundColor: `${
            themeContext.state.darkMode ? "white" : "transparent"
          }`,
        }}
        defaultValue={""}
        renderInput={(params) => (
          <TextField
            style={{ width: 350, textAlign: "center" }}
            {...params}
            label="Country"
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

export default SelectCountry;
