import React, {  useState ,useEffect} from "react";
import "./Teacher.css";
import TeacherTable from "../../components/TeacherTable/TeacherTable";
import { Container ,Box} from "@mui/system";
import TeacherArrangementTable from "../../components/TeacherArrangementTable/TeacherArrangementTable"

import axios from "axios";
import TeacherNav from "../../components/TeacherNav/TeacherNav";
import { useNavigate } from "react-router-dom";
// import Student from "../Student/Student"

const Teacher = () =>{
  const navigate= useNavigate()
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
  if(localStorage.getItem("accessToken")&&(localStorage.getItem("user")==="faculty")){

   axios.get(`${process.env.REACT_APP_URL}/departmentss/my_profile`,
   ).then((response)=>setteacherdata(response.data))}
   else
    navigate("/login")
  }, [])
  

  return (
    <>
    {/* {studentview ? <Student/>: */}
    <Container>
    
    <TeacherNav/>

    <Box className="teacherView">
      <Box className="teacherDay" >
      <select
        onChange={resultday}
        placeholder="Select Day"
        defaultValue="Select Day"
        className="SelectDay"
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
      </Box>
      <Box style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <button className="View" onClick={finalday}>View Schedule</button>
      <button className="View" id="ViewArrange" onClick={handleOpen}>
          View Arrangement
        </button>
      </Box>
      </Box>
      <TeacherTable id={teacherdata.user_id} finday={finday} />
      {open ? <TeacherArrangementTable id={teacherdata.user_id}/> :null }
    </Container>
    {/* } */}
    </>
  );
}
export default Teacher;
