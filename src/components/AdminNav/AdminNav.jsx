import React, { useState } from "react";
import "./AdminNav.css";
import LogoutBtn from "../Logout/LogoutBtn";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import { Drawer,Box } from "@mui/material";


const AdminNav = () => {
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
        <button onClick={() => navigate("/myprofile")}>My Profile</button>
        <button onClick={() => navigate("/allteacher")}>Teachers Data</button>

        <button onClick={() => navigate("/register")}>Register Teacher</button>
        <button onClick={() => navigate("/")}>View Student TimeTable</button>
        <button onClick={() => navigate("/admin")}>
          View Teacher TimeTable
        </button>
        <button onClick={() => navigate("/create-time-table")}>
          Create TimeTable
        </button>
        <button onClick={() => navigate("/viewOElectures")}>
          PDP/OE Lectures
        </button>
        <button onClick={() => navigate("/create")}>
          Add or Update
        </button>
        <Box className="logoutBtnSide">
        <LogoutBtn  />
        </Box>
        
        </Box>
      </Drawer>
      
    </>
  );
};

export default AdminNav;
