import React, {  useState } from "react";
import "./Teacher.css";
import TeacherTable from "../../components/TeacherTable/TeacherTable";
import { Container ,Box} from "@mui/system";
import TeacherArrangementTable from "../../components/TeacherArrangementTable/TeacherArrangementTable"
import Logout from "../../components/Logout/LogoutBtn"
// import Student from "../Student/Student"

const Teacher = () =>{
  const [day, setday] = useState("");
  const [finday, setfinday] = useState("");
  const [open,setopen]=useState(false)
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
  // const showstudent = () => {
  //   if(studentview===false)
  //      setstudentview(true)
  //   else setstudentview(false)
  // }

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
      <TeacherTable id={2} finday={finday} />
      {open ? <TeacherArrangementTable/> :null }
    </Container>
    {/* } */}
    </>
  );
}
export default Teacher;
