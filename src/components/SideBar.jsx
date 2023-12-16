import React from "react";
import styled from "styled-components";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import DashboardCustomizeOutlined from "@mui/icons-material/DashboardCustomizeOutlined";
import MeetingRoomOutlined from "@mui/icons-material/MeetingRoomOutlined";
import StackedLineChartOutlined from "@mui/icons-material/StackedLineChartOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: black;
  border-right: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 35px;
  margin-bottom: 35px;
  height: 100%;
  width: 100%;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const BoxTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`;

const Top = styled.div`
  font-size: 45px;
  font-weight: 1000;
`;

const Mid = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const BoxMid = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Bot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxBot = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 20px;
`;

const SideBar = () => {
  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload();
  };

  const handleLinkClick = (to) => {
    if (
      to === "/" ||
      to === "/room" ||
      to === "/statistic" ||
      to === "/fingerprint" ||
      to === "/history"
    ) {
      navigate(to);
      refreshPage();
    } else {
      navigate(to);
    }
  };

  return (
    <Container>
      <SideContainer>
        <Top>
          <BoxTop>
            <IconTop>
              <HomeOutlined
                style={{
                  fontWeight: 700,
                  fontSize: "50px",
                }}
              />
            </IconTop>
            Smarthome
          </BoxTop>
        </Top>
        <Mid>
          <Link
            to="/"
            style={{ color: "black", textDecoration: "none" }}
            onClick={() => handleLinkClick("/")}
          >
            <BoxMid>
              <Icon>
                <DashboardCustomizeOutlined />
              </Icon>
              Dashboard
            </BoxMid>
          </Link>
          <Link
            to="/room"
            style={{ color: "black", textDecoration: "none" }}
            onClick={() => handleLinkClick("/room")}
          >
            <BoxMid>
              <Icon>
                <MeetingRoomOutlined />
              </Icon>
              Room & Devices
            </BoxMid>
          </Link>
          <Link
            to="/statistic"
            style={{ color: "black", textDecoration: "none" }}
          >
            <BoxMid>
              <Icon>
                <StackedLineChartOutlined />
              </Icon>
              Statistic
            </BoxMid>
          </Link>
          <Link
            to="/fingerprint"
            style={{ color: "black", textDecoration: "none" }}
            onClick={() => handleLinkClick("/fingerprint")}
          >
            <BoxMid>
              <Icon>
                <FingerprintOutlinedIcon />
              </Icon>
              Fingerprint
            </BoxMid>
          </Link>
          <Link
            to="/history"
            style={{ color: "black", textDecoration: "none" }}
            onClick={() => handleLinkClick("/history")}
          >
            <BoxMid>
              <Icon>
                <HistoryOutlinedIcon />
              </Icon>
              History
            </BoxMid>
          </Link>
        </Mid>
        <Bot>
          <BoxBot>
            <Icon>
              <LogoutOutlined />
            </Icon>
            Log Out
          </BoxBot>
        </Bot>
      </SideContainer>
    </Container>
  );
};

export default SideBar;
