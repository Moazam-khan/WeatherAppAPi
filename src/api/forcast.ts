import axios from 'axios';

const BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily";

interface ForecastDay {
  datetime: string;
  temp: number;
  weather: {
    description: string;
    icon: string;
  };
}

interface ForecastResponse {
  data: ForecastDay[];
  city_name: string;
  country_code: string;
}

export const getForecast = async (city: string): Promise<ForecastResponse | null> => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY1;

  try {
    const response = await axios.get<ForecastResponse>(BASE_URL, {
      params: {
        city,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
};
