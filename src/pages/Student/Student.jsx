import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Period from "../../components/Period/Period";
import "../Student/Student.css";
import Makearrangemettable from "../../components/MakeArrangementTable/MakeArrangementTable";

const Student = () => {
  const navigate = useNavigate()
  let classData_mon = [];
  let classData_tue = [];
  let classData_wed = [];
  let classData_thurs = [];
  let classData_fri = [];

  let period_time_obj = [];

  const [classwise_Data_Mon, setClasswise_Data_Mon] = useState(classData_mon);
  const [classwise_Data_Tue, setClasswise_Data_Tue] = useState(classData_tue);
  const [classwise_Data_Wed, setClasswise_Data_Wed] = useState(classData_wed);
  const [classwise_Data_Thurs, setClasswise_Data_Thurs] =
    useState(classData_thurs);
  const [classwise_Data_Fri, setClasswise_Data_Fri] = useState(classData_fri);
  const [period_time, setPeriod_time] = useState(period_time_obj);

  const [open, setopen] = useState(false);
  const[deptdata,setdeptdata]=useState([])
  const[sectiondata,setsectiondata]=useState([])
  const[year,setyear]=useState()
  const[dept,setdept]=useState()
  const[classtable,setclasstable]=useState()
 

  const View = () => {
    console.log(classtable)
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/view-time-table/2`)
      .then((res) => {
        console.log(res.data);

        period_time_obj = [{ period: "." }];

        classData_mon = [
          {
            days: "Monday",
          },
        ];
        classData_tue = [
          {
            days: "Tuesday",
          },
        ];
        classData_wed = [
          {
            days: "Wednesday",
          },
        ];
        classData_thurs = [
          {
            days: "Thursday",
          },
        ];
        classData_fri = [
          {
            days: "Friday",
          },
        ];

        for (let j = 0; j < res.data.Monday.length; j++) {
          classData_mon.push(res.data.Monday[j]);
          period_time_obj.push({ period: res.data.Monday[j].period_time });
        }
        for (let j = 0; j < res.data.Tuesday.length; j++) {
          classData_tue.push(res.data.Tuesday[j]);
        }
        for (let j = 0; j < res.data.Wednesday.length; j++) {
          classData_wed.push(res.data.Wednesday[j]);
        }
        for (let j = 0; j < res.data.Thursday.length; j++) {
          classData_thurs.push(res.data.Thursday[j]);
        }
        for (let j = 0; j < res.data.Friday.length; j++) {
          classData_fri.push(res.data.Friday[j]);
        }

        console.log(classData_mon, period_time_obj, classData_tue);
        setClasswise_Data_Mon(classData_mon);
        setClasswise_Data_Tue(classData_tue);
        setClasswise_Data_Wed(classData_wed);
        setClasswise_Data_Thurs(classData_thurs);
        setClasswise_Data_Fri(classData_fri);
        setPeriod_time(period_time_obj);
      })
      .catch((err) => {
        console.log(err);
      });
}
 
  useEffect(() => {
    if(year)
    axios.get(`${process.env.REACT_APP_URL}/departmentss/all_departments`).then((response)=>setdeptdata(response.data))
    
  }, [year])

 
  useEffect(() => {
    if(year && dept)
    axios.get(`${process.env.REACT_APP_URL}/departmentss/department_wise_sections/${year}/${dept}`).then((response)=>setsectiondata(response.data));
  }, [year,dept])
  
  
  const handleOpen = () => {
    if (open === false) setopen(true);
    else setopen(false);
  }

  return (
    <div className="section">
      <button
        className="view-student-timetable"
        style={{ right: "5rem", position: "absolute",backgroundColor:"#252525",color:"white" }}
        onClick={()=>navigate("/Login")}
      >
        Login
      </button>

      <div className="student-opt">
        <select className="select-opt" onChange={(e)=>setyear(e.target.value)}>
          <option disabled selected>
            Select Year
          </option>
          <option value={1}>1st Year</option>
          <option value={2}>2nd Year</option>
          <option value={3}>3rd Year</option>
          <option value={4}>4th Year</option>
        </select>

        <select className="select-opt" onChange={(e)=>setdept(e.target.value)}>
          <option disabled selected>
            Select Department
          </option>
          {deptdata.map((dept)=>(<option value={dept.deptid}>{dept.dept}</option>))}
        </select>

        <select className="select-opt" onChange={(e)=>setclasstable(e.target.value)} >
          <option disabled selected>
            Select Section
          </option>
          {sectiondata.map((sec)=>( <option value={sec.id}>{sec.section}</option>))}
         
        </select>
      </div>
      <div>
        <button className="view-student-timetable" onClick={View}>View TimeTable</button>
        <button className="view-student-timetable" onClick={handleOpen}>
          View Arrangement
        </button>
      </div>

      <div className="grid-container">
        <div className="period_days">
          {period_time.map((val) => {
            return (
              <div className="period_time">
                <Period period={val.period} />
              </div>
            );
          })}
        </div>
        <div className="period_days">
          {classwise_Data_Mon.map((val) => {
            return (
              <Period
                subject={val.subject_name}
                faculty={val.faculty_name}
                type={val.type}
                days={val.days}
              />
            );
          })}
        </div>
        <div className="period_days">
          {classwise_Data_Tue.map((val) => {
            return (
              <Period
                subject={val.subject_name}
                faculty={val.faculty_name}
                type={val.type}
                days={val.days}
              />
            );
          })}
        </div>
        <div className="period_days">
          {classwise_Data_Wed.map((val) => {
            return (
              <Period
                subject={val.subject_name}
                faculty={val.faculty_name}
                type={val.type}
                days={val.days}
              />
            );
          })}
        </div>
        <div className="period_days">
          {classwise_Data_Thurs.map((val) => {
            return (
              <Period
                subject={val.subject_name}
                faculty={val.faculty_name}
                type={val.type}
                days={val.days}
              />
            );
          })}
        </div>
        <div className="period_days">
          {classwise_Data_Fri.map((val) => {
            return (
              <Period
                subject={val.subject_name}
                faculty={val.faculty_name}
                type={val.type}
                days={val.days}
              />
            );
          })}
        </div>
      </div>
      {open ? <Makearrangemettable /> : null}
    </div>
  );
};

export default Student;
