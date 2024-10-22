// import React from 'react';
// import './App.css';        // Keep the existing CSS import
// import Weather from './components/Weather';  // Import the Weather component

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Weather Dashboard</h1>   {/* Replace the logo and default content */}
//         <Weather />  {/* Add the Weather component here */}
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Weather from './components/Weather';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleLogin = (username) => {
    setUser(username); // Set the logged-in user
    // Load favorites from local storage or API if available
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Save to local storage
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user}!</h1>
          <Weather addFavorite={addFavorite} favorites={favorites} />
          <h3>Your Favorite Cities:</h3>
          <ul>
            {favorites.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;