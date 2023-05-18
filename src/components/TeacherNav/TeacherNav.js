
import React, { useState,useRef } from 'react';
import LogoutBtn from '../Logout/LogoutBtn';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; 
// import { Menu } from '@mui/icons-material';

const AdminNav = () => {
  const [openNav,setOpenNav]=useState(false);
  const menubar=useRef();
  const adminNavbar=useRef();
  const navigate = useNavigate()

  const openMenu=()=>{
    setOpenNav(true);
    adminNavbar.current.style.display="block";
  }
  const closeMenu=()=>{
    setOpenNav(false);
    adminNavbar.current.style.display="none";
  }
  return (
    <>
      <div className='menubar' ref={menubar} onClick={openMenu}>
        <MenuIcon/>
      </div>
      <div className='AdminNavbar' ref={adminNavbar}>
          {openNav?<CloseIcon sx={{margin:"3%",color:"white"}} onClick={closeMenu}/>:null}
          <button  onClick={()=>navigate("/teacherprofile" )} >View Profile Data</button>
          <button  onClick={()=>navigate("/teacher")}>View TimeTable</button>
          <LogoutBtn/>
      </div>
    </>
  )
}

export default AdminNav