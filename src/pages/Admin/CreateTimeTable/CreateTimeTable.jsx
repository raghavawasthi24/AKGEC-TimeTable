import React,{useEffect, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { TextField } from '@mui/material';

let initialteacherSelArray=[];

const CreateTimeTable = () => {

  
   let initialvalues={
    year:"",
    department:""
   }

   const [formvalues,setFormvalues]=useState(initialvalues);
   const [subjects,setSubjects]=useState([]);
   const [teachers,setTeachers]=useState([]);
   const [sections,setSections]=useState([]);

   const year=["1","2","3","4"];
   const department=["CSE","IT","ECE"]

   
   let inputfields=[
    {
      name:"year",
      label:"Year",
      options:["1","2","3","4"]
    },
    {
      name:"department",
      label:"Department",
      options:["1","2","3","4"]
    }
   ]

   const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormvalues({...formvalues,[name]:value})
   }

   const handleTeacher=(e,secIndex,subIndex)=>{  
    // if(secInd)
    // let total=secIndex*subjects.length+subIndex;
    // console.log(initialteacherSelArray,secIndex,subIndex,e.target.value)
    initialteacherSelArray[secIndex][subIndex]=e.target.value;
    // console.log(initialteacherSelArray[secIndex][subIndex],subIndex,secIndex)
    // console.log(e.target.value)
    console.log(initialteacherSelArray)
   }


   useEffect(()=>{
    axios.get(`${process.env.REACT_APP_URL}/departmentss/all_subject`)
    .then((res)=>{
      console.log(res)
      setSubjects(res.data)
    })
      .catch((err)=>{
        console.log(err)
      
    })

    axios.get(`${process.env.REACT_APP_URL}/departmentss/subject_with_teachers`)
    .then((res)=>{
      console.log(res.data)
      setTeachers(res.data)
      
    })
      .catch((err)=>{
        console.log(err)
     
    })

    axios.get(`${process.env.REACT_APP_URL}/departmentss/department_wise_sections/2/1`)
    .then((res)=>{
      console.log(res)
      setSections(res.data)
      // initialteacherSelArray=res.data;
      res.data.map((val)=>initialteacherSelArray.push([]));
      console.log(initialteacherSelArray);
    })
      .catch((err)=>{
        console.log(err)
      
    })

   },[])



  return (
    <div className='createTimeTable'>
      {inputfields.map((key)=>{
        return(<FormControl>
          <InputLabel id="demo-simple-select-label">{key.label}</InputLabel>
        <Select
            value={formvalues[key.name]}
            label={key.label}
            onChange={handleChange}
            name={key.name}
          >
          {
            year.map((val)=>{
              return(<MenuItem value={val}>{val}</MenuItem>)
            })
          }
          </Select>
          </FormControl>)
      })}
      
       <TableContainer>
         <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subjets</TableCell>
              {
                sections.map((val)=>{
                  return(<TableCell>{val.section}</TableCell>)
                })
              }
              <TableCell>No of Lecture</TableCell>
              <TableCell>Type of Lecture</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              subjects.map((key,subIndex)=>{
                return(
                  <TableRow>
                    <TableCell>{key.subject}</TableCell>
                    {
                     sections.map((val,secIndex)=>{
                       return(<TableCell>                   
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select</InputLabel>
                          <Select
                            label="Select"
                            onChange={e=>handleTeacher(e,secIndex,subIndex)}
                            name="teacherSel"
                          >
                           {
                            teachers[subIndex][key.subject].map((teacher)=>{return <MenuItem value={teacher.user_id}>{teacher.user}</MenuItem>})
                           }
                          </Select>
                        </FormControl>
                    
                  </TableCell>)
                })
              }
              <TableCell>
                <TextField></TextField>
              </TableCell>
              <TableCell>
              <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Select</InputLabel>
                 <Select
                   label="Type"
                   onChange={e=>handleChange(e)}
                   name="typeOfLec"
                 >
                <MenuItem value="Theory">Theory</MenuItem>
                 <MenuItem value="Lab">Lab</MenuItem>
                 </Select>
               </FormControl>
              </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
         </Table>
       </TableContainer>

    </div>
  )
}

export default CreateTimeTable










// import React, {useState} from 'react';
// import "./CreateTimeTable.css";
// // import SelectSection from '../components/SelectSection';
// import AdminNavbar from '../../../components/AdminNav/AdminNav';
// // import Header from "../components/Header";
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// import Period from '../../../components/Period/Period';


// export let sectionObj = []

// const CreateTimeTable = () => {

//   const initialvalues = {
//     year: "",
//     department: "",
//     section: "",
//     subject: "",
//     type_of_lecture: "",
//     no_of_lecture: "",
//     teacher: ""
//   }



//   const [sectionNo, setsectionNo] = useState([{}]);
//   const [visibiltyCount, setVisibiltyCount] = useState(0);
//   const [section, setSection] = useState([]);
//   const [sectionSel, setSectionSel] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [formvalues, setFormvalues] = useState(initialvalues);
//   const [teacherlist, setTeacherlist] = useState([]);
//   // const [teacherId,setTeacherId]=useState("");
//   // const teachId=useRef();

//   const addSec = () => {
//     setsectionNo((prev) => {
//       return [...prev, {}]
//     })
//     console.log(sectionNo)
//   }


//   const yearSelect = () => {
//     if (visibiltyCount < 1) {
//       console.log("year selected")
//       setVisibiltyCount(1)
//     }
//   }

//   const deptselect = (e) => {
//     setSection([]);
//     setSubjects([]);
//     if (visibiltyCount < 2)
//       setVisibiltyCount(2);
//     axios.get(`${process.env.REACT_APP_URL}/departmentss/department_wise_sections/1/7`)
//       .then((resp) => {
//         console.log(resp.data)
//         for (let i = 0; i < resp.data.length; i++) {
//           setSection((prev) => {
//             return [...prev, {
//               id: resp.data[i].id,
//               section: resp.data[i].section
//             }]
//           })
//         }
//         console.log(section)
//       }).catch((err) => {
//         console.log(err)
//       })
//     axios.get(`${process.env.REACT_APP_URL}/departmentss/all_subjects/2/1`)
//       .then((resp) => {
//         for (let i = 0; i < resp.data.length; i++) {
//           setSubjects((prev) => {
//             return [...prev, resp.data[i]]
//           })
//         }
//         console.log(resp)
//         console.log(subjects)
//       }).catch((err) => {
//         console.log(err)
//       })
//   }

//   const teacherSel = (e) => {
//     setTeacherlist([]);
//     if (visibiltyCount < 4)
//       setVisibiltyCount(4);
//     axios.get(`${process.env.REACT_APP_URL}/departmentss/select_teachers/${e.target.value}`).then((resp) => {
//       console.log(resp)
//       for (let i = 0; i < resp.data.length; i++) {
//         setTeacherlist((prev) => {
//           return [...prev, { id: resp.data[i].user_id, teacher: resp.data[i].user }]
//         })
//       }
//       console.log(teacherlist)
//     }).catch((err) => {
//       console.log(err)
//     })
//     console.log(e.target.value);
//   }



//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setFormvalues({ ...formvalues, [name]: value });
//   }



//   const sectionVal = (e) => {
//     if (visibiltyCount < 3)
//       setVisibiltyCount(3);
//     if (e.target.checked) {
//       sectionObj.push(e.target.value);
//       // console.log(e.target.value)
//     }
//     else
//     // sectionObj.pop(e.target.value);
//     {
//       for (let i = 0; i < sectionObj.length; i++) {
//         if (sectionObj[i] === e.target.value) {
//           for (let j = i; j < sectionObj.length; j++) {
//             sectionObj[j] = sectionObj[j + 1]
//           }
//           sectionObj.length--;

//         }
//       }
//     }
//     console.log(sectionObj)
//     setSectionSel(sectionObj)
//   }

//   const no_of_lecSel = () => {
//     if (visibiltyCount < 5)
//       setVisibiltyCount(5);
//   }

//   const type_of_lecSel = () => {
//     if (visibiltyCount < 6)
//       setVisibiltyCount(6);
//   }



//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log(formvalues)
//     console.log(sectionObj)
//     console.log({
//       year: formvalues.year,
//       department: formvalues.department,
//       section: sectionSel,
//       subject: formvalues.subject,
//       type_of_lecture: formvalues.type_of_lecture,
//       no_of_lecture: formvalues.no_of_lecture,
//       teacher: formvalues.teacher,

//     })

//     axios.post(`${process.env.REACT_APP_URL}/departmentss/create_table/`, {
//       class_id: sectionSel,
//       subject_id: formvalues.subject,
//       type: formvalues.type_of_lecture,
//       no_of_lectures: formvalues.no_of_lecture,
//       teacher_id: formvalues.teacher,
//     }).then((resp) => {
//       console.log(resp)
//     }).catch((err) => {
//       console.log(err)
//     })
//   }

//   // SHOW TIME TABLE

//   let classData_mon = [];
//   let classData_tue = [];
//   let classData_wed = [];
//   let classData_thurs = [];
//   let classData_fri = [];

//   let period_time_obj = [];

//   const [classwise_Data_Mon, setClasswise_Data_Mon] = useState(classData_mon)
//   const [classwise_Data_Tue, setClasswise_Data_Tue] = useState(classData_tue)
//   const [classwise_Data_Wed, setClasswise_Data_Wed] = useState(classData_wed)
//   const [classwise_Data_Thurs, setClasswise_Data_Thurs] = useState(classData_thurs)
//   const [classwise_Data_Fri, setClasswise_Data_Fri] = useState(classData_fri)
//   const [period_time, setPeriod_time] = useState(period_time_obj)


//   const apicall = () => {
//     axios.get(`${process.env.REACT_APP_URL}/departmentss/view-time-table1/${sectionSel[0]}`)
//       .then((res) => {
//         console.log(res.data)

//         period_time_obj = [
//           { period: "." },
//         ]

//         classData_mon = [
//           {
//             days: "Monday"
//           }
//         ];
//         classData_tue = [
//           {
//             days: "Tuesday"
//           }
//         ];
//         classData_wed = [
//           {
//             days: "Wednesday"
//           }
//         ];
//         classData_thurs = [
//           {
//             days: "Thursday"
//           }
//         ];
//         classData_fri = [
//           {
//             days: "Friday"
//           }
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
//       }).catch((err) => {
//         console.log(err)
//       })
//   }

//   return (
//     <>
//       <AdminNavbar />
//       <form className='createTable' onSubmit={e => { submitHandler(e); apicall() }}>
//         <div className='dept-select'>
//           <select className='select-opt' name="year" onChange={e => { inputHandler(e); yearSelect() }} >
//             <option disabled selected>Select Year</option>
//             <option value="1">1st Year</option>
//             <option value="2">2nd Year</option>
//             <option value="3">3rd Year</option>
//             <option value="4">4th Year</option>
//           </select>
          
//           <select className={visibiltyCount > 0 ? 'select-opt' : 'hide'} name="department" onChange={e => { inputHandler(e); deptselect() }}>
//             <option disabled selected>Select Department</option>
//             <option value="1">CSE</option>
//             <option value="2">IT</option>
//             <option value="3">ECE</option>
//             <option value="4">EN</option>
//             <option value="5">ME</option>
//             <option value="6">CIVIL</option>
//           </select>

//           <div className={visibiltyCount > 1 ? 'selectSection' : 'hide'}>
//           <div className='section-box'>
//             {
//               section.map((val) => {
//                 return (<div>
//                   <input type="checkbox" value={val.id} onClick={sectionVal} />
//                   <label>{val.section}</label>
//                 </div>)
//               })
//             }
//           </div>
//           {/* <button onClick={addSec}>Add</button> */}
//         </div>
//         </div>
        
//         <div className='select-lec'>
//           <select className={visibiltyCount > 2 ? 'select-opt' : 'hide'} name="subject" onChange={e => { inputHandler(e); teacherSel(e) }}>
//             <option disabled selected>Select Subject</option>
//             {
//               subjects.map((val) => {
//                 return (<option value={val.id}>{val.subject}</option>)
//               })
//             }
//           </select>
//           <select className={visibiltyCount > 3 ? 'select-opt' : 'hide'} name="type_of_lecture" onChange={e => { inputHandler(e); no_of_lecSel() }}>
//             <option disabled selected>Type of Lectures</option>
//             <option>THEORY</option>
//             <option>LAB</option>
//           </select>
//           <select className={visibiltyCount > 4 ? 'select-opt' : 'hide'} name="no_of_lecture" onChange={e => { inputHandler(e); type_of_lecSel() }}>
//             <option disabled selected>No of Lectures</option>
//             <option>1</option>
//             <option>2</option>
//           </select>
//         </div>


//         <div className={visibiltyCount > 5 ? 'teacher-sel' : 'hide'}>
//           <select className='select-opt' name='teacher' onChange={e => { inputHandler(e) }}>
//             <option selected disabled>Select Teacher</option>
//             {
//               teacherlist.map((val) => {
//                 return (<option value={val.id}>{val.teacher}</option>)
//               })
//             }
//           </select>

//         </div>

//         <button type='submit' style={{ backgroundColor: "black", color: "white", margin: "1rem" }} className='view-student-timetable'> Create TimeTable</button>


//       </form>

//       {/* SHOW TIME TABLE */}

//       {
//         sectionSel.map(() => {
//           return (<div className="section">


//             <div className='grid-container'>
//               <div className='period_days'>
//                 {
//                   period_time.map((val) => {
//                     return (
//                       <div className='period_time'>
//                         <Period period={val.period} />
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//               <div className='period_days'>
//                 {
//                   classwise_Data_Mon.map((val) => {
//                     return (
//                       <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days} />

//                     )
//                   })
//                 }
//               </div>
//               <div className='period_days'>
//                 {
//                   classwise_Data_Tue.map((val) => {
//                     return (
//                       <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days} />
//                     )
//                   })
//                 }
//               </div>
//               <div className='period_days'>
//                 {
//                   classwise_Data_Wed.map((val) => {
//                     return (
//                       <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days} />

//                     )
//                   })
//                 }
//               </div>
//               <div className='period_days'>
//                 {
//                   classwise_Data_Thurs.map((val) => {
//                     return (
//                       <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days} />

//                     )
//                   })
//                 }
//               </div>
//               <div className='period_days'>
//                 {
//                   classwise_Data_Fri.map((val) => {
//                     return (
//                       <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days} />

//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>)
//         })
//       }
//     </>
//   )
// }

// export default CreateTimeTable

