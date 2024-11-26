import React, { useState } from 'react';
import CurrentWeather from '@/components/Currentweather';

interface WeatherData {
  name: string;
  main: any;
  weather: any;
  wind: any;
  visibility: any;
  sys: any;
}

import Airpollution from '@/components/Airpollution';



const Home= () => {
  const [city, setCity] = useState(''); // State for the city name
  const [weather, setWeather] = useState<WeatherData | null>(null); // State for the weather data

  return (


    <div style={{marginTop:'60px' ,padding:'4px',}}>
      
      <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center' }}>
     
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name to get weather and Airpoullution details"
          style={{ padding: '8px', fontSize: '16px', marginRight: '8px' }}
        />
      </form>
      <CurrentWeather city={city} setWeather={setWeather} weather={weather} />
      {weather && <Airpollution city={weather.name} />}
    </div>
  );
}

export default Home;