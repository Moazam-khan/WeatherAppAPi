import axios from 'axios';

// Define the environment variable for the OpenWeatherMap API key
interface ImportMetaEnv {
  VITE_WEATHER_API_KEY: string;
}

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Define the response structure for OpenWeatherMap API
interface WeatherResponse {
  name: string; // City name
  main: {
    temp: number; // Temperature in Kelvin
  };
  weather: {
    description: string; // Weather description
  }[];
}

export const getWeather = async (city: string): Promise<WeatherResponse | null> => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  try {
    const response = await axios.get<WeatherResponse>(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
