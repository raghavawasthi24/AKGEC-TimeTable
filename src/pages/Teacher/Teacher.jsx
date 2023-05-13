import React, {  useState ,useEffect} from "react";
import "./Teacher.css";
import TeacherTable from "../../components/TeacherTable/TeacherTable";
import { Container ,Box} from "@mui/system";
import TeacherArrangementTable from "../../components/TeacherArrangementTable/TeacherArrangementTable"
import Logout from "../../components/Logout/LogoutBtn"
import TeacherProfile from "./TeacherProfile";
import axios from "axios";
// import Student from "../Student/Student"

const Teacher = () =>{
  const [day, setday] = useState("");
  const [finday, setfinday] = useState("");
  const [open,setopen]=useState(false)
  const [teacherdata,setteacherdata]=useState([])
  // const[studentview,setstudentview]=useState(false)
 
  const resultday = (e) => {
    setday(e.target.value);
  };

  const finalday = () => {
    setfinday(day);
  };
  const handleOpen = () => {
    if (open === false) setopen(true);
    else setopen(false);
  };
  useEffect(() => {
  const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
   axios.get(`${process.env.REACT_APP_URL}/departmentss/my_profile`,
    {
     headers: {
       Authorization: AuthStr,
     },
   } ).then((response)=>setteacherdata(response.data))
  }, [])
  

  return (
    <>
    {/* {studentview ? <Student/>: */}
    <Container>
    <Box sx={{margin:"1rem 0rem",right: "36rem", position: "absolute"}}>
      {/* <button className="View" style={{width:"12rem"}} onClick={showstudent}>
          View Student TimeTable
        </button> */}
       <Logout />
      </Box>
      <Box>
      {/* <TeacherProfile/> */}
      <select
        id="day"
        onChange={resultday}
        placeholder="Select Day"
        defaultValue="Select Day"
        className="SelectDay"
        style={{marginLeft:"21rem"}}
      >
        <option value="Select Day" disabled>
          Select Day
        </option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Entire Week">Entire Week</option>
      </select>
      <button className="View" onClick={finalday}>View Schedule</button>
      <button className="View" style={{width:"12rem"}} onClick={handleOpen}>
          View Arrangement
        </button>
        </Box>
      <TeacherTable id={teacherdata.profile_id} finday={finday} />
      {open ? <TeacherArrangementTable id={teacherdata.profile_id}/> :null }
    </Container>
    {/* } */}
    </>
  );
}
export default Teacher;
