import React from "react";
import SideBar from "../components/SideBar";
import FingerDataTable from "../components/FingerDataTable";

const Fingerprint = () => {
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
          Fingerprint
        </div>
        <div style={{ marginLeft: "200px" }}>
          <FingerDataTable />
        </div>
      </div>
    </div>
  );
};

export default Fingerprint;
