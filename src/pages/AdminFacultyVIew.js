import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherTable from "../components/TeacherTable";

const AdminFacultyVIew = () => {
  const [teacherdata, setteacherdata] = useState([]);
  const [subjectdata, setsubjectdata] = useState([]);
  const [teacher, setteacher] = useState("Select Teacher");
  const [day, setday] = useState("Select Day");
  const [finday, setfinday] = useState("");
  const [finteacher, setfinteacher] = useState("");
  const [subject, setsubject] = useState("Select Subject");
  console.log(subject);
  const page = "admin";
  const fetchinfo1 = (selectsubject) => {
    axios
      .get(
        `https://time-table-production.up.railway.app/departmentss/select_teachers/${selectsubject}`
      )
      .then((response) => setteacherdata(response.data));
  };
  const fetchinfo2 = () => {
    axios
      .get(
        "https://time-table-production.up.railway.app/departmentss/all_subjects"
      )
      .then((response) => setsubjectdata(response.data));
  };

  useEffect(() => {
    fetchinfo2();
  }, []);

  const resultday = (e) => {
    setday(e.target.value);
  };
  const finalteacher = (e) => {
    setteacher(e.target.value);
    setday('Select Day')
    setfinday('')
  };
  const getteacherdata = (e) => {
    setsubject(e.target.value);
    fetchinfo1(e.target.value);
    setteacher('Select Teacher')
    setday('Select Day')
    setfinday('')
    setfinteacher('')
  };

  const finalday = () => {
    setfinteacher(teacher);
    setfinday(day);
 
  };
  console.log(finday,finteacher,subject);
  
  
  return (
    <>
      <div style={{ display: "flex",marginLeft:"-10rem" }}>
        <select
          id="subject"
          placeholder="Select Subject"
          defaultValue="Select Subject"
          className="SelectDay"
          onChange={getteacherdata}
          value={subject}
        >
          <option disabled>Select Subject</option>
          {subjectdata.map((subjectName, i) => (
            <option value={subjectName.id} key={i}>
              {subjectName.subject}
            </option>
          ))}
        </select>
        <select
          id="teacher"
          onChange={finalteacher}
          placeholder="Select Teacher"
          defaultValue="Select Teacher"
          className="SelectDay"
          value={teacher}

        >
          <option disabled>Select Teacher</option>
          {teacherdata.map((teacher) => (
            <option value={teacher.user_id}>{teacher.user}</option>
          ))}
        </select>
        <select
          id="day"
          onChange={resultday}
          placeholder="Select Day"
          defaultValue="Select Day"
          className="SelectDay"
          value={day}
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
        <button className="View" style={{marginTop:"4rem",marginLeft:"36rem"}} onClick={finalday}>
        View Schedule
      </button>
      </div>
    
      

      <TeacherTable page={page} id={finteacher} finday={finday} />
    </>
  );
};

export default AdminFacultyVIew;
