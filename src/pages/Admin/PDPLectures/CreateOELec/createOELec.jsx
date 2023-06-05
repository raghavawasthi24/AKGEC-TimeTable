import React, { useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MultiSelect } from "primereact/multiselect";
import Nav from '../components/Nav/Nav';
// import { FormGroup, TextField } from "@mui/material";

let sectionData = [];
const CreateOELec = () => {
  const year = ["1", "2", "3", "4"];
  let initialvalues = {
    year: "",
    departments: "",
    period:"",
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
        // console.log(department)
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
    axios.post("https://time-table-production-9807.up.railway.app/departmentss/oe_lecture_create",{
      year:formvalues.year,
      period:formvalues.period,
      department:formvalues.departments,
      sections:sectionArr
    }).then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})
  }

  return (
    <div className="createPDP">
       <Nav/>
      <FormControl fullWidth sx={{ margin: "1rem" }}>
        <InputLabel>Year</InputLabel>
        <Select
          label="Year"
          name="year"
          value={formvalues.year}
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          label="Department"
          name="departments"
          value={formvalues.departments}
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
        style={{ margin: "1rem 0rem", width: "66vw", minWidth: "20rem" }}
        value={selSections}
        onChange={(e) => setSelSections(e.value)}
        options={sections}
        optionLabel="name"
        placeholder="Select Subjects"
        display="chip"
        className="w-full md:w-20rem"
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Period</InputLabel>
        <Select
          label="Select Period"
          name="period"
          value={formvalues.period}
          onChange={(e) => {
            handleChange(e)
          }}
        >
          {periodsArr.map((val) => {
            return <MenuItem value={val.id}>{val.period}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <button className="button" onClick={createClasses}>Create Classes</button>
    </div>
  );
};

export default CreateOELec;
