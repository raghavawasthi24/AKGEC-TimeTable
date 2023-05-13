import React from 'react';
import "./AdminNav.css";
import LogoutBtn from '../Logout/LogoutBtn';
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate()
  return (
    <div className='AdminNavbar'>
        <button className='View' onClick={()=>navigate("/")}>View Student TimeTable</button>
        <button className='View' onClick={()=>navigate("/admin")}>View Teacher TimeTable</button>
        <button className='View' onClick={()=>navigate("/create-time-table")}>Create TimeTable</button>
        <LogoutBtn/>
    </div>
  )
}

export default AdminNav