import React from 'react';
import "./Header.css";
import axios from 'axios';

const Header = () => {
  const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
  axios.defaults.headers.common['Authorization'] = AuthStr;

  return (
    <div className='header'>
       <p>Timetable</p>
    </div>
  )
}

export default Header