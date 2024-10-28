import React, { useState, useEffect} from 'react';
import '../App.css';

function Weather({ currentUser, onLogout }) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

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
          <h3>Weather in {weatherData.name}</h3>
          <p>Current Temperature: {weatherData.main?.temp ?? 'N/A'}°C</p>
          <p>Max Temp: {weatherData.main?.temp_max ?? 'N/A'}°C</p>
          <p>Min Temp: {weatherData.main?.temp_min ?? 'N/A'}°C</p>
          <p>Humidity: {weatherData.main?.humidity ?? 'N/A'}%</p>
          <p>Conditions: {weatherData.weather?.[0]?.description ?? 'N/A'}</p>
          <p>Visibility: {weatherData.visibility ? `${weatherData.visibility} meters` : 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;