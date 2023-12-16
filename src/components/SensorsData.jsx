import React, { useState, useEffect } from "react";
import socket from "../socket";
import styled from "styled-components";
import GaugeComponent from "react-gauge-component";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import WeatherApp from "./WeatherApp";
import fireSvg from "../icon/fire.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled.div``;

const SensorContainer = styled.div`
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: 700;
  width: 360px;
  height: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SensorsData = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [sensorsData, setSensorsData] = useState({});
  const [isFireModalOpen, setIsFireModalOpen] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    socket.on("sensorsData", (data) => {
      try {
        setSensorsData(data.payload);
        if (data.payload.Fire === 0) {
          setIsFireModalOpen(true);
        }
      } catch (error) {
        console.error("Error processing sensorsData payload:", error);
      }
    });

    return () => {
      if (socket && isConnected) {
        socket.disconnect();
      }
    };
  }, [isConnected]);

  const mq2Data = {
    // labels: ["Gas", "Air"],
    datasets: [
      {
        label: "MQ2",
        data: [sensorsData.MQ2 || 0, 100 - sensorsData.MQ2 || 0],
        backgroundColor: ["rgb(255, 0, 0)", "rgb(92, 92, 92)"],
        hoverOffset: 4,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const mq5Data = {
    // labels: ["Gas", "Air"],
    datasets: [
      {
        label: "MQ5",
        data: [sensorsData.MQ5 || 0, 100 - sensorsData.MQ5 || 0],
        backgroundColor: ["rgb(255, 0, 0)", "rgb(92, 92, 92)"],
        hoverOffset: 4,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const handleFireModalClose = () => {
    setIsFireModalOpen(false);
  };

  return isConnected ? (
    <Container>
      <div
        style={{
          fontSize: "35px",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        Dashboard
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SensorContainer>
          Home
          <div
            style={{
              fontWeight: "400",
            }}
          >
            {sensorsData.MQ2 || 0} PPM
          </div>
          <div style={{ width: "300px" }}>
            <Doughnut data={mq2Data} />
          </div>
        </SensorContainer>
        <SensorContainer>
          Garage
          <div
            style={{
              fontWeight: "400",
            }}
          >
            {sensorsData.MQ5 || 0} PPM
          </div>
          <div style={{ width: "300px" }}>
            <Doughnut data={mq5Data} />
          </div>
        </SensorContainer>
        <SensorContainer>
          Weather
          <WeatherApp isRain={sensorsData.Rain === 0} />
        </SensorContainer>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <SensorContainer>
          Temperature
          <GaugeComponent
            id="temperature-gauge"
            style={{
              width: "500px",
              height: "200px",
            }}
            arc={{
              width: 0.4,
              padding: 0.01,
              subArcs: [
                {
                  limit: 10,
                  color: "#49AEFD",
                  showMark: true,
                  tooltip: { text: "Cold!" },
                },
                {
                  limit: 20,
                  color: "#5BE12C",
                  showMark: true,
                  tooltip: { text: "Good!" },
                },
                {
                  limit: 35,
                  color: "#F5CD19",
                  showMark: true,
                  tooltip: { text: "Hot!" },
                },
                {
                  color: "#EA4228",
                  tooltip: { text: "Too Hot!" },
                },
              ],
            }}
            needle={{
              color: "#345243",
              length: 0.9,
              width: 15,
              animDelay: 200,
            }}
            labels={{
              valueLabel: {
                formatTextValue: (value) => value + "ºC",
                style: {
                  fill: "black",
                  textShadow: "none",
                  fontWeight: "300",
                  fontSize: "30px",
                },
              },
              markLabel: {
                valueConfig: {
                  formatTextValue: (value) => value,
                  fontSize: "20px",
                },
                marks: [{ value: 13 }, { value: 22.5 }, { value: 32 }],
              },
            }}
            value={sensorsData.Temp || 0}
            minValue={0}
            maxValue={50}
          />
        </SensorContainer>
        <SensorContainer>
          Humidity
          <GaugeComponent
            id="hum-gauge"
            style={{
              width: "500px",
              height: "200px",
            }}
            arc={{
              width: 0.4,
              padding: 0.01,
              subArcs: [
                {
                  limit: 25,
                  color: "#EA4228",
                  showMark: true,
                  tooltip: { text: "Dry!" },
                },
                {
                  limit: 50,
                  color: "#F5CD19",
                  showMark: true,
                  tooltip: { text: "Comfort!" },
                },
                {
                  limit: 75,
                  color: "#5BE12C",
                  showMark: true,
                  tooltip: { text: "Wet" },
                },
                {
                  color: "#49AEFD",
                  tooltip: { text: "Too Wet" },
                },
              ],
            }}
            needle={{
              color: "#345243",
              length: 0.9,
              width: 15,
              animDelay: 200,
            }}
            labels={{
              valueLabel: {
                formatTextValue: (value) => value + "%",
                style: {
                  fill: "black",
                  textShadow: "none",
                  fontWeight: "300",
                  fontSize: "30px",
                },
              },
              markLabel: {
                valueConfig: {
                  formatTextValue: (value) => value,
                  fontSize: "20px",
                },
                marks: [{ value: 13 }, { value: 22.5 }, { value: 32 }],
              },
            }}
            value={sensorsData.Hum || 0}
            minValue={0}
            maxValue={100}
          />
        </SensorContainer>
        <SensorContainer>
          Soil Moisture
          <GaugeComponent
            id="soil-gauge"
            style={{
              width: "500px",
              height: "200px",
            }}
            arc={{
              width: 0.4,
              padding: 0.01,
              subArcs: [
                {
                  limit: 25,
                  color: "#EA4228",
                  showMark: true,
                  tooltip: { text: "Dry!" },
                },
                {
                  limit: 50,
                  color: "#F5CD19",
                  showMark: true,
                  tooltip: { text: "Good!" },
                },
                {
                  limit: 75,
                  color: "#5BE12C",
                  showMark: true,
                  tooltip: { text: "Wet" },
                },
                {
                  color: "#49AEFD",
                  tooltip: { text: "Too Wet" },
                },
              ],
            }}
            needle={{
              color: "#345243",
              length: 0.9,
              width: 15,
              animDelay: 200,
            }}
            labels={{
              valueLabel: {
                formatTextValue: (value) => value + "%",
                style: {
                  fill: "black",
                  textShadow: "none",
                  fontWeight: "300",
                  fontSize: "30px",
                },
              },
              markLabel: {
                valueConfig: {
                  formatTextValue: (value) => value,
                  fontSize: "20px",
                },
                marks: [{ value: 13 }, { value: 22.5 }, { value: 32 }],
              },
            }}
            value={sensorsData.Soil || 0}
            minValue={0}
            maxValue={100}
          />
        </SensorContainer>
      </div>
      <div style={{ outline: "none" }}>
        <Modal open={isFireModalOpen} onClose={handleFireModalClose}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              backgroundColor: "white",
              boxShadow: 24,
              outline: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "50px",
                fontWeight: "600",
                borderBottom: "1px solid grey",
                boxShadow: "0px 5px 10px rgba(221, 221, 221, 0.8)",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              WARNING
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "30px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              FIRE IN YOUR HOUSE!!!
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={fireSvg}
                alt="Fire Icon"
                style={{ height: "300px", width: "300px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "grey",
                  color: "black",
                  height: "30px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
                variant="contained"
                color="primary"
                onClick={handleFireModalClose}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Container>
  ) : null;
};

export default SensorsData;
