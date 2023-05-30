
import React, { useState } from "react";
import "../AdminNav/AdminNav.css";
import LogoutBtn from "../Logout/LogoutBtn";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import { Drawer,Box } from "@mui/material";


const TeacherNav = () => {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const openMenu = () => {
    setOpenNav(true);
  };


  return (
    <>
      <MenuIcon className="icon" onClick={openMenu} />
      <Drawer anchor="left" className="AdminNavbar" open={openNav} onClose={()=>setOpenNav(false)} >
        {/* {openNav?<CloseIcon sx={{margin:"3%",color:"white"}} onClick={closeMenu}/>:null} */}
        <Box className="buttonBox">
        <button style={{padding:"0.8rem 1rem"}} onClick={()=>navigate("/myprofile" )} >My Profile</button>
          <button style={{padding:"0.5rem 1rem"}} onClick={()=>navigate("/teacher")}>View TimeTable</button>
        
        <Box className="logoutBtnSide">
        <LogoutBtn  />
        </Box>
        
        </Box>
      </Drawer>
      
    </>
  );
};

export default TeacherNav;


