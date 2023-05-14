import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const LogoutBtn = () => {
    const navigate = useNavigate()
    const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
    axios.defaults.headers.common['Authorization'] = AuthStr;

    const clear = () =>{

      axios.post(`${process.env.REACT_APP_URL}/accounts/logout1/`
       
      )
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")

        navigate("/login")
    }
   
  return (

 
       
        <button className="View" style={{backgroundColor:"#252525",color:"white" }} onClick={clear}>
        Logout
      </button>
 
  )
}

export default LogoutBtn