import React, {  useState } from "react";
import "../styles/Teacher.css";
import TeacherTable from "../components/TeacherTable";
import { Container } from "@mui/system";

function Teacher() {
  const [day, setday] = useState("");
  const [finday, setfinday] = useState("");
 
  const resultday = (e) => {
    setday(e.target.value);
  };

  const finalday = () => {
    setfinday(day);
  };
  return (
    <Container>
    
      <select
        id="day"
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
      <button className="View" onClick={finalday}>View Schedule</button>
      <TeacherTable id={6} finday={finday} />

    </Container>
  );
}

export default Teacher;
