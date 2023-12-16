import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import socket from "../socket";

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-size: 20px;
  width: 100%;
  height: 400;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleTable = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const FingerDataTable = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [fingerData, setFingerData] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    socket.on("finger/fingerControl", (data) => {
      const { newState } = JSON.parse(data);
      console.log(`Received finger control command: ${newState}`);
    });

    axios
      .get("http://localhost:8000/api/fingerData")
      .then((response) => {
        setFingerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching finger data:", error);
      });

    return () => {
      if (socket && isConnected) {
        socket.disconnect();
      }
    };
  }, [isConnected]);

  const sendFingerControl = (value) => {
    socket.emit("finger/fingerControl", JSON.stringify({ newState: value }));
  };

  const handleDeleteButtonClick = (fingerId) => {
    sendFingerControl(0);
    socket.emit("finger/fingerId", JSON.stringify({ newState: fingerId }));
    setFingerData((prevData) =>
      prevData.filter((item) => item.finger_id !== fingerId)
    );
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const columns = [
    { field: "finger_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "time",
      headerName: "Time",
      width: 150,
      valueGetter: (params) => formatDate(params.row.time).split(" ")[0],
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      valueGetter: (params) => formatDate(params.row.time).split(" ")[1],
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          sx={{ backgroundColor: "grey", height: "30px", width: "80px" }}
          variant="contained"
          onClick={() => handleDeleteButtonClick(params.row.finger_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <TitleTable>Fingerprint data</TitleTable>
      <DataGrid
        rows={fingerData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        autoHeight
      />
    </Container>
  );
};

export default FingerDataTable;
