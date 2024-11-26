import React, { useState } from 'react';
import axios from 'axios';

import { getAirPollution } from '../api/airpollution'; // Adjust the path to where your API file is located

interface CityPollutionProps {
  city: string;
}

const CityPollution: React.FC<CityPollutionProps> = ({ city }) => {
  const [airPollutionData, setAirPollutionData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCityCoordinates = async (cityName: string) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: cityName,
          appid: import.meta.env.VITE_WEATHER_API_KEY, // API key for OpenWeatherMap
        },
      });
      const { coord } = response.data; // Extract latitude and longitude
      return coord;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw new Error("Failed to get coordinates.");
    }
  };

  const fetchAirPollutionData = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      // Get city coordinates
      const { lat, lon } = await fetchCityCoordinates(cityName);
      // Fetch air pollution data using the obtained coordinates
      const data = await getAirPollution(lat, lon);
      setAirPollutionData(data);
    } catch (error) {
      setError("Error fetching air pollution data");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (city) {
      fetchAirPollutionData(city);
    }
  }, [city]);

  if (loading) {
    return <div>Loading air pollution data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
    style={{
      padding: "20px",
      fontFamily: "'Poppins', sans-serif",
      maxWidth: "1000px",
      margin: "0 auto",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      background: "black", // Gradient background
      borderRadius: "15px", // Rounded corners
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)", // Subtle shadow
    }}
    className="air-pollution-info p-6 bg-gray-100 rounded-lg shadow-md"
  >
    <div  >
    
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", gap: "px" }}>
      {airPollutionData && airPollutionData.list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "style={{display:'flex',gap:'6px', flexWrap: "wrap"}}>
          {[
            { label: "Air Quality Index (AQI)", value: airPollutionData.list[0].main.aqi, icon: "🌫️" },
            { label: "CO", value: `${airPollutionData.list[0].components.co} µg/m³`, icon: "🧪" },
            { label: "NO", value: `${airPollutionData.list[0].components.no} µg/m³`, icon: "🧪" },
            { label: "NO2", value: `${airPollutionData.list[0].components.no2} µg/m³`, icon: "🧪" },
            { label: "O3", value: `${airPollutionData.list[0].components.o3} µg/m³`, icon: "🌍" },
            { label: "SO2", value: `${airPollutionData.list[0].components.so2} µg/m³`, icon: "🌋" },
            { label: "PM2.5", value: `${airPollutionData.list[0].components.pm2_5} µg/m³`, icon: "🍃" },
            { label: "PM10", value: `${airPollutionData.list[0].components.pm10} µg/m³`, icon: "🍂" },
            { label: "NH3", value: `${airPollutionData.list[0].components.nh3} µg/m³`, icon: "💧" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: "15px",
                background: "rgba(255, 255, 255, 0.85)",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              className="hover:transform hover:scale-105 hover:shadow-lg flex items-center"
            >
              <span className="text-gray-500 text-2xl mr-3">{item.icon}</span>
              <p className="text-gray-700 text-lg">
                <strong>{item.label}:</strong> {item.value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 ">No data available</div>
      )}
    </div>
  </div>
  

  );
};

export default CityPollution;
