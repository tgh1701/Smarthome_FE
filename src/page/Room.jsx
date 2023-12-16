import React from "react";
import SideBar from "../components/SideBar";
import ButtonsControl from "../components/ButtonsControl";

const Room = () => {
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
        <ButtonsControl />
      </div>
    </div>
  );
};

export default Room;
