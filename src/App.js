// import React, { useState } from 'react';
// import Weather from './components/Weather';
// import Login from './components/Login';

// function App() {
//   const [user, setUser] = useState(null);
//   const [favorites, setFavorites] = useState([]);

//   const handleLogin = (username) => {
//     setUser(username); // Set the logged-in user
//     // Load favorites from local storage or API if available
//     const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     setFavorites(storedFavorites);
//   };

//   const addFavorite = (city) => {
//     if (!favorites.includes(city)) {
//       const newFavorites = [...favorites, city];
//       setFavorites(newFavorites);
//       localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Save to local storage
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <>
//           <h1>Welcome, {user}!</h1>
//           <Weather addFavorite={addFavorite} favorites={favorites} />
//         </>
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Weather from './components/Weather';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null); // Store the current logged-in user

  const handleLogin = (username) => {
    setUser(username); // Set the logged-in user
  };

  const handleLogout = () => {
    setUser(null); // Clear user on logout
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user}!</h1>
          {/* Pass the current user and the logout function to Weather */}
          <Weather currentUser={user} onLogout={handleLogout} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;