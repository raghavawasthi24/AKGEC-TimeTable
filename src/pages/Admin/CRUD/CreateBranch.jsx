import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const CreateBranch = () => {

    const [newBranch, setNewBranch] = useState();
    const [newBranchCode, setNewBranchCode] = useState();
    const[department,setDepartment]=useState([])
    const[allBranch,setAllBranch]=useState([])
    const [updateBranch, setUpdateBranch] = useState([]);
    const [updatedBranch, setUpdatedBranch] = useState({});
    const[dept,setDept]=useState()
    const[option,setOption]=useState()

    const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
    axios.defaults.headers.common["Authorization"] = AuthStr;


    useEffect(() => {
        if(option)
        axios
          .get(`${process.env.REACT_APP_URL}/departmentss/departments`)
          .then((res) => setDepartment(res.data));
      }, [option]);

    
      useEffect(() => {
        if(option==="UPDATE" &&  dept)
        axios
          .get(`${process.env.REACT_APP_URL}/departmentss/department_wise_branches/${dept}`)
          .then((res) => setAllBranch(res.data));
      }, [option,dept]);
      
      useEffect(() => {
        
        if(newBranch && option==="UPDATE"){
            axios
              .get(
                `${process.env.REACT_APP_URL}/departmentss/Branchupdate/${newBranch}`
              )
              .then((res) => (setUpdateBranch(res.data), setUpdatedBranch(res.data)));}
      }, [newBranch,option]);
    
      const handleSubmit = () => {
        const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
        axios.defaults.headers.common["Authorization"] = AuthStr;
        axios
          .post(`${process.env.REACT_APP_URL}/departmentss/BranchCreate`, {
            branch: newBranch,
            branchcode:newBranchCode,
            department:dept
          })
          .then((res) => toast.success("Branch Added Successfully"),setOption(),setNewBranch(),setNewBranchCode(),setDept());
      };
      const handleUpdate = () => {
        const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
        axios.defaults.headers.common["Authorization"] = AuthStr;
        axios
          .patch(
            `${process.env.REACT_APP_URL}/departmentss/Branchupdate/${newBranch}`,updatedBranch
          )
          .then((res) => toast.success("Updated Successfully"),setOption(),setUpdateBranch([]),setUpdatedBranch({}));
      };
      const handleDelete = () => {
        const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
        axios.defaults.headers.common["Authorization"] = AuthStr;
        axios
          .delete(
            `${process.env.REACT_APP_URL}/departmentss/Branchupdate/${newBranch}`
          )
          .then((res) => toast.success("Deleted Successfully"),setOption(),setUpdateBranch([]),setUpdatedBranch({}));
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
          Add Branch
        </Typography>
        <Box >
     
        <TextField
          sx={{margin:"1rem 0rem"}}
          fullWidth
          id="outlined-basic"
          label="Branch"
          variant="outlined"
          onChange={(e) => setNewBranch(e.target.value)}
        />
          <TextField
          fullWidth
          sx={{ margin:"1rem 0rem"}}
          id="outlined-basic"
          label="Branch Code"
          variant="outlined"
          onChange={(e) => setNewBranchCode(e.target.value)}
        />
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            label="Department"
            name="departments"
            defaultValue="Department"
            onChange={(e) => {
              setDept(e.target.value);
             
            }}
            
          >
            {department.map((val) => {
              return <MenuItem value={val.id}>{val.dept}</MenuItem>;
            })}
          </Select>
        </FormControl>
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
          Add Branch
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
          Update Branch
        </Typography> 
   

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            label="Department"
            name="departments"
          
            onChange={(e) => {
              setDept(e.target.value);
              setUpdateBranch([]);setUpdatedBranch({})
            }}
          >
            {department.map((val) => {
              return <MenuItem value={val.id}>{val.dept}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Branch</InputLabel>
          <Select
            label="Branch"
            name="Branch"
          
            onChange={(e) => {
              setNewBranch(e.target.value);
            }}
          >
            {allBranch.map((val) => {
              return <MenuItem value={val.id}>{val.branch}</MenuItem>;
            })}
          </Select>
        </FormControl>
   
        {Object.keys(updateBranch).length > 0? (
          <Box>
          <TextField
          sx={{margin:"1rem 0rem"}}
          fullWidth
          id="outlined-basic"
          label="Branch"
          variant="outlined"
          onChange={(e) =>
                      setUpdatedBranch({ ...updatedBranch, branch: e.target.value })
                    }
                    defaultValue={updateBranch.branch}
        />
          <TextField
          fullWidth
          sx={{ margin:"1rem 0rem"}}
          id="outlined-basic"
          label="Branch Code"
          variant="outlined"
          onChange={(e) =>
                      setUpdatedBranch({ ...updatedBranch, branchcode: e.target.value })
                    }
                    defaultValue={updateBranch.branchcode}
        />
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            label="Department"
            name="departments"
            defaultValue="Department"
            onChange={(e) => {
            
              setUpdatedBranch({ ...updatedBranch, department: e.target.value })
            }}
            defaultvalue={updateBranch.department}
            value={updatedBranch.department}
            
          >
            {department.map((val) => {
              return <MenuItem value={val.id}>{val.dept}</MenuItem>;
            })}
          </Select>
        </FormControl>
            
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
                Update Branch
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
                Delete Branch
              </Button>
            </Box>
          </Box>
        ) : null}
      </Container>
    ) : null}
  </Container>
  <ToastContainer/>
</>
  )
}

export default CreateBranch