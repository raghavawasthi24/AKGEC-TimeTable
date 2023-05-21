import React, { useEffect } from 'react';
import "./Header.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {

 const navigate = useNavigate()
 
  useEffect(() => {
      setInterval(() => {
        if(localStorage.getItem('refreshToken')){
          const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
          axios.defaults.headers.common['Authorization'] = AuthStr;
        axios.post(`${process.env.REACT_APP_URL}/accounts/refresh-token`,{token: localStorage.getItem('refreshToken')})
        .then((response)=>{
          (localStorage.setItem("accessToken",response.data.access))}
          )
        .catch((err)=>{
          if(err.response.status === 400 ){
            localStorage.clear()
            navigate("/login")
          }
        }
          )
        }
      }, 280000);
  }, [])
  

  return (
    <div className='header'>
       <p>Timetable</p>
    </div>
  )
}

export default Header