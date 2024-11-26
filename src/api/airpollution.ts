import axios from 'axios';

// Define the environment variable for the OpenWeatherMap API key
interface ImportMetaEnv {
  VITE_WEATHER_API_KEY: string;
}

const BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution"; // Air pollution API URL

// Define the response structure for Air Pollution API
interface AirPollutionResponse {
  list: {
    main: {
      aqi: number; // Air Quality Index
    };
    components: {
      co: number; // CO concentration
      no: number; // NO concentration
      no2: number; // NO2 concentration
      o3: number; // Ozone concentration
      so2: number; // SO2 concentration
      pm2_5: number; // PM2.5 concentration
      pm10: number; // PM10 concentration
      nh3: number; // NH3 concentration
    };
  }[];
}

export const getAirPollution = async (lat: number, lon: number): Promise<AirPollutionResponse | null> => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  try {
    const response = await axios.get<AirPollutionResponse>(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching air pollution data:", error);
    return null;
  }
};
