import { useState } from 'react';
import { getWeather } from '@/api/weatherAPI';

interface WeatherData {
  city_name: string;
  temp: number;
  app_temp: number;
  weather: {
    description: string;
    icon: string;
  };
  wind_spd: number;
  wind_cdir_full: string;
  rh: number;
  vis: number;
  aqi: number;
  sunrise: string;
  sunset: string;
}

function App() {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setWeather(null);

    if (!city.trim()) {
      setError('Please enter a valid city name.');
      return;
    }

    const data = await getWeather(city);
    if (data && data.data.length > 0) {
      setWeather(data.data[0]);
    } else {
      setError('Weather data not found.');
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{ padding: '8px', fontSize: '16px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px', fontSize: '16px' }}>
          Get Weather
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>Weather in {weather.city_name}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Feels Like: {weather.app_temp}°C</p>
          <p>Description: {weather.weather.description}</p>
          <p>Wind Speed: {weather.wind_spd} m/s</p>
          <p>Wind Direction: {weather.wind_cdir_full}</p>
          <p>Humidity: {weather.rh}%</p>
          <p>Visibility: {weather.vis} km</p>
          <p>Air Quality Index (AQI): {weather.aqi}</p>
          <p>Sunrise: {weather.sunrise}</p>
          <p>Sunset: {weather.sunset}</p>
        </div>
      )}
    </div>
  );
}

export default App;
