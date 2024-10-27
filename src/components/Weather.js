import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';

function Weather({ currentUser, onLogout }) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(currentUser)) || [];
    setFavorites(storedFavorites); 
  }, [currentUser]);

  const fetchWeather = async (city) => {
    const apiKey = 'ad292c5c8a24a59d588e56dfe2ef80ef';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  const saveFavoritesToLocalStorage = (cities) => {
    localStorage.setItem(currentUser, JSON.stringify(cities)); 
  };

  const addToFavorites = () => {
    if (city && !favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
      setCity('');
    }
  };

  const fetchWeatherForFavorites = useCallback(
    async (city) => {
      const apiKey = 'ad292c5c8a24a59d588e56dfe2ef80ef';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err.message);
        return null;
      }
    },
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeather(city);
      setCity('');
    }
  };

  return (
    <div>
      {/* Logout button in top-right corner */}
      <button className="logout-button" onClick={onLogout}>Logout</button>
      
      <h2>Weather Dashboard</h2>
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

      {weatherData && (
        <div className="weather-info">
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main?.temp ?? 'N/A'}°C</p>
          <p>Humidity: {weatherData.main?.humidity ?? 'N/A'}%</p>
          <p>Conditions: {weatherData.weather?.[0]?.description ?? 'N/A'}</p>
          <p>Visibility: {weatherData.visibility ? `${weatherData.visibility} meters` : 'N/A'}</p>
        </div>
      )}

      <h3>Your Favorite Cities</h3>
      <div className="favorites-container">
        {favorites.length > 0 ? (
          favorites.map((favCity, index) => (
            <FavoriteCity key={index} city={favCity} fetchWeather={fetchWeatherForFavorites} />
          ))
        ) : (
          <p>No favorite cities yet.</p>
        )}
      </div>
    </div>
  );
}

// Component to display the weather for each favorite city
function FavoriteCity({ city, fetchWeather }) {
  const [favWeatherData, setFavWeatherData] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchWeather(city);
      setFavWeatherData(weatherData);
    };

    getWeather();
  }, [city, fetchWeather]);

  return (
    <div className="favorite-city">
      <h4>{city}</h4>
      {favWeatherData ? (
        <div className="weather-info-small">
          <p>Temp: {favWeatherData.main?.temp ?? 'N/A'}°C</p>
          <p>Cond: {favWeatherData.weather?.[0]?.description ?? 'N/A'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;