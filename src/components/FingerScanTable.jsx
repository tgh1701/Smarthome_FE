import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

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

const FingerScanTable = () => {
  const [fingerScanData, setFingerScanData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/fingerScanData")
      .then((response) => {
        setFingerScanData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching finger data:", error);
      });
  }, []);

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
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "time",
      headerName: "Time",
      width: 150,
      valueGetter: (params) => formatDate(params.row.time_scan).split(" ")[0],
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      valueGetter: (params) => formatDate(params.row.time_scan).split(" ")[1],
    },
  ];

  return (
    <Container>
      <TitleTable>Fingerprint scanning history</TitleTable>
      <DataGrid
        rows={fingerScanData}
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

export default FingerScanTable;
