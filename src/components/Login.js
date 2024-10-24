// import React, { useState } from 'react';

// function Login({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real application, you would send the username/password to the server
//     if (username && password) {
//       onLogin(username); // Call the onLogin function passed as a prop
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Welcome to Weather Dashboard!</h1>
//       <h4>Please enter your login credentials below</h4>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;

import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the username/password to the server
    if (username && password) {
      onLogin(username); // Call the onLogin function passed as a prop
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome to Weather Dashboard!</h1>
      <h4>Please enter your login credentials below</h4>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;