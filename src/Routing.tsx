import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

import Home from './pages/Home/Home';
import Todo from './pages/Todo/Todo';

const Routing: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.loggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      const user = { ...storedUser, loggedIn: true };
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (storedUser) {
      const user = { ...storedUser, loggedIn: false };
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn(false);
    }
  };
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login"  element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todos"   element={
            loggedIn ? (
              <Todo handleLogout={handleLogout} />
            ) : (
              <Login handleLogin={handleLogin} loggedIn={loggedIn} />
            )
          } />
      </Routes>
    </Router>
  );
};

export default Routing;