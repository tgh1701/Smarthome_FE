import React from "react";
import SideBar from "../components/SideBar";
import SensorsData from "../components/SensorsData";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <SideBar />
      <div
        style={{
          marginTop: "40px",
          marginLeft: "25%",
        }}
      >
        <SensorsData />
      </div>
    </div>
  );
};

export default Dashboard;
