import React, { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import styles from "../CSS/Chart.module.css";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Chart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "# of Cases",
        data: props.data,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className={styles.chartWrapper}>
        <h1 className={`${styles.h1} `}> {props.title}</h1>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};
export default Chart;
