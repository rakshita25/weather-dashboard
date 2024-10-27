import React, { useState } from 'react';
import Weather from './components/Weather';
import Login from './components/login';

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