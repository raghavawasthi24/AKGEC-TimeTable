import React, { useEffect, useState } from 'react';
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Nav from '../components/Nav/Nav';
import AdminNav from "../../../../components/AdminNav/AdminNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// let sectionData=[];
const CreatePDPLec = () => {
  let initialvalues={
    department:"",
    branch:"",
    period:"",
    day:"",
  }
  const periodsArr=[{period:"8:30-9:20",id:"1"},{period:"9:20-10:10",id:"2"},{period:"10:10-11:00",id:"3"},{period:"11:00-11:50",id:"4"},{period:"11:50-12:40",id:"5"},{period:"12:40-1:30",id:"6"},{period:"1:30-2:20",id:"7"},{period:"2:20-3:10",id:"8"},{period:"3:10-4:00",id:"9"},];

  const daysArr=[{day:"Monday",dayId:"1"},{day:"Tuesday",dayId:"2"},{day:"Wednesday",dayId:"3"},{day:"Thursday",dayId:"4"},{day:"Friday",dayId:"5"},{day:"Saturday",dayId:"6"}]

  const [department,setDepartment]=useState([]);
  const [formvalues,setFormvalues]=useState(initialvalues);
  const [branch,setBranch]=useState([]);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormvalues({...formvalues,[name]:value})
  }

  const handleDept = (e) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/department_wise_branches/${e.target.value}`
      )
      .then((res) => {
        console.log("jkfbjhfhkuejfh", res.data);
        setBranch(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/all_departments/2`
      )
      .then((resp) => {
        console.log(resp.data);
        setDepartment(resp.data);
        // console.log(department)
      })
      .catch((err) => {
        console.log(err);
      });
  },[])

  const createPDPTimetable=()=>{
    axios.post(`${process.env.REACT_APP_URL}/departmentss/pdp_lecture_create`,{
      day:formvalues.day,
      period:formvalues.period,
      branch:formvalues.branch
    }).then((res)=>{
      console.log(res);toast.success("Classes created Successfully");setFormvalues(initialvalues)
    }).catch((err)=>{toast.error("Invalid Details")})
    
  }
  

  return (
    <>
    <AdminNav/>
    <Nav/>
    <div className='createPDPLec' style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
       <FormControl sx={{ margin: "1rem",width:"60%" }}>
        <InputLabel>Department</InputLabel>
        <Select
          label="Department"
          name="department"
          value={formvalues.department}
          onChange={(e) => {
            handleChange(e);
            handleDept(e);
          }}
        >
          {department.map((val,key) => {
            return <MenuItem value={val.id} key={key}>{val.dept}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <FormControl sx={{ margin: "1rem",width:"60%" }}>
        <InputLabel>Branch</InputLabel>
        <Select
          label="Branch"
          name="branch"
          value={formvalues.branch}
          onChange={(e) => {
            handleChange(e);
            // deptHandler(e);
          }}
        >
          {branch.map((val,key) => {
            return <MenuItem value={val.id} key={key}>{val.branch}</MenuItem>;
          })}
        </Select>
      </FormControl>





      <FormControl sx={{ margin: "1rem",width:"60%" }}>
        <InputLabel>Period</InputLabel>
        <Select
          label="Period"
          name="period"
          value={formvalues.period}
          onChange={(e) => {
            handleChange(e);
            // yearHandler(e);
          }}
        >
          {periodsArr.map((val,key) => {
            return <MenuItem value={val.id} key={key}>{val.period}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <FormControl sx={{ margin: "1rem",width:"60%" }}>
        <InputLabel>Day</InputLabel>
        <Select
          label="Day"
          name="day"
          value={formvalues.day}
          onChange={(e) => {
            handleChange(e);
            // yearHandler(e);
          }}
        >
          {daysArr.map((val,key) => {
            return <MenuItem value={val.dayId} key={key}>{val.day}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <button className='button' onClick={createPDPTimetable}>Create</button>
    </div>
    <ToastContainer/>
    </>
  )
}

export default CreatePDPLec;
