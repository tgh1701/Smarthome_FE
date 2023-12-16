import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ListIcon } from "../icon/icon";

const API_KEY = "3f1c674e6ea497d25ef4311e8c3ac383";

const StyledWeatherApp = styled.div``;

const StyledWeatherAppContainer = styled.div`
  background-color: #ffffff;
  overflow: hidden;
`;

const StyledWeatherInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const StyledLocation = styled.p`
  font-size: 25px;
  font-weight: 500;
`;

const StyledWeatherImage = styled.img`
  width: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledWeatherType = styled.p`
  font-size: 25px;
  font-weight: 500;
`;

const WeatherApp = ({ isRain }) => {
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);

  const fetchWeather = async () => {
    const city = "Hanoi";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(URL);
      const data = response.data;

      setApiData(null);

      if (data.cod === 404 || data.cod === 400) {
        setShowWeather([
          {
            type: "Not Found",
            img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
          },
        ]);
      }

      setShowWeather(
        ListIcon.filter((weather) => weather.type === data.weather[0].main)
      );
      setApiData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
    const intervalId = setInterval(() => {
      fetchWeather();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledWeatherApp>
      <StyledWeatherAppContainer
        className={`weather-details ${showWeather ? "show" : ""}`}
      >
        {showWeather && (
          <StyledWeatherInfo className="weather-info">
            {apiData && (
              <StyledLocation>
                {apiData?.name + ", " + apiData?.sys?.country}
              </StyledLocation>
            )}
            <StyledWeatherImage
              src={
                isRain
                  ? "https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
                  : showWeather[0]?.img
              }
              alt={isRain ? "Rain" : showWeather[0]?.description}
            />
            <StyledWeatherType>
              {isRain ? "Rain" : showWeather[0]?.type}
            </StyledWeatherType>
          </StyledWeatherInfo>
        )}
      </StyledWeatherAppContainer>
    </StyledWeatherApp>
  );
};

export default WeatherApp;
