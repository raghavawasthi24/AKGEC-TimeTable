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

const CreateClass = () => {
const initialvalues ={
    Year:"",
    Department:"",
    Branch:"",
    Lunch:"",
    Section:""
}
const [formValues,setFormValues]=useState(initialvalues)
const[option,setOption]=useState()
const[section,setSection]=useState()
const[department,setDepartment]=useState([])
const[allBranch,setAllBranch]=useState([])
const[allSection,setAllSection]=useState([])
const [updateClass, setUpdateClass] = useState([]);
const [updatedClass, setUpdatedClass] = useState({});

const yearArray = [1,2,3,4]
const Luncharray =[{lunch:"12:40-1:30",id:'0'},{lunch:"1:30-2:20",id:'1'}]


const inputhandler = (e) =>{
    const{name,value}=e.target;
    setFormValues({...formValues,[name]:value})

}
useEffect(() => {
    console.log(formValues.Year)
    if(option && formValues.Year)
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/all_departments/${formValues.Year}`)
      .then((res) => setDepartment(res.data));
  }, [option,formValues.Year]);
  useEffect(() => {
    if(option &&  formValues.Department)
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/department_wise_branches/${formValues.Department}`)
      .then((res) => setAllBranch(res.data));
  }, [option,formValues.Department]);
  useEffect(() => {
    if(section && option==="UPDATE"){
        axios
          .get(
            `${process.env.REACT_APP_URL}/departmentss/Classupdate/${section}`
          )
          .then((res) => (setUpdateClass(res.data), setUpdatedClass(res.data)));}
  }, [section,option]);
  useEffect(() => {
    if((formValues.Year&&formValues.Department)&& option==="UPDATE"){
        axios
          .get(
            `${process.env.REACT_APP_URL}/departmentss/department_wise_sections/${formValues.Year}/${formValues.Department}`
          )
          .then((res) => (setAllSection(res.data)));}
  }, [formValues.Year,formValues.Department,option]);
  
  
  const handleSubmit = () => {
    console.log(formValues)
    axios
      .post(`${process.env.REACT_APP_URL}/departmentss/ClassCreate`,{
        year: formValues.Year,
        department: formValues.Department,
        branch: formValues.Branch,
        lunch:formValues.Lunch,
        section:formValues.Section
        
      })
      .then((res) => toast.success("Subject Added Successfully"),setOption());
  };
  const handleUpdate = () => {
    // console.log(updatedClass)
    axios
      .patch(
        `${process.env.REACT_APP_URL}/departmentss/Subjectupdate/${section}`,updatedClass
      )
      .then((res) => setOption(),setUpdateClass([]),setUpdatedClass({}),toast.success("Updated Successfully"));
  };
  const handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_URL}/departmentss/Subjectupdate/${section}`
      )
      .then((res) => setOption(),setUpdateClass([]),setUpdatedClass({}),toast.success("Deleted Successfully"));
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
          Add Class
        </Typography>
        <Box >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            label="Year"
            name="Year"
            defaultValue="Year"
            onChange={inputhandler}
            value={formValues.Year}

            
          >
            {yearArray.map((val) => {
              return <MenuItem value={val}>{val}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            label="Department"
            name="Department"
            defaultValue="Department"
            onChange={inputhandler}
            value={formValues.Department}
            
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
            onChange={inputhandler}
            value={formValues.Branch}
          >
            {allBranch.map((val) => {
              return <MenuItem value={val.id}>{val.branch}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Lunch</InputLabel>
          <Select
            label="Lunch"
            name="Lunch"
            onChange={inputhandler}
            value={formValues.Lunch}
          >
            {Luncharray.map((val) => {
              return <MenuItem value={val.id}>{val.lunch}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
          value={formValues.Section}
          sx={{margin:"1rem 0rem"}}
          fullWidth
          id="outlined-basic"
          label="Section"
          name='Section'
          variant="outlined"
          onChange={inputhandler}
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
          Add Subject
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
          Update Section
        </Typography> 
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            label="Year"
            name="Year"
            defaultValue="Year"
            onChange={inputhandler}
            value={formValues.Year}

            
          >
            {yearArray.map((val) => {
              return <MenuItem value={val}>{val}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            label="Department"
            name="Department"
            defaultValue="Department"
            onChange={inputhandler}
            value={formValues.Department}
            
          >
            {department.map((val) => {
              return <MenuItem value={val.id}>{val.dept}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Section</InputLabel>
          <Select
            label="Section"
            name="Section"
            onChange={(e)=>setSection(e.target.value)}
          
          >
            {allSection.map((val) => {
              return <MenuItem value={val.id}>{val.section}</MenuItem>;
            })}
          </Select>
        </FormControl>

     
   
        {Object.keys(updateClass).length > 0 ? (
          <Box>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            label="Year"
            name="Year"
            defaultValue="Year"
            onChange={(e) =>
                      setUpdatedClass({ ...updatedClass, year : e.target.value })
                    }
            
            defaultvalue={updateClass.year}
            value={updatedClass.year}


            
          >
            {yearArray.map((val) => {
              return <MenuItem value={val}>{val}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            label="Department"
            name="Department"
            defaultValue="Department"
            onChange={(e) =>
                      setUpdatedClass({ ...updatedClass, department : e.target.value })
                    }
            
            defaultvalue={updateClass.department}
            value={updatedClass.department}

            
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
            onChange={(e) =>
                      setUpdatedClass({ ...updatedClass, branch : e.target.value })
                    }
            
            defaultvalue={updateClass.branch}
            value={updatedClass.branch}

          >
            {allBranch.map((val) => {
              return <MenuItem value={val.id}>{val.branch}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Lunch</InputLabel>
          <Select
            label="Lunch"
            name="Lunch"
            onChange={(e) =>
                      setUpdatedClass({ ...updatedClass, lunch : e.target.value })
                    }
            
            defaultvalue={updateClass.lunch}
            value={updatedClass.lunch}

          >
            {Luncharray.map((val) => {
              return <MenuItem value={val.id}>{val.lunch}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
         
          sx={{margin:"1rem 0rem"}}
          fullWidth
          id="outlined-basic"
          label="Section"
          name='Section'
          variant="outlined"
          onChange={(e) =>
                      setUpdatedClass({ ...updatedClass, section : e.target.value })
                    }
            
            defaultvalue={updateClass.section}
            value={updatedClass.section}

        />
            
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

export default CreateClass