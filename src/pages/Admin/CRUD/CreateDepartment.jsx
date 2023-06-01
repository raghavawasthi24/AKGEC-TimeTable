
import {
  Container,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateDepartment = () => {
  const [newDept, setNewDept] = useState();
  const [newDeptid, setNewDeptid] = useState();

  const [department, setDepartment] = useState([]);
  const [updateDept, setUpdateDept] = useState([]);
  const [updatedDept, setUpdatedDept] = useState({});
  const [option, setOption] = useState();

  const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
  axios.defaults.headers.common["Authorization"] = AuthStr;

  useEffect(() => {
    if(option === "UPDATE")
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/departments`)
      .then((res) => setDepartment(res.data));
  }, [option]);

  const fetchinfo = (newDept) => {
    if(newDept && option==="UPDATE"){
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/departmentupdate/${newDept}`
      )
      .then((res) => (setUpdateDept(res.data), setUpdatedDept(res.data)));}
  };
  useEffect(() => {
    if(option==="UPDATE")
    fetchinfo(newDept);
  }, [newDept,option]);

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_URL}/departmentss/departmentCreate`, {
        dept: newDept,
        deptid: newDeptid,
      })
      .then((res) => toast.success("Department Added Successfully"),setOption(),setNewDept(),setUpdateDept([]),setUpdatedDept({}));
  };
  const handleUpdate = () => {
    axios
      .patch(
        `${process.env.REACT_APP_URL}/departmentss/departmentupdate/${newDept}`,
        updatedDept
      )
      .then((res) => toast.success("Updated Successfully"),setOption());
  };
  const handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_URL}/departmentss/departmentupdate/${newDept}`
      )
      .then((res) => toast.success("Deleted Successfully"),setOption());
  };
  return (
    <>
      <Container
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign:"center"}}>
            Select Option
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=" "
            name="radio-buttons-group"
            row
            onChange={(e) => setOption(e.target.value)}
          >
            <FormControlLabel value="ADD" control={<Radio />} label="ADD" />
            <FormControlLabel
              value="UPDATE"
              control={<Radio />}
              label="UPDATE"
            />
          </RadioGroup>
        </FormControl>
        {option === "ADD" ? (
          <Box >
            <Typography
              component="h1"
              variant="h5"
              style={{ margin: "1rem 0rem",textAlign:"center" }}
            >
              Add Department
            </Typography>
            <Box >
            <TextField
              sx={{margin:"1rem 0rem"}}
              fullWidth
              id="outlined-basic"
              label="Department"
              variant="outlined"
              onChange={(e) => setNewDept(e.target.value)}
            />
              <TextField
              fullWidth
              sx={{ margin:"1rem 0rem"}}
              id="outlined-basic"
              label="Department Id"
              variant="outlined"
              onChange={(e) => setNewDeptid(e.target.value)}
            />
            </Box>
            <Box sx={{ display: "flex",justifyContent:"center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#FBC705",
                borderRadius: "18px",
              }}
              onClick={handleSubmit}
              // disabled={!submitbtn}
            >
              Add Department
            </Button>
            </Box>
            </Box>
        ) : null}

        {option === "UPDATE" ? (
          <Container>

            <Typography
              component="h1"
              variant="h5"
              style={{ margin: "1rem 0rem",textAlign:"center" }}
            >
              Update Department
            </Typography>
       
   
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                label="Department"
                name="departments"
                value={newDept}
                onChange={(e) => {
                  setNewDept(e.target.value);
                  setUpdateDept([]);
                  setUpdatedDept({});
                }}
                
              >
                {department.map((val) => {
                  return <MenuItem value={val.id}>{val.dept}</MenuItem>;
                })}
              </Select>
            </FormControl>

            {Object.keys(updateDept).length > 0 ? (
              <Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ margin: "1rem 0rem" }}
                    fullWidth
                    id="outlined-basic"
                    label="Department"
                    variant="outlined"
                    onChange={(e) =>
                      setUpdatedDept({ ...updatedDept, dept: e.target.value })
                    }
                    defaultValue={updateDept.dept}
                  />
                  <TextField
                    sx={{ margin: "1rem 0rem" }}
                    fullWidth
                    id="outlined-basic"
                    label="Department ID"
                    variant="outlined"
                    onChange={(e) =>
                      setUpdatedDept({ ...updatedDept, deptid: e.target.value })
                    }
                    defaultValue={updateDept.deptid}
                  />
                </Box>
                <Box sx={{ display: "flex",justifyContent:"center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#FBC705",
                      borderRadius: "18px",
                      marginRight: "2rem",
                    }}
                    onClick={handleUpdate}
                    // disabled={!submitbtn}
                  >
                    Update Department
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "red",
                      borderRadius: "18px",
                    }}
                    onClick={handleDelete}
                    // disabled={!submitbtn}
                  >
                    Delete Department
                  </Button>
                </Box>
              </Box>
            ) : null}
          </Container>
        ) : null}
      </Container>
      <ToastContainer/>
    </>
  );
};

export default CreateDepartment;
