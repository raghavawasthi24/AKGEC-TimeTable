import React from "react";
import axios from "axios";
import "./LogoutBtn.css"
import { useNavigate } from "react-router-dom";
const LogoutBtn = () => {
  const navigate = useNavigate();

  const clear = () => {
    axios.post(`${process.env.REACT_APP_URL}/accounts/logout1/`);
    localStorage.clear();
    delete axios.defaults.headers.common.Authorization;

    navigate("/login");
  };

  return (
    <button className="logoutBtn" onClick={clear}>
      Logout
    </button>
  );
};
export default LogoutBtn;
