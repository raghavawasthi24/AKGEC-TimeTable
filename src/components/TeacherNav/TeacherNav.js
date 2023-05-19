
import React, { useState } from "react";

import LogoutBtn from "../Logout/LogoutBtn";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// import { Menu } from '@mui/icons-material';
import "./TeacherNav.css"
const TeacherNav = () => {
  const [openNav, setOpenNav] = useState(true);
  const navigate = useNavigate();

  const openMenu = () => {
    setOpenNav(false);
  };

  const closeMenu = () => {
    setOpenNav(true);
  };

  return (
    <>
      <div className={openNav ? "menubar" : "hide"} onClick={openMenu}>
        <MenuIcon />
      </div>
      <div className="AdminNavbar" id="teachernav">
        {/* {openNav?<CloseIcon sx={{margin:"3%",color:"white"}} onClick={closeMenu}/>:null} */}
        <button style={{padding:"0.8rem 1rem"}} onClick={()=>navigate("/myprofile" )} >My Profile</button>
          <button style={{padding:"0.5rem 1rem"}} onClick={()=>navigate("/teacher")}>View TimeTable</button>
          <LogoutBtn/>
       
      </div>
      <div className={openNav ? "hide" : "AdminNavbarMobile"}>
        <div className={openNav ? "hide" : "menubar"} onClick={closeMenu}>
          <CloseIcon sx={{color:"white"}}/>
        </div>
        {/* {openNav?<CloseIcon sx={{margin:"3%",color:"white"}} onClick={closeMenu}/>:null} */}
        <button style={{padding:"0.8rem 1rem"}} onClick={()=>navigate("/myprofile" )} >My Profile</button>
          <button style={{padding:"0.5rem 1rem"}} onClick={()=>navigate("/teacher")}>View TimeTgit able</button>
          <LogoutBtn/>
      </div>
    </>
  );
};

export default TeacherNav;
