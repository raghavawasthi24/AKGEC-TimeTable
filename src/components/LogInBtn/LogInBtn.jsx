import React from "react";
import "./LogInBtn.css"
import { useNavigate } from "react-router-dom";

const LogInBtn = () => {
 
  const navigate = useNavigate();
  const logIn = () => {
    navigate("/login");
  };
  return (
    <button className="loginBtn" onClick={logIn}>
      Login As Admin
    </button>
  );
};

export default LogInBtn;
