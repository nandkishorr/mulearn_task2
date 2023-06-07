import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import"./Login.css"
import Sidetitle from '../../Componens/Sidetitle';
interface Props {
  handleLogin: (email: string, password: string) => void;
  loggedIn: boolean;
}

const Login = ({ handleLogin, loggedIn }: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
    navigate('/todos');
  }

  if (loggedIn) {
    return <p>You are already logged in!</p>;
  }

  return (
    <div className='login-main container-fluid d-flex'>
    <div className='row row-cols-2 row-cols-md-1'><Sidetitle title="Login."/>
      <div className='login-box d-flex p-5'>
      
      <form onSubmit={handleSubmit}>
        <div><br /><br /><br />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
    </div> </div>
    
  );
}

export default Login;