import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Todo from './pages/Todo/Todo';

const Routing: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);


  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        
      });

      if (response.ok) {
        const data = await response.json();
        const { access, refresh } = data;

        // Store tokens securely, such as in browser cookies or local storage
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        setLoggedIn(true);
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout =async () => {
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
       
        
      });

      if (response.ok) {
        // Clear tokens from storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        setLoggedIn(false);
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/todos"
          element={
            loggedIn ? (
              <Todo handleLogout={handleLogout} />
            ) : (
              <Login handleLogin={handleLogin} loggedIn={loggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default Routing;
