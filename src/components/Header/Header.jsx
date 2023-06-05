import React, { useEffect } from 'react';
import "./Header.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {

 const navigate = useNavigate()

  useEffect(() => {
    if((localStorage.getItem("accessToken")&&(localStorage.getItem("user")==="Admin"))){
      
   
    setInterval(() => {
      const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
      axios.defaults.headers.common['Authorization'] = AuthStr;
    axios.get(`${process.env.REACT_APP_URL}/accounts/token_check/`).catch((res)=>{

    if(res.response.status === 401){
      if(localStorage.getItem('refreshToken')){
         
        axios.post(`${process.env.REACT_APP_URL}/accounts/refresh-token`,{token: localStorage.getItem('refreshToken')})
        .then((response)=>{
          (localStorage.setItem("accessToken",response.data.access))}
          )
        .catch((err)=>{
          if(err.response.status === 400 ){
            localStorage.clear()
            navigate("/login")
          }
          else if(err.response.status === 401){
            localStorage.clear()
            navigate("/login")
          }
        }
          )
        }
    }
  })  }, 100000);}
  }, [])
  

  return (
    <div className='header'>
       <p>Timetable</p>
    </div>
  )
}

export default Header