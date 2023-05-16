import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import {  FormGroup, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./CreateTimeTable.css";
// import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import AdminNav from "../../../components/AdminNav/AdminNav";


let initialteacherSelArray = [];
let subArr = [];
let noOfLecSel = [];
let typeOfLecSel = [];
let teacher_id = [];
let subject_id = [];
let class_id = [];
let no_of_lectures = [];
let type = [];
let sectionUpdates = [];

const CreateTimeTable = () => {
  let initialvalues = {
    year: "",
    departments: "",
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
    console.log(formvalues);
  };

  const [formvalues, setFormvalues] = useState(initialvalues);
  const [department, setDepartment] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [show,setShow]=useState(true);
  // const [disabled,setDisabled]=useState(false)
  const navigate=useNavigate();
 
  const year = ["1", "2", "3", "4"];

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
    console.log(formvalues);
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/department_wise_sections/${formvalues.year}/${e.target.value}`
      )
      .then((res) => {
        console.log(res);
        setSections(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sectionHandler = (e, id) => {
    // setDisabled(true);
    if (e.target.checked) {
      sectionUpdates.push(e.target.value);
      // setSelectedSection(...selectedSection,e.target.value)
      class_id.push(id);
    } else {
      const itemToBeRemoved = e.target.value;
      const idToBeRemoved = id;
      sectionUpdates.splice(
        sectionUpdates.findIndex((a) => a === itemToBeRemoved),
        1
      );
      class_id.splice(
        class_id.findIndex((a) => a === idToBeRemoved),
        1
      );
    }
    console.log(sectionUpdates, class_id);
  };

  const create = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/all_subjects/${formvalues.year}/${formvalues.departments}`)
      .then((res) => {
        console.log(res);
        setSubjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setSelectedSection(sectionUpdates);
    sectionUpdates.map((val) => initialteacherSelArray.push([]));
    console.log(initialteacherSelArray);
    setShow(false)
  };

  const handleTeacher = (e, secIndex, subIndex) => {
    initialteacherSelArray[secIndex][subIndex] = e.target.value;
    console.log(initialteacherSelArray);
  };

  const handleLec = (e, subIndex) => {
    noOfLecSel[subIndex] = parseInt(e.target.value);
    console.log(noOfLecSel);
  };

  const handleType = (e, subIndex) => {
    typeOfLecSel[subIndex] = e.target.value;
    console.log(typeOfLecSel);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/subject_with_teachers`)
      .then((res) => {
        console.log(res.data);
        setTeachers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createTimeTable = () => {
    teacher_id = initialteacherSelArray;

    subjects.map((val) => {
      return subArr.push(val.sub_id);
    });

    selectedSection.map((val) => {
      return (
        no_of_lectures.push(noOfLecSel),
        type.push(typeOfLecSel),
        subject_id.push(subArr)
      );
    });
    console.log(no_of_lectures, type, teacher_id, class_id, subject_id);
    axios
      .post(
        `${process.env.REACT_APP_URL}/departmentss/create_table/`,
        {
          teacher_id: teacher_id,
          subject_id: subject_id,
          class_id: class_id,
          no_of_lectures: no_of_lectures,
          type: type,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/created")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <><AdminNav/>
    <div className="createTimeTable">
      <div className={show?"createTimeTableControls":"hide"}>
        <FormControl fullWidth sx={{margin:"1rem"}}>
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
        <FormGroup sx={{width:"100%"}}>
          {/* <Typography>Select Sections</Typography> */}
          {sections.map((val) => {
            return (
              <FormControlLabel
                control={<Checkbox />}
                label={val.section}
                value={val.section}
                sx={{display:"flex"}}
                onChange={(e) => {
                  sectionHandler(e, val.id);
                }}
              />
            );
          })}
        </FormGroup>
        {/* <Button
         onClick={create}
          variant="contained"
           disabled={disabled?false:true} sx={{margin:"1rem"}}>Continue</Button> */}
           <button className="button" onClick={create} style={{margin:"2rem"}} >Continue</button>
      </div>
      <div className={show?"hide":"createTable"}>
        <TableContainer sx={{ width: "100%"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subjets</TableCell>
                {sectionUpdates.map((val) => {
                  return <TableCell>{val}</TableCell>;
                })}
                <TableCell>No of Lecture</TableCell>
                <TableCell>Type of Lecture</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((key, subIndex) => {
                return (
                  <TableRow>
                    <TableCell>{key.subject}</TableCell>
                    {selectedSection.map((val, secIndex) => {
                      return (
                        <TableCell>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Select
                            </InputLabel>
                            <Select
                              label="Select"
                              onChange={(e) =>
                                handleTeacher(e, secIndex, subIndex)
                              }
                              name="teacherSel"
                            >
                              {teachers[subIndex][key.subject].map((teacher) => {
                                return (
                                  <MenuItem value={teacher.user_id}>
                                    {teacher.user}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <TextField
                        name="noOfLec"
                        onChange={(e) => handleLec(e, subIndex)}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select
                        </InputLabel>
                        <Select
                          label="Select"
                          onChange={(e) => handleType(e, subIndex)}
                          name="typeOfLec"
                        >
                          <MenuItem value="THEORY">Theory</MenuItem>
                          <MenuItem value="LAB">Lab</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Button variant="contained" onClick={createTimeTable} sx={{margin:"2%"}} startIcon={<CreateIcon/>}>
          Create TimeTable
        </Button> */}
        <button className="button" onClick={createTimeTable} style={{margin:"2rem"}} >Create TimeTable</button>
      </div>
    </div>
    </>
  );
};

export default CreateTimeTable;
