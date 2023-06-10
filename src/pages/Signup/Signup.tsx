import React, { useState } from 'react';
import Sidetitle from '../../Components/Sidetitle';
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          navigate('/login');
        } else {
          throw new Error('Error registering user');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='sign-main container-fluid d-flex p-5'>
      <div className='row row-cols-2 row-cols-md-1'>
        <Sidetitle title='Signup.' />
        <div className='sign-box'>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div><br />
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div><br />
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div><br />
            <div>
              <label>Confirm Password:</label>
              <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div><br />
            <button className='signbtn' type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

