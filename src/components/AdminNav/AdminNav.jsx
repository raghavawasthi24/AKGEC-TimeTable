import React, { useState } from "react";
import "./AdminNav.css";
import LogoutBtn from "../Logout/LogoutBtn";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// import { Menu } from '@mui/icons-material';

const AdminNav = () => {
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
      <div className="AdminNavbar">
        {/* {openNav?<CloseIcon sx={{margin:"3%",color:"white"}} onClick={closeMenu}/>:null} */}
        <button onClick={() => navigate("/myprofile")}>My Profile</button>
        <button onClick={() => navigate("/register")}>Register Teacher</button>
        <button onClick={() => navigate("/")}>View Student TimeTable</button>
        <button onClick={() => navigate("/admin")}>
          View Teacher TimeTable
        </button>
        <button onClick={() => navigate("/create-time-table")}>
          Create TimeTable
        </button>
        <LogoutBtn />
      </div>
      <div className={openNav ? "hide" : "AdminNavbarMobile"}>
        <div className={openNav ? "hide" : "menubar"} onClick={closeMenu}>
          <CloseIcon sx={{color:"white"}}/>
        </div>
        {/* {openNav?<CloseIcon sx={{margin:"3%",color:"white"}} onClick={closeMenu}/>:null} */}
        <button onClick={() => navigate("/myprofile")}>My Profile</button>
        <button onClick={() => navigate("/register")}>Register Teacher</button>
        <button onClick={() => navigate("/")}>View Student TimeTable</button>
        <button onClick={() => navigate("/admin")}>
          View Teacher TimeTable
        </button>
        <button onClick={() => navigate("/create-time-table")}>
          Create TimeTable
        </button>
        <LogoutBtn />
      </div>
    </>
  );
};

export default AdminNav;
