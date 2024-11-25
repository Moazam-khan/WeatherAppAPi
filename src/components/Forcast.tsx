import { useState } from 'react';
import { getForecast } from '../api/forcast';

interface ForecastDay {
  datetime: string;
  temp: number;
  weather: {
    description: string;
    icon: string;
  };
  humidity: number;
  pressure: number;
  wind_speed: number;
}

function App() {
  const [city, setCity] = useState<string>('');
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setForecast(null);

    if (!city.trim()) {
      setError('Please enter a valid city name.');
      return;
    }

    const data = await getForecast(city);
    if (data && data.data) {
      setForecast(data.data);
    } else {
      setError('Forecast data not found.');
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{ padding: '8px', fontSize: '16px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px', fontSize: '16px' }}>
          Get Forecast
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {forecast && (
        <div style={{ marginTop: '20px' }}>
          <h2>7-Day Forecast</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {forecast.map((day, index) => (
              <div key={index} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                <h3>{day.datetime}</h3>
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                  alt={day.weather.description}
                  style={{ width: '50px', height: '50px' }}
                />
                <p>Temp: {day.temp}°C</p>
                <p>{day.weather.description}</p>
                <p>Humidity: {day.humidity}%</p>
                <p>Pressure: {day.pressure} hPa</p>
                <p>Wind Speed: {day.wind_speed} m/s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
