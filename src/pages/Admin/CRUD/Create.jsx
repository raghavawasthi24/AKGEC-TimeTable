import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateDepartment from "./CreateDepartment";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../../components/AdminNav/AdminNav";
import CreateBranch from "./CreateBranch";
import CreateSubject from "./CreateSubject";
import CreateClass from "./CreateClass";

const Create = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState();
  
  useEffect(() => {
    if(!(localStorage.getItem("accessToken")&&(localStorage.getItem("user")==="Admin"))){
       navigate("/login")
    }
  }, [])
  

  return (
    <>
    <AdminNav/>
      <Container>
        <Box sx={{display:"flex",justifyContent:"center",margin:"2rem 0rem 1rem 0rem"}}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Select</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=" "
              name="radio-buttons-group"
              onChange={(e) => setOption(e.target.value)}
            >
              <FormControlLabel
                value="Department"
                control={<Radio />}
                label="Department"
              />
              <FormControlLabel
                value="Branch"
                control={<Radio />}
                label="Branch"
              />
              <FormControlLabel
                value="Subject"
                control={<Radio />}
                label="Subject"
              />
              <FormControlLabel
                value="Class"
                control={<Radio />}
                label="Class"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {option === "Department" ? <CreateDepartment /> : null}
        {option === "Branch" ? <CreateBranch /> : null}
        {option === "Subject" ? <CreateSubject/> : null}
        {option === "Class" ? <CreateClass /> : null}


      </Container>
    </>
  );
};

export default Create;
