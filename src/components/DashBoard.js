import React from "react";
import Chart from "./Chart";
import SelectCountry from "../UI/SelectCountry";
import CardData from "../components/CardData";
import { useState, useEffect, useContext } from "react";
import ImageLoading from "../components/ImageLoading";
import styles from "../CSS/Dashboard.module.css";
import { ThemeContext } from "../store/ThemeContext";
import CustomizedSnackbars from "../UI/SnackBar";

const DashBoard = () => {
  const themeContext = useContext(ThemeContext);
  const [errorMessage, setErrorMessage] = useState();
  const [openError, setopenError] = useState(false);

  const [countrySelected, setcountrySelected] = useState({});
  const [countryCovidData, setCountryCovidData] = useState({
    Country: "",
    NewConfirmed: "",
    TotalConfirmed: "",
    NewDeaths: "",
    TotalDeaths: "",
    Date: "",
  });
  const [countries, setCountries] = useState([]);
  const [chartData, setchartData] = useState({
    labels: [],
    data: {
      deaths: [],
      confirmed: [],
    },
  });

  useEffect(
    async () => {
      try {
        await fetch("https://api.covid19api.com/summary")
          .then((reponse) => reponse.json())
          .then((data) => {
            const globalData = {
              Country: "GLOBAL",
              NewConfirmed: data.Global.NewConfirmed.toLocaleString(),
              TotalConfirmed: data.Global.TotalConfirmed.toLocaleString(),
              NewDeaths: data.Global.NewDeaths.toLocaleString(),
              TotalDeaths: data.Global.TotalDeaths.toLocaleString(),
              Date: new Date(data.Global.Date).toLocaleString(),
            };
            if (countries.length === 0) {
              initializeCountries(data, globalData);
            } else {
              setCountryCovidData(globalData);
              setGlobalChartData();
            }
          });
      } catch (error) {
        setopenError(true);
        setErrorMessage(error.message);
      }
    },
    [countries]
  );

  useEffect(
    async () => {
      if (Object.keys(countrySelected).length !== 0) {
        if (countrySelected.Country === "GLOBAL") {
          setGlobalChartData();
          setCountryCovidData(countrySelected);
        } else {
          try {
            await fetch(
              `https://api.covid19api.com/total/country/${
                countrySelected.Country
              }`
            )
              .then((reponse) => reponse.json())
              .then((data) => {
                setCountryCovidData(countrySelected);
                setCountryChartData(data);
              });
          } catch (error) {
            setopenError(true);
            setErrorMessage(error.message);
          }
        }
      }
    },
    [countrySelected]
  );

  const initializeCountries = (data, globalData) => {
    const countriesMapped = data.Countries.map((country) => country);
    countriesMapped.unshift(globalData);
    setCountries(countriesMapped);
  };

  const setCountryChartData = (data) => {
    let labels = data.map((country) =>
      new Date(country.Date).toLocaleDateString()
    );
    let deaths = data.map((country) => country.Deaths);
    let confirmed = data.map((country) => country.Confirmed);
    setchartData({ labels, data: { deaths, confirmed } });
  };

  const setGlobalChartData = () => {
    let countriesSorted = [...countries].sort((a, b) =>
      Number(b.TotalConfirmed - a.TotalConfirmed)
    );
    const labels = [...countriesSorted]
      .map((country) => country.Country)
      .slice(1, 40);

    let deaths = countriesSorted
      .map((country) => country.TotalDeaths)
      .slice(1, 40);
    let confirmed = countriesSorted
      .map((country) => country.TotalConfirmed)
      .slice(1, 40);
    setchartData({ labels, data: { deaths, confirmed } });
  };

  const onCountrySelected = (event, value) => {
    if (value) {
      let country = countries.find((el) => el.Country === value.Country);

      for (let key in country) {
        country[key] = country[key].toLocaleString();
        if (key === "Date") {
          country[key] = new Date(country[key]).toLocaleString();
        }
      }
      setcountrySelected(country);
    }
  };

  return (
    <>
      {countries.length === 0 && <ImageLoading />}
      {countries.length !== 0 && (
        <main className={`${themeContext.state.darkMode ? styles.dark : null}`}>
          <div className={styles.wrapper}>
            <p className={styles.country}>{countryCovidData.Country}</p>
            <p className={styles.time}>{countryCovidData.Date}</p>
          </div>
          <div className={styles.CasesWrapper}>
            <CardData
              status="Cases"
              news={countryCovidData.NewConfirmed}
              total={countryCovidData.TotalConfirmed}
              backgroundColor="rgba(107, 150, 219, 0.5)"
            />

            <CardData
              status="Deaths"
              news={countryCovidData.NewDeaths}
              total={countryCovidData.TotalDeaths}
              backgroundColor="rgba(59, 130, 246, 0.5)"
            />
          </div>
          <SelectCountry
            countries={countries}
            chooseCountry={onCountrySelected}
          />
          <Chart
            labels={chartData.labels}
            data={chartData.data.confirmed}
            title={`${countryCovidData.Country} Cases`}
            countries={countries}
          />
          <Chart
            labels={chartData.labels}
            data={chartData.data.deaths}
            title={`${countryCovidData.Country} Deaths`}
            countries={countries}
          />
          {openError && (
            <CustomizedSnackbars
              hideError={setopenError}
              errorMessage={errorMessage}
            />
          )}
        </main>
      )}
    </>
  );
};

export default DashBoard;
