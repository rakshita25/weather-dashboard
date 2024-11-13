import React, { useState, useEffect} from 'react';
import '../App.css';

function Weather({ currentUser, onLogout }) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(currentUser)) || [];
    setFavorites(storedFavorites); 
  }, [currentUser]);

  const fetchWeather = async (city) => {
    const apiKey = 'ad292c5c8a24a59d588e56dfe2ef80ef';

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;


    try {
      const weatherResponse = await fetch(weatherUrl);
      const forecastResponse = await fetch(forecastUrl);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('City not found');
      }
      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      processForecastData(forecastData.list);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setForecastData([]);
      setError(err.message);
    }
  };

  const processForecastData = (data) => {
    const dailyData = [];
    data.forEach((entry) => {
       const date = new Date(entry.dt_txt);
       if(date.getHours() == 12) {
          dailyData.push({
            date: entry.dt_txt,
            day: date.toLocaleDateString('en-US', {weekday: 'long'}),
            formattedDate: date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}),
            temp: entry.main.temp,
            description: entry.weather[0].description,
            icon: entry.weather[0].icon,
          });
        }
      });

    setForecastData(dailyData);
  };

  const saveFavoritesToLocalStorage = (cities) => {
    localStorage.setItem(currentUser, JSON.stringify(cities)); 
  };

  const getLocalTime = () => {
    if (!weatherData) return '';

    const timezoneOffset = weatherData.timezone;
    const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);

    return new Intl.DateTimeFormat('en-US', {
       hour: '2-digit',
       minute: '2-digit',
       second: '2-digit',
       hour12: true,
       timezone: 'UTC',
       timeZoneName: 'short',
    }).format(localTime);
 };
  const addToFavorites = () => {
    if (city && !favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
      setCity('');
    }
  };

  const handleFavoriteClick = (favCity) => {
    setSelectedCity(favCity);
    fetchWeather(favCity);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeather(city);
      setCity('');
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={onLogout}>Logout</button>
      
      <h2>Weather Dashboard</h2>
      <h3>Your Favorite Cities</h3>
      <div className="favorites-menu">
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((favCity, index) => (
              <li key={index}>
                <button onClick={() => handleFavoriteClick(favCity)} className={favCity === selectedCity ? 'selected-city' : ''}>{favCity}</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite cities yet.</p>
        )}
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
          <button type="button" onClick={addToFavorites}>Add to Favorites</button>
        </form>
      </div>

      {error && <p>{error}</p>}

      {weatherData && selectedCity && (
        <div className="weather-info">
          <div className="local-time">
            <p><strong>Local Time:</strong> {getLocalTime()}</p>
          </div>
          <h3>Weather in {weatherData.name}</h3>
          <p className="current-temperature">{weatherData.main?.temp ?? 'N/A'}°C</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`} alt={weatherData.weather?.[0]?.description ?? 'Weather icon'} className="weather-icon-today" />
          <br />
          <p>Feels like: {weatherData.main?.feels_like ?? 'N/A'}°C</p>
          <p>Max Temp: {weatherData.main?.temp_max ?? 'N/A'}°C</p>
          <p>Min Temp: {weatherData.main?.temp_min ?? 'N/A'}°C</p>
          <p>Humidity: {weatherData.main?.humidity ?? 'N/A'}%</p>
          <p>Conditions: {weatherData.weather?.[0]?.description ?? 'N/A'}</p>
          <p>Visibility: {weatherData.visibility ? `${weatherData.visibility} meters` : 'N/A'}</p>
        </div>
      )}

      {forecastData.length > 0 && (
        <div className="forecast-container">
          <h3>5-Day Forecast</h3>
          <div className="forecast-list">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast-item">
                <p><strong>{day.day}</strong></p>
                <p>{day.formattedDate}</p>
                <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} />
                <p>{day.temp}°C</p>
                <p>{day.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;