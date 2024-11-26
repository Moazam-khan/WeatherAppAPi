import React, { useEffect, useState } from 'react';
import { getWeather } from '@/api/weatherAPI';
import { FaTemperatureHigh, FaWind, FaEye, FaSun, FaCloudSun } from 'react-icons/fa';
import { WiSunrise, WiSunset } from 'react-icons/wi';

// WeatherData interface for OpenWeatherMap API response
interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

// Helper function to convert UNIX timestamp to readable time
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface CurrentWeatherProps {
  city: string;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  weather: WeatherData | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city, setWeather, weather }) => {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city.trim()) {
        setError('Please enter a valid city name.');
        return;
      }

      const data = await getWeather(city);
      if (data) {
        setWeather(data as WeatherData);
        setError('');
      } else {
        setError('Weather data not found.');
      }
    };

    fetchWeather();
  }, [city, setWeather]);

  return (
    <div
      className="App"
      style={{
     
        fontFamily: "'Poppins', sans-serif",
       marginTop:'8px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
     

      {error && (
        <p style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>{error}</p>
      )}

      {weather && (
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom:'4px'
          }}
        >
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px'  }}>
            Weather & Air pollution in {weather.name}
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ margin: '10px 0' }}>
              <FaTemperatureHigh style={{ fontSize: '2rem', color: '#FF5733' }} />
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C
              </p>
            </div>

            <div style={{ margin: '10px 0' }}>
              <FaCloudSun style={{ fontSize: '2rem', color: '#FFA500' }} />
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Description: {weather.weather[0].description}
              </p>
            </div>

            <div style={{ margin: '10px 0' }}>
              <FaWind style={{ fontSize: '2rem', color: '#00BFFF' }} />
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Wind Speed: {weather.wind.speed} m/s
              </p>
            </div>

            <div style={{ margin: '10px 0' }}>
              <FaEye style={{ fontSize: '2rem', color: '#6C757D' }} />
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Visibility: {(weather.visibility / 1000).toFixed(1)} km
              </p>
            </div>

            <div style={{ margin: '10px 0' }}>
              <WiSunrise style={{ fontSize: '2rem', color: '#FFA07A' }} />
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Sunrise: {formatTime(weather.sys.sunrise)}
              </p>
            </div>

            <div style={{ margin: '10px 0' }}>
              <WiSunset style={{ fontSize: '2rem', color: '#FF4500' }} />
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Sunset: {formatTime(weather.sys.sunset)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;