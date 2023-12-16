import React, { useState } from "react";
import SideBar from "../components/SideBar";
import ChartTemp from "../components/ChartTemp";
import CustomizedMenus from "../components/CustomizedMenus";
import ChartGas from "../components/ChartGas";
import ChartSoil from "../components/ChartSoil";

const Statistic = () => {
  const [selectedChart, setSelectedChart] = useState("ChartTemp");

  const handleMenuClose = (componentName) => {
    setSelectedChart(componentName);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ marginTop: "40px", marginLeft: "25%" }}>
        <div
          style={{
            fontSize: "35px",
            fontWeight: "600",
            marginBottom: "20px",
            display: "flex",
            width: "1250px",
            justifyContent: "space-between",
          }}
        >
          Statistic
          <CustomizedMenus
            selectedComponent={selectedChart}
            handleMenuClose={handleMenuClose}
          />
        </div>
        {selectedChart === "ChartTemp" && <ChartTemp />}
        {selectedChart === "ChartGas" && <ChartGas />}
        {selectedChart === "ChartSoil" && <ChartSoil />}
      </div>
    </div>
  );
};

export default Statistic;
