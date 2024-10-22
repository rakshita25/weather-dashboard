import React from 'react';
import './App.css';        // Keep the existing CSS import
import Weather from './components/Weather';  // Import the Weather component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>   {/* Replace the logo and default content */}
        <Weather />  {/* Add the Weather component here */}
      </header>
    </div>
  );
}

export default App;