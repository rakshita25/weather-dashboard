// import React, { useState } from 'react';

// function Weather() {
//   const [city, setCity] = useState('');        // State to store the input city name
//   const [weatherData, setWeatherData] = useState(null); // State to store the weather data
//   const [error, setError] = useState(null);    // State to store error messages

//   // Function to fetch weather data based on the entered city
//   const fetchWeather = async (city) => {
//     const apiKey = 'ad292c5c8a24a59d588e56dfe2ef80ef';  // Using the API key from environment variable
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('City not found');
//       }
//       const data = await response.json();
//       setWeatherData(data);   // Update the weather data state
//       setError(null);         // Clear any previous error
//     } catch (err) {
//       setWeatherData(null);
//       setError(err.message);  // Set an error message if the city is not found
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();   // Prevent page reload on form submit
//     if (city) {
//       fetchWeather(city);     // Call the API to fetch weather data for the input city
//     }
//   };

//   return (
//     <div>
//       <h2>Weather Dashboard</h2>

//       {/* Form to enter city name */}
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="text" 
//           placeholder="Enter city name" 
//           value={city}               // Value is tied to the state
//           onChange={(e) => setCity(e.target.value)}  // Update city state as the user types
//         />
//         <button type="submit">Get Weather</button>
//       </form>

//       {/* Display error message if any */}
//       {error && <p>{error}</p>}

//       {/* Display weather data if available */}
//       {weatherData && (
//         <div>
//           <h3>Weather in {weatherData.name}</h3>
//           <p>Temperature: {weatherData.main?.temp ?? 'N/A'}°C</p>   {/* Optional chaining with a fallback value */}
//           <p>Humidity: {weatherData.main?.humidity ?? 'N/A'}%</p>    {/* Handle missing humidity */}
//           <p>Conditions: {weatherData.weather?.[0]?.description ?? 'N/A'}</p>  {/* Handle missing conditions */}
//           <p>Visibility: {weatherData.visibility ? `${weatherData.visibility} meters` : 'N/A'}</p>  {/* Handle optional visibility */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Weather;

import React, { useState } from 'react';
import '../App.css';

function Weather({ addFavorite }) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  const handleAddFavorite = () => {
    if (weatherData) {
      addFavorite(weatherData.name); // Add the current city's name to favorites
    }
  };

  return (
    <div>
      <h2>Weather Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main?.temp ?? 'N/A'}°C</p>
          <p>Humidity: {weatherData.main?.humidity ?? 'N/A'}%</p>
          <p>Conditions: {weatherData.weather?.[0]?.description ?? 'N/A'}</p>
          <p>Visibility: {weatherData.visibility ? `${weatherData.visibility} meters` : 'N/A'}</p>
          <button onClick={handleAddFavorite}>Add to Favorites</button>
        </div>
      )}
    </div>
  );
}

export default Weather;