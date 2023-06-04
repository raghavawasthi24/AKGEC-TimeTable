import React from "react";
// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate=useNavigate();
  const PDPArr=["View PDP Schedule","Create PDP Lecture","Update/Delete PDP Lecture"];
  const handlePdpLec=(e)=>{
    if(e.target.value==="Create PDP Lecture")
    navigate("/createPDP")
    if(e.target.value==="View PDP Schedule")
    navigate("/pdp-oe-lectures")
    if(e.target.value==="Update/Delete PDP Lecture")
    navigate("/editPDPLectures")
  }
  return (
    <div className="nav-pdp">
      <FormControl fullWidth>
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
