import axios from 'axios';

interface ImportMetaEnv {
  VITE_WEATHER_API_KEY: string;
}



const BASE_URL = "https://api.weatherbit.io/v2.0/current";

interface WeatherResponse {
  data: {
    city_name: string;
    temp: number;
    weather: {
      description: string;
    };
  }[];
}

export const getWeather = async (city: string): Promise<WeatherResponse | null> => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  try {
    const response = await axios.get<WeatherResponse>(BASE_URL, {
      params: {
        city,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
