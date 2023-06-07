import React, { useState } from 'react';
import Sidetitle from '../../Componens/Sidetitle';
import"./Signup.css"
import {useNavigate} from "react-router-dom"
function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();



  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password==confirmPassword){
    const user = { name, email,password };
    localStorage.setItem('user', JSON.stringify(user));
    if(name!=='' && email!=='' && password!=='') {
      navigate('/login');
    }
  }

};

  return (
    <div className='sign-main container-fluid d-flex p-5'>
       <div className='row row-cols-2 row-cols-md-1'>
        <Sidetitle title='Signup.'/>
      <div className='sign-box'>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        </div><br />
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div><br />
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div><br />
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div><br />
          <button  className='signbtn' type="submit">Sign Up</button>
         
        
      </form>
   
    </div></div>
      
      </div>
   
  );
}

export default SignupPage;
