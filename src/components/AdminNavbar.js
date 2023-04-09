import React from 'react';
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className='AdminNavbar'>
        <button>View Student TimeTable</button>
        <button>View Teacher TimeTable</button>
        <button>Create TimeTable</button>
        <button style={{backgroundColor:"black",color:"white"}}>Log Out</button>
    </div>
  )
}

export default AdminNavbar