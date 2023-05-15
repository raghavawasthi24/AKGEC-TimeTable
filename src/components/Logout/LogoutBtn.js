import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const styled = {
    logout: {
      width: "100vw",
      padding: "1% 0",
      position: "relative",
    },
    logoutBtn: {
      padding: "0.8rem 1rem",
      width: "8rem",
      fontWeight: "600",
      backgroundColor: "#FBBB00",
      border: " none",
      borderRadius: " 20px",
      fontSize: "0.8rem",
      position: "absolute",
      top: "5%",
      right: "3%",
      "@media (max-width: 628px)": {
        width: "4rem",
      }
    },
    
  };
  const navigate = useNavigate();

  const clear = () => {
    const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));

    axios.post(`${process.env.REACT_APP_URL}/accounts/logout1/`, {
      headers: {
        Authorization: AuthStr,
      },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div style={styled.logout}>
      <button style={styled.logoutBtn} onClick={clear}>
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
