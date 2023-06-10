import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import Sidetitle from "../../Components/Sidetitle"

interface Props {
  handleLogin: (username: string, password: string) => void;
  loggedIn: boolean;
}

const Login = ({ handleLogin, loggedIn }: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        handleLogin(username, password);
        navigate('/todos');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedIn) {
    navigate('/todos');
    alert("You have already logged in");
  }

  return (
    <div className='login-main container-fluid d-flex'>
      <div className='row row-cols-2 row-cols-md-1'>
        <Sidetitle title="Login." />
        <div className='login-box d-flex p-5'>
          <form onSubmit={handleSubmit}>
            <div><br /><br /><br />
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div><br />
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div><br />
            <div>
              <button className='login-btn' type="submit">Login</button>
              <Link to='/'><button className='login-btn'>Back</button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
