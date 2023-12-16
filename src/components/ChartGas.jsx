import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 1100px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-left: 80px;
  margin-top: 30px;
`;

const TitleChart = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const ChartGas = () => {
  const [gasData, setGasData] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sensorData")
      .then((response) => {
        setGasData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching finger data:", error);
      });
  }, []);

  const convertedData = {
    labels: gasData
      .map((data) => format(new Date(data.Date), "dd-MM-yyyy"))
      .reverse(),
    datasets: [
      {
        label: "Home",
        data: gasData.map((data) => data.AvgMQ2),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Garage",
        data: gasData.map((data) => data.AvgMQ5),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Container>
      <TitleChart>Gas</TitleChart>
      <Line options={options} data={convertedData} />
    </Container>
  );
};

export default ChartGas;
