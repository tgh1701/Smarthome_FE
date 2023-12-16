import React from "react";
import SideBar from "../components/SideBar";
import FingerScanTable from "../components/FingerScanTable";

const History = () => {
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
        <div
          style={{
            fontSize: "35px",
            fontWeight: "600",
          }}
        >
          History
        </div>
        <div style={{ marginLeft: "250px" }}>
          <FingerScanTable />
        </div>
      </div>
    </div>
  );
};

export default History;
