import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import axios from "axios";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import lightOnSvg from "../icon/light_on.svg";
import lightOffSvg from "../icon/light_off.svg";
import fanOnSvg from "../icon/fan_on.svg";
import fanOffSvg from "../icon/fan_off.svg";
import doorOpenSvg from "../icon/door_open.svg";
import doorCloseSvg from "../icon/door_close.svg";
import waterOnSvg from "../icon/water_on.svg";
import waterOffSvg from "../icon/water_off.svg";
import hangerOnSvg from "../icon/hanger_on.svg";
import hangerOffSvg from "../icon/hanger_off.svg";

const LightSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${lightOffSvg})`,
        backgroundSize: "70%",
        filter: "brightness(0) invert(1)",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${lightOnSvg})`,
      backgroundSize: "70%",
      filter: "brightness(0) invert(1)",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const FanSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${fanOffSvg})`,
        filter: "brightness(0) invert(1)",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${fanOnSvg})`,
      filter: "brightness(0) invert(1)",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const DoorSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${doorCloseSvg})`,
        backgroundSize: "60%",
        filter: "brightness(0) invert(1)",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${doorOpenSvg})`,
      backgroundSize: "60%",
      filter: "brightness(0) invert(1)",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const WaterSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${waterOffSvg})`,
        backgroundSize: "65%",
        filter: "brightness(0) invert(1)",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${waterOnSvg})`,
      backgroundSize: "65%",
      filter: "brightness(0) invert(1)",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const HangerSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${hangerOffSvg})`,
        backgroundSize: "65%",
        filter: "brightness(0) invert(1)",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${hangerOnSvg})`,
      backgroundSize: "65%",
      filter: "brightness(0) invert(1)",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
}));

const Title = styled(Box)(({ theme }) => ({
  fontSize: "35px",
  fontWeight: "600",
  marginBottom: "50px",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "1200px",
  height: "480px",
}));

const LeftContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const MidContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const RightContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const Bedroom = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  width: " 330px",
  marginBottom: "50px",
}));

const Livingroom = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  width: " 330px",
}));

const Door = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  width: " 330px",
  marginBottom: "40px",
}));

const Kitchen = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  width: " 330px",
}));

const Balcony = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  width: " 330px",
}));

const Titleroom = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid grey",
  boxShadow: "0px 5px 10px rgba(221, 221, 221, 0.8)",
}));

const Titleicon = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px",
  fontSize: "25px",
  fontWeight: "600",
}));

const ButtonsControl = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [autoModeWater, setAutoModeWater] = useState(false);
  const [autoModeRain, setAutoModeRain] = useState(false);
  const [targetValue, setTargetValue] = useState(0);
  const [buttonStates, setButtonStates] = useState({});
  const [idEnrollValue, setIdEnrollValue] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [showPercentageForm, setShowPercentageForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messageRef = useRef();
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    socket.on("buttonsState", (data) => {
      const { location, payload } = data;
      console.log(data);
      setButtonStates((prevStates) => ({
        ...prevStates,
        [location]: parseInt(payload),
      }));
    });

    socket.on("autoMode/water/status", (data) => {
      const { newState } = JSON.parse(data);
      setAutoModeWater(newState === 1);
    });

    socket.on("autoMode/water/setTarget", (data) => {
      const { newState } = JSON.parse(data);
      setTargetValue(newState);
    });

    socket.on("autoMode/rain/status", (data) => {
      const { newState } = JSON.parse(data);
      setAutoModeRain(newState === 1);
    });

    axios
      .get("http://localhost:8000/api/buttonsState")
      .then((response) => {
        setButtonStates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching buttons state:", error);
      });

    axios
      .get("http://localhost:8000/api/autoMode")
      .then((response) => {
        const { rain, water } = response.data;
        setAutoModeRain(rain === 1);
        setAutoModeWater(water === 1);
      })
      .catch((error) => {
        console.error("Error fetching auto mode state:", error);
      });

    axios
      .get("http://localhost:8000/api/fingerData")
      .then((response) => {
        let maxFingerId = 1;
        if (response.data.length > 0) {
          maxFingerId =
            Math.max(...response.data.map((item) => item.finger_id)) + 1;
        }
        setIdEnrollValue(Math.min(127, maxFingerId));
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

  const handleButtonClick = (location) => {
    const newState = buttonStates[location] ? 0 : 1;
    const payload = JSON.stringify({ location, newState });
    socket.emit("buttonsState", payload);
  };

  const toggleAutoModeWater = () => {
    const newState = !autoModeWater ? 1 : 0;
    setAutoModeWater(!autoModeWater);
    socket.emit("autoMode/water/status", JSON.stringify({ newState }));
  };

  const handleSetTarget = () => {
    socket.emit(
      "autoMode/water/setTarget",
      JSON.stringify({ newState: targetValue })
    );
  };

  const toggleAutoModeRain = () => {
    const newState = !autoModeRain ? 1 : 0;
    setAutoModeRain(!autoModeRain);
    socket.emit("autoMode/rain/status", JSON.stringify({ newState }));
  };

  const sendFingerControl = (value) => {
    socket.emit("finger/fingerControl", JSON.stringify({ newState: value }));
  };

  const handleEnroll = () => {
    if (nameValue.trim() !== "") {
      sendFingerControl(1);
      socket.emit(
        "finger/fingerId",
        JSON.stringify({ newState: idEnrollValue })
      );
      setTimeout(() => {
        socket.emit(
          "finger/fingerName",
          JSON.stringify({ fingerName: nameValue })
        );
      }, 500);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const grammar = "#JSGF V1.0;";
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    recognitionRef.current = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognitionRef.current.grammars = speechRecognitionList;
    recognitionRef.current.lang = "vi-VN";
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = function (event) {
      const lastResult = event.results.length - 1;
      const content = event.results[lastResult][0].transcript.toLowerCase();
      messageRef.current.textContent = "Voice Input: " + content;
      if (
        content.includes("bật đèn phòng ngủ") ||
        content.includes("mở đèn phòng ngủ")
      ) {
        if (buttonStates["Bedroom"] === 0) {
          handleButtonClick("Bedroom");
        }
      } else if (content.includes("tắt đèn phòng ngủ")) {
        if (buttonStates["Bedroom"] === 1) {
          handleButtonClick("Bedroom");
        }
      } else if (
        content.includes("bật quạt phòng ngủ") ||
        content.includes("mở quạt phòng ngủ")
      ) {
        if (buttonStates["Relay2"] === 0) {
          handleButtonClick("Relay2");
        }
      } else if (content.includes("tắt quạt phòng ngủ")) {
        if (buttonStates["Relay2"] === 1) {
          handleButtonClick("Relay2");
        }
      } else if (
        content.includes("bật đèn phòng khách") ||
        content.includes("mở đèn phòng khách")
      ) {
        if (buttonStates["Livingroom"] === 0) {
          handleButtonClick("Livingroom");
        }
      } else if (content.includes("tắt đèn phòng khách")) {
        if (buttonStates["Livingroom"] === 1) {
          handleButtonClick("Livingroom");
        }
      } else if (
        content.includes("bật quạt phòng khách") ||
        content.includes("mở quạt phòng khách")
      ) {
        if (buttonStates["Relay3"] === 0) {
          handleButtonClick("Relay3");
        }
      } else if (content.includes("tắt quạt phòng khách")) {
        if (buttonStates["Relay3"] === 1) {
          handleButtonClick("Relay3");
        }
      } else if (
        content.includes("bật đèn phòng bếp") ||
        content.includes("mở đèn phòng bếp")
      ) {
        if (buttonStates["Kitchen"] === 0) {
          handleButtonClick("Kitchen");
        }
      } else if (content.includes("tắt đèn phòng bếp")) {
        if (buttonStates["Kitchen"] === 1) {
          handleButtonClick("Kitchen");
        }
      } else if (content.includes("mở cửa")) {
        if (buttonStates["Door"] === 0) {
          handleButtonClick("Door");
        }
      } else if (content.includes("đóng cửa")) {
        if (buttonStates["Door"] === 1) {
          handleButtonClick("Door");
        }
      } else if (
        content.includes("bật tất cả các đèn") ||
        content.includes("mở tất cả các đèn")
      ) {
        if (buttonStates["Bedroom"] === 0) {
          handleButtonClick("Bedroom");
        }
        if (buttonStates["Livingroom"] === 0) {
          handleButtonClick("Livingroom");
        }
        if (buttonStates["Kitchen"] === 0) {
          handleButtonClick("Kitchen");
        }
      } else if (content.includes("tắt tất cả các đèn")) {
        if (buttonStates["Bedroom"] === 1) {
          handleButtonClick("Bedroom");
        }
        if (buttonStates["Livingroom"] === 1) {
          handleButtonClick("Livingroom");
        }
        if (buttonStates["Kitchen"] === 1) {
          handleButtonClick("Kitchen");
        }
      } else if (
        content.includes("bật tất cả các quạt") ||
        content.includes("mở tất cả các quạt")
      ) {
        if (buttonStates["Relay2"] === 0) {
          handleButtonClick("Relay2");
        }
        if (buttonStates["Relay3"] === 0) {
          handleButtonClick("Relay3");
        }
      } else if (content.includes("tắt tất cả các quạt")) {
        if (buttonStates["Relay2"] === 1) {
          handleButtonClick("Relay2");
        }
        if (buttonStates["Relay3"] === 1) {
          handleButtonClick("Relay3");
        }
      } else if (
        content.includes("bật máy bơm") ||
        content.includes("mở máy bơm")
      ) {
        if (buttonStates["Relay1"] === 0) {
          handleButtonClick("Relay1");
        }
      } else if (content.includes("tắt máy bơm")) {
        if (buttonStates["Relay1"] === 1) {
          handleButtonClick("Relay1");
        }
      } else if (
        content.includes("bật giàn phơi") ||
        content.includes("mở giàn phơi")
      ) {
        if (buttonStates["ServoRain"] === 0) {
          handleButtonClick("ServoRain");
        }
      } else if (
        content.includes("tắt giàn phơi") ||
        content.includes("đóng giàn phơi")
      ) {
        if (buttonStates["ServoRain"] === 1) {
          handleButtonClick("ServoRain");
        }
      }
    };

    recognitionRef.current.onspeechend = function () {
      setIsListening(false);
      recognitionRef.current.stop();
    };

    return () => {
      recognitionRef.current.abort();
    };
  }, [buttonStates]);

  const startRecognition = () => {
    if (!isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return isConnected ? (
    <Container>
      <Title>Room & Devices</Title>
      <ButtonContainer>
        <LeftContainer>
          <Bedroom>
            <Titleroom>
              <Titleicon>
                <BedOutlinedIcon sx={{ marginRight: "5px" }} /> Bedroom
              </Titleicon>
            </Titleroom>
            <FormControlLabel
              sx={{
                margin: "10px",
              }}
              control={
                <LightSwitch
                  sx={{ m: 1 }}
                  checked={buttonStates["Bedroom"] === 0}
                />
              }
              label="Light"
              onClick={() => handleButtonClick("Bedroom")}
            />
            <FormControlLabel
              sx={{
                margin: "10px",
              }}
              control={
                <FanSwitch
                  sx={{ m: 1 }}
                  checked={buttonStates["Relay2"] === 0}
                />
              }
              label="Fan"
              onClick={() => handleButtonClick("Relay2")}
            />
          </Bedroom>
          <Livingroom>
            <Titleroom>
              <Titleicon>
                <TvOutlinedIcon sx={{ marginRight: "5px" }} /> Livingroom
              </Titleicon>
            </Titleroom>
            <FormControlLabel
              sx={{
                margin: "10px",
              }}
              control={
                <LightSwitch
                  sx={{ m: 1 }}
                  checked={buttonStates["Livingroom"] === 0}
                />
              }
              label="Light"
              onClick={() => handleButtonClick("Livingroom")}
            />
            <FormControlLabel
              sx={{
                margin: "10px",
              }}
              control={
                <FanSwitch
                  sx={{ m: 1 }}
                  checked={buttonStates["Relay3"] === 0}
                />
              }
              label="Fan"
              onClick={() => handleButtonClick("Relay3")}
            />
          </Livingroom>
        </LeftContainer>
        <MidContainer>
          <Door>
            <Titleroom>
              <Titleicon>
                <DoorFrontOutlinedIcon sx={{ marginRight: "5px" }} />
                Door
              </Titleicon>
            </Titleroom>
            <FormControlLabel
              sx={{
                margin: "10px",
              }}
              control={
                <DoorSwitch
                  sx={{ m: 1 }}
                  checked={buttonStates["Door"] === 0}
                />
              }
              label="Door"
              onClick={() => handleButtonClick("Door")}
            />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <Button
                onClick={() => setShowEnrollForm(!showEnrollForm)}
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "grey",
                  height: "30px",
                  width: "230px",
                  fontWeight: "600",
                }}
              >
                {showEnrollForm ? (
                  <>
                    <ArrowUpwardOutlinedIcon sx={{ marginRight: "5px" }} /> Hide
                    Form
                  </>
                ) : (
                  <>
                    <FingerprintOutlinedIcon sx={{ marginRight: "5px" }} />
                    Enroll Fingerprint
                  </>
                )}
              </Button>
              {showEnrollForm && (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "10px",
                    height: "150px",
                  }}
                >
                  <TextField
                    id="outlined-number"
                    label="ID"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={idEnrollValue}
                    onChange={(e) =>
                      setIdEnrollValue(
                        Math.min(127, Math.max(0, parseInt(e.target.value, 10)))
                      )
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                  />
                  <Button
                    sx={{
                      backgroundColor: "grey",
                      height: "30px",
                      width: "100px",
                      fontWeight: "600",
                    }}
                    variant="contained"
                    onClick={handleEnroll}
                  >
                    <CheckOutlinedIcon
                      sx={{
                        marginRight: "5px",
                      }}
                    />
                    Enroll
                  </Button>
                </Box>
              )}
            </Box>
          </Door>
          <Kitchen>
            <Titleroom>
              <Titleicon>
                <KitchenOutlinedIcon sx={{ marginRight: "5px" }} /> Kitchen
              </Titleicon>
            </Titleroom>
            <FormControlLabel
              sx={{
                margin: "10px",
              }}
              control={
                <LightSwitch
                  sx={{ m: 1 }}
                  checked={buttonStates["Kitchen"] === 0}
                />
              }
              label="Light"
              onClick={() => handleButtonClick("Kitchen")}
            />
          </Kitchen>
        </MidContainer>
        <RightContainer>
          <Balcony
            style={{
              borderBottom: "1px solid grey",
              boxShadow: "0px 5px 10px rgba(221, 221, 221, 0.8)",
            }}
          >
            <Titleroom>
              <Titleicon>
                <YardOutlinedIcon sx={{ marginRight: "5px" }} /> Balcony
              </Titleicon>
            </Titleroom>
            <FormControlLabel
              sx={{ margin: "10px" }}
              control={<Checkbox checked={autoModeWater} />}
              label="Auto mode for water pump:"
              onChange={toggleAutoModeWater}
            />
            {autoModeWater ? null : (
              <Box>
                <FormControlLabel
                  sx={{
                    margin: "10px",
                  }}
                  control={
                    <WaterSwitch
                      sx={{ m: 1 }}
                      checked={buttonStates["Relay1"] === 0}
                    />
                  }
                  label="Water Pump"
                  onClick={() => handleButtonClick("Relay1")}
                />
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => setShowPercentageForm(!showPercentageForm)}
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "grey",
                      height: "30px",
                      width: "180px",
                      fontWeight: "600",
                    }}
                  >
                    Set Percentage
                  </Button>
                  {showPercentageForm && (
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Box style={{ margin: "10px" }}>
                        <TextField
                          id="outlined-number"
                          label="%"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={targetValue}
                          onChange={(e) =>
                            setTargetValue(
                              Math.min(
                                100,
                                Math.max(0, parseInt(e.target.value, 10))
                              )
                            )
                          }
                        />
                      </Box>
                      <Box>
                        <Button
                          sx={{
                            backgroundColor: "grey",
                            height: "30px",
                            width: "80px",
                            fontWeight: "600",
                          }}
                          variant="contained"
                          onClick={handleSetTarget}
                        >
                          <CheckOutlinedIcon
                            sx={{
                              marginRight: "5px",
                            }}
                          />
                          Set
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
            <Box>
              <FormControlLabel
                sx={{ margin: "10px" }}
                control={<Checkbox checked={autoModeRain} />}
                label="Auto mode for hanger:"
                onChange={toggleAutoModeRain}
              />
            </Box>
            {autoModeRain ? null : (
              <FormControlLabel
                sx={{
                  margin: "10px",
                }}
                control={
                  <HangerSwitch
                    sx={{ m: 1 }}
                    checked={buttonStates["ServoRain"] === 0}
                  />
                }
                label="Clothes Hanger"
                onClick={() => handleButtonClick("ServoRain")}
              />
            )}
          </Balcony>
        </RightContainer>
      </ButtonContainer>
      <div style={{ outline: "none" }}>
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <div
              style={{ fontSize: "30px", fontWeight: "600", marginBottom: 20 }}
            >
              Enter your name first
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
                }}
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <h1>Speech Recognition</h1>
        <p id="message" ref={messageRef}></p>
        <button id="btnTalk" onClick={startRecognition} disabled={isListening}>
          {isListening ? "Listening..." : "Start"}
        </button>
      </div>
    </Container>
  ) : null;
};

export default ButtonsControl;
