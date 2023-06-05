import React from "react";
import "./Nav.css";
// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate=useNavigate();

  const PDPArr=["View PDP Schedule","Create PDP Lecture"];
  const OEArr=["View OE Schedule","Create OE Lecture"];

  const handleOELec=(e)=>{
    if(e.target.value==="Create OE Lecture")
    navigate("/createOE")
    if(e.target.value==="View OE Schedule")
    navigate("/viewOElectures")
    if(e.target.value==="Update/Delete OE Lecture")
    navigate("/editOELectures")
  }

  const handlePdpLec=(e)=>{
    if(e.target.value==="Create PDP Lecture")
    navigate("/createPDP")
    if(e.target.value==="View PDP Schedule")
    navigate("/viewPDPlectures")
    if(e.target.value==="Update/Delete PDP Lecture")
    navigate("/editPDPLectures")
  }
  return (
    <div className="nav-pdp">
      <FormControl sx={{width:"10rem",margin:"0.5rem"}}>
        <InputLabel id="demo-simple-select-label">OE Lecture</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="OE Lecture"
          onChange={handleOELec}
        >
          {
            OEArr.map((item)=>{
              return(<MenuItem value={item}>{item}</MenuItem>)
            })
          }
        </Select>
      </FormControl>

      <FormControl sx={{width:"10rem",margin:"0.5rem"}}>
        <InputLabel id="demo-simple-select-label">PDP Lecture</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="PDP Lecture"
          onChange={handlePdpLec}
        >
          {
            PDPArr.map((item)=>{
              return(<MenuItem value={item}>{item}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default Nav;
