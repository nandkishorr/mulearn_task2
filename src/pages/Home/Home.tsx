
import {useNavigate} from "react-router-dom"
import "./Home.css"
import { BsCheck2Circle } from 'react-icons/bs';
import Sidetitle from '../../Componens/Sidetitle';
function Home() {
  const navigate = useNavigate();
  const ToLogin = () => {
    navigate('/login');
  };

  const ToSignup = () => {
    navigate('/signup');
  };
  
  return (
    <div className='home container-fluid d-flex p-5'>
   <div className="row row-cols-2 row-cols-md-1">
    <Sidetitle title="Welcome."/>
      <div className='home-main p-3'>
        <div className='main-top d-flex'>
          <h1 >ToDos.</h1><BsCheck2Circle/></div>
          <div className='main-content py-5 px-3'>Welcome to TodoApp, the ultimate solution for managing your tasks and boosting your productivity. Whether you're a busy professional, a student with a hectic schedule, or a busy parent juggling multiple responsibilities, TodoApp is here to simplify your life. With our intuitive features and user-friendly interface, staying organized and achieving your goals has never been easier. Join thousands of satisfied users and experience the power of TodoApp today.</div>
        <div className='main-bottom mt-5 d-flex'>
          <button onClick={ToLogin} className='login'>Login</button>
          <button onClick={ToSignup} className='signup'>Signup</button>
        </div>
      </div></div> 

    </div>
  )
}

export default Home
