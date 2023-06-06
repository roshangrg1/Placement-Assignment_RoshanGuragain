import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      const { token } = response.data;

      // Store the token in localStorage or other secure storage method
      // You can also implement more advanced authentication mechanisms

      setUser({ email, token });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    // Clear the stored token and user data
    // Remove the token from localStorage or other storage method
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} user={user} />}
        />
        {user ? (
          <Route
            path="/dashboard"
            element={<TaskDashboard user={user} onLogout={handleLogout} />}
          />
        ) : (
          <Navigate to="/login" />
        )}
      </Routes>
    </Router>
  );
}

export default App;
