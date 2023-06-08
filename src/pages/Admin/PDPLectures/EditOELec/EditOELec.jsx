import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MultiSelect } from "primereact/multiselect";
import { lecObj } from "../ViewOELectures/OELecture";
import Nav from '../components/Nav/Nav';
import AdminNav from "../../../../components/AdminNav/AdminNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FormGroup, TextField } from "@mui/material";

let sectionData = [];
let prevSec=[];
const EditOELec = () => {
  const year = ["1", "2", "3", "4"];
  let initialvalues = {
    year: lecObj.year,
    departments: lecObj.dept,
    period:lecObj.period
  };

  const periodsArr=[{period:"8:30-9:20",id:"1"},{period:"9:20-10:10",id:"2"},{period:"10:10-11:00",id:"3"},{period:"11:00-11:50",id:"4"},{period:"11:50-12:40",id:"5"},{period:"12:40-1:30",id:"6"},{period:"1:30-2:20",id:"7"},{period:"2:20-3:10",id:"8"},{period:"3:10-4:00",id:"9"},];

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
    console.log(formvalues);
  };

  const [department, setDepartment] = useState([]);
  const [formvalues, setFormvalues] = useState(initialvalues);
  const [sections, setSections] = useState([]);
  const [selSections, setSelSections] = useState([]);
  const yearHandler = (e) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/all_departments/${e.target.value}`
      )
      .then((resp) => {
        console.log(resp.data);
        setDepartment(resp.data);
        console.log(lecObj)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDept = (e) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/department_wise_sections/${formvalues.year}/${e.target.value}`
      )
      .then((res) => {
        console.log("jkfbjhfhkuejfh", res.data);
        setSections(res.data);
        res.data.map((item) =>
          sectionData.push({ name: item.section, id: item.id })
        );
        console.log(sectionData);
        setSections(sectionData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createClasses=()=>{
    let sectionArr=[];
    selSections.map((item)=>sectionArr.push(item.id));
    axios.put(`${process.env.REACT_APP_URL}/departmentss/oe_lectureRUD/${lecObj.lecId}`,{
      year:formvalues.year,
      period:formvalues.period,
      department:formvalues.departments,
      sections:sectionArr
    }).then((res)=>{console.log(res);toast.success("Classes updated Successfully")})
    .catch((err)=>{console.log(err);toast.error("Invalid Details")})
  }

  useEffect(()=>{
    sectionData=[];
    console.log(lecObj,lecObj.sections);
    prevSec=[];
    
    axios
    .get(
      `${process.env.REACT_APP_URL}/departmentss/all_departments/${formvalues.year}`
    )
    .then((resp) => {
      console.log(resp.data);
      setDepartment(resp.data);
      console.log(lecObj)
    
    })
    .catch((err) => {
      console.log(err);
    });


    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/department_wise_sections/${formvalues.year}/${formvalues.departments}`
      )
      .then((res) => {
        console.log("jkfbjhfhkuejfh", res.data);
        setSections(res.data);
        res.data.map((item) =>
          sectionData.push({ name: item.section, id: item.id })
        );
        console.log(sectionData);
        setSections(sectionData);
        lecObj.sections.map((item)=>{return(prevSec.push({id:item.id,name:item.section}))})
    console.log(prevSec)
    setSelSections(prevSec);
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line
  },[])

  return (
    <>
    <AdminNav/>
    <Nav/>
    <div className="createPDP" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      
      <FormControl sx={{ margin: "1rem",width:"60%" }}>
        <InputLabel>Year</InputLabel>
        <Select
          label="Year"
          name="year"
          value={formvalues.year}
          defaultValue={lecObj.year}
          onChange={(e) => {
            handleChange(e);
            yearHandler(e);
          }}
        >
          {year.map((val) => {
            return <MenuItem value={val}>{val}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ margin: "1rem",width:"60%" }}>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          label="Department"
          name="departments"
          value={formvalues.departments}
          // defaultValue={lecObj.dept}
          onChange={(e) => {
            handleChange(e);
            handleDept(e);
          }}
        >
          {department.map((val) => {
            return <MenuItem value={val.deptid}>{val.dept}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <MultiSelect
         style={{ margin: "1rem",width:"60%" }}
        value={selSections}
        onChange={(e) => setSelSections(e.value)}
        options={sections}
        optionLabel="name"
        placeholder="Select Sections"
        display="chip"
        className="w-full md:w-20rem"
      />

      <FormControl sx={{ margin: "1rem",width:"60%" }}>
        <InputLabel id="demo-simple-select-label">Select Period</InputLabel>
        <Select
          label="Select Period"
          name="period"
          value={formvalues.period}
          // defaultValue={lecObj.period}
          onChange={(e) => {
            handleChange(e)
          }}
        >
          {periodsArr.map((val) => {
            return <MenuItem value={val.id}>{val.period}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <button className="button" onClick={createClasses}>Update</button>
    </div>
    <ToastContainer/>
    </>
  );
};

export default EditOELec;
