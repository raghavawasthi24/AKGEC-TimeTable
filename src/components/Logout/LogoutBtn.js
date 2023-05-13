import React from 'react'
import { useNavigate } from 'react-router-dom'


const LogoutBtn = () => {
    const navigate = useNavigate()

    const clear = () =>{
        localStorage.removeItem("accessToken")
        navigate("/login")
    }
   
  return (

 
       
        <button className="View" style={{backgroundColor:"#252525",color:"white" }} onClick={clear}>
        Logout
      </button>
 
  )
}

export default LogoutBtn