import React, { useState } from "react";
import "./Student.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Makearrangemettable from "../../components/MakeArrangementTable/MakeArrangementTable";
import Stack from "@mui/material/Stack";
import {
  TableCell,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import LogoutBtn from "../../components/Logout/LogoutBtn";
import LogInBtn from "../../components/LogInBtn/LogInBtn";

// let tt=[]

const Student = () => {
  let initialvalues = {
    year: "",
    department: "",
    section: "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };

  const year = ["1", "2", "3", "4"];
  const period_time = [
    "8:30-9:20",
    "9:20-10:10",
    "10-10-11:00",
    "11:00-11:50",
    "11:50-12:40",
    "12:40-1:30",
    "1:30-2:20",
    "2:20-3:10",
    "3:10-4:00",
  ];
  const period_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [formvalues, setFormvalues] = useState(initialvalues);
  const [department, setDepartment] = useState([]);
  const [section, setSection] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [viewTable, setViewTable] = useState(false);
  const [open, setOpen] = useState(false);

  const handleYear = (e) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/all_departments/${e.target.value}`
      )
      .then((res) => {
        console.log(res);
        // initialvalues.year=e.target.value;
        setDepartment(res.data);
      });
  };
  const handleDept = (e) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/department_wise_sections/${formvalues.year}/${e.target.value}`
      )
      .then((res) => {
        console.log(res);
        // initialvalues.department=e.target.value;
        setSection(res.data);
      });
  };
  // const handleSec=(e)=>{
  // axios.get(`${process.env.REACT_APP_URL}/departmentss/view-time-table/${e.target.value}`)
  // .then((res)=>{
  //   console.log(res)
  //   // initialvalues.department=e.target.value;
  //   setTimetable(res.data)
  // })

  // }
  const viewTimeTable = () => {
    console.log(formvalues);
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/view-time-table/${formvalues.section}`
      )
      .then((res) => {
        console.log(res);
        // initialvalues.department=e.target.value;
        setTimetable(res.data);
        setViewTable(true);
        console.log(timetable.Monday);
        console.log(period_days[0]);

        console.log(timetable);
      });
  };
  const openArrangement = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };

  return (
    <div className="student">
      <div className="logIndiv">
        {localStorage.getItem("user")? <LogoutBtn />:<LogInBtn/>}
        </div>
      <div className="studentControls">
        <FormControl sx={{ width: "90%", margin: "2%" }}>
          <InputLabel>Year</InputLabel>
          <Select
            label="Year"
            name="year"
            onChange={(e) => {
              handleChange(e);
              handleYear(e);
            }}
          >
            {year.map((val) => {
              return <MenuItem value={val}>{val}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "90%", margin: "2%" }}>
          <InputLabel>Department</InputLabel>
          <Select
            label="Department"
            name="department"
            onChange={(e) => {
              handleChange(e);
              handleDept(e);
            }}
          >
            {department.map((val) => {
              return <MenuItem value={val.id}>{val.dept}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "90%", margin: "2%" }}>
          <InputLabel>Section</InputLabel>
          <Select label="Section" name="section" onChange={handleChange}>
            {section.map((val) => {
              return <MenuItem value={val.id}>{val.section}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Stack spacing={2} direction="row" sx={{margin:"2rem 0"}}>
          <button className="button" onClick={viewTimeTable}>View TimeTable</button>
          <button className="button" style={{color:"white",backgroundColor:"black"}} onClick={openArrangement}>View Arrangement</button>
        </Stack>
      </div>

      <div className={viewTable ? "studentTableBox" : "hide"}>
        <TableContainer sx={{ width: "90vw" }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "rgba(128, 128, 128, 0.264)" }}>
              <TableRow>
                <TableCell size="small"></TableCell>
                {period_time.map((val) => {
                  return <TableCell size="small">{val}</TableCell>;
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.values(timetable).map((val, daysInd) => {
                return (
                  <TableRow>
                    <TableCell>{Object.keys(timetable)[daysInd]}</TableCell>
                    {val.map((item, timeInd) => {
                      return (
                        <TableCell sx={{ width: "1rem" }}>
                          <div style={{ textAlign: "center" }}>
                            <p>{item.subject_name}</p>
                            <p style={{ fontWeight: "bold" }}>
                              {item.faculty_name}
                            </p>
                            <p style={{ color: "red" }}>{item.type}</p>
                          </div>
                          {/* {console.log(item.id)} */}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {open ? <Makearrangemettable id={formvalues.section} /> : null}
    </div>
  );
};

export default Student;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Period from "../../components/Period/Period";
// import "../Student/Student.css";
// import Makearrangemettable from "../../components/MakeArrangementTable/MakeArrangementTable";
// import AdminNav from "../../components/AdminNav/AdminNav";

// const Student = () => {
//   const navigate = useNavigate()
//   let classData_mon = [];
//   let classData_tue = [];
//   let classData_wed = [];
//   let classData_thurs = [];
//   let classData_fri = [];

//   let period_time_obj = [];

//   const [classwise_Data_Mon, setClasswise_Data_Mon] = useState(classData_mon);
//   const [classwise_Data_Tue, setClasswise_Data_Tue] = useState(classData_tue);
//   const [classwise_Data_Wed, setClasswise_Data_Wed] = useState(classData_wed);
//   const [classwise_Data_Thurs, setClasswise_Data_Thurs] =
//     useState(classData_thurs);
//   const [classwise_Data_Fri, setClasswise_Data_Fri] = useState(classData_fri);
//   const [period_time, setPeriod_time] = useState(period_time_obj);

//   const [open, setopen] = useState(false);
//   const[deptdata,setdeptdata]=useState([])
//   const[sectiondata,setsectiondata]=useState([])
//   const[year,setyear]=useState()
//   const[dept,setdept]=useState()
//   const[classtable,setclasstable]=useState()
//   const[adminnav,setadminnav]=useState(false)

//   const View = () => {
//     axios
//       .get(`${process.env.REACT_APP_URL}/departmentss/view-time-table/${classtable}`)
//       .then((res) => {
//         console.log(res.data);

//         period_time_obj = [{ period: "." }];

//         classData_mon = [
//           {
//             days: "Monday",
//           },
//         ];
//         classData_tue = [
//           {
//             days: "Tuesday",
//           },
//         ];
//         classData_wed = [
//           {
//             days: "Wednesday",
//           },
//         ];
//         classData_thurs = [
//           {
//             days: "Thursday",
//           },
//         ];
//         classData_fri = [
//           {
//             days: "Friday",
//           },
//         ];

//         for (let j = 0; j < res.data.Monday.length; j++) {
//           classData_mon.push(res.data.Monday[j]);
//           period_time_obj.push({ period: res.data.Monday[j].period_time });
//         }
//         for (let j = 0; j < res.data.Tuesday.length; j++) {
//           classData_tue.push(res.data.Tuesday[j]);
//         }
//         for (let j = 0; j < res.data.Wednesday.length; j++) {
//           classData_wed.push(res.data.Wednesday[j]);
//         }
//         for (let j = 0; j < res.data.Thursday.length; j++) {
//           classData_thurs.push(res.data.Thursday[j]);
//         }
//         for (let j = 0; j < res.data.Friday.length; j++) {
//           classData_fri.push(res.data.Friday[j]);
//         }

//         console.log(classData_mon, period_time_obj, classData_tue);
//         setClasswise_Data_Mon(classData_mon);
//         setClasswise_Data_Tue(classData_tue);
//         setClasswise_Data_Wed(classData_wed);
//         setClasswise_Data_Thurs(classData_thurs);
//         setClasswise_Data_Fri(classData_fri);
//         setPeriod_time(period_time_obj);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// }

//   useEffect(() => {
//     if(year)
//     axios.get(`${process.env.REACT_APP_URL}/departmentss/all_departments`).then((response)=>setdeptdata(response.data))

//   }, [year])

//   useEffect(() => {
//     if(year && dept)
//     axios.get(`${process.env.REACT_APP_URL}/departmentss/department_wise_sections/${year}/${dept}`).then((response)=>setsectiondata(response.data));
//   }, [year,dept])

//   const handleOpen = () => {
//     if (open === false) setopen(true);
//     else setopen(false);
//   }
//   useEffect(() => {
//     const user = localStorage.getItem("user")
//     if(user==="Admin"){
//        setadminnav(true)

//     }
//     else{
//        setadminnav(false)

//     }
//   }, [])

//   return (
//     <div className="section">
//       {adminnav?<AdminNav/>:
//       <button
//         className="view-student-timetable"
//         style={{ right: "5rem", position: "absolute",backgroundColor:"#252525",color:"white" }}
//         onClick={()=>navigate("/Login")}
//       >
//         Login
//       </button>}

//       <div className="student-opt">
//         <select className="select-opt" onChange={(e)=>setyear(e.target.value)} defaultValue="Select Year">
//           <option disabled >
//             Select Year
//           </option>
//           <option value={1}>1st Year</option>
//           <option value={2}>2nd Year</option>
//           <option value={3}>3rd Year</option>
//           <option value={4}>4th Year</option>
//         </select>

//         <select className="select-opt" onChange={(e)=>setdept(e.target.value)} defaultValue="Select Department">
//           <option disabled >
//             Select Department
//           </option>
//           {deptdata.map((dept)=>(<option value={dept.deptid}>{dept.dept}</option>))}
//         </select>

//         <select className="select-opt" onChange={(e)=>setclasstable(e.target.value)} defaultValue="Select Section" >
//           <option disabled>
//             Select Section
//           </option>
//           {sectiondata.map((sec)=>( <option value={sec.id}>{sec.section}</option>))}

//         </select>
//       </div>
//       <div>
//         <button className="view-student-timetable" onClick={View}>View TimeTable</button>
//         <button className="view-student-timetable" onClick={handleOpen}>
//           View Arrangement
//         </button>
//       </div>

//       <div className="grid-container">
//         <div className="period_days">
//           {period_time.map((val) => {
//             return (
//               <div className="period_time">
//                 <Period period={val.period} />
//               </div>
//             );
//           })}
//         </div>
//         <div className="period_days">
//           {classwise_Data_Mon.map((val) => {
//             return (
//               <Period
//                 subject={val.subject_name}
//                 faculty={val.faculty_name}
//                 type={val.type}
//                 days={val.days}
//               />
//             );
//           })}
//         </div>
//         <div className="period_days">
//           {classwise_Data_Tue.map((val) => {
//             return (
//               <Period
//                 subject={val.subject_name}
//                 faculty={val.faculty_name}
//                 type={val.type}
//                 days={val.days}
//               />
//             );
//           })}
//         </div>
//         <div className="period_days">
//           {classwise_Data_Wed.map((val) => {
//             return (
//               <Period
//                 subject={val.subject_name}
//                 faculty={val.faculty_name}
//                 type={val.type}
//                 days={val.days}
//               />
//             );
//           })}
//         </div>
//         <div className="period_days">
//           {classwise_Data_Thurs.map((val) => {
//             return (
//               <Period
//                 subject={val.subject_name}
//                 faculty={val.faculty_name}
//                 type={val.type}
//                 days={val.days}
//               />
//             );
//           })}
//         </div>
//         <div className="period_days">
//           {classwise_Data_Fri.map((val) => {
//             return (
//               <Period
//                 subject={val.subject_name}
//                 faculty={val.faculty_name}
//                 type={val.type}
//                 days={val.days}
//               />
//             );
//           })}
//         </div>
//       </div>
//       {open ? <Makearrangemettable id={classtable}/> : null}
//     </div>
//   );
// };

// export default Student;
