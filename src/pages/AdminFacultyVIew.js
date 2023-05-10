import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherTable from "../components/TeacherTable";
import { Container } from "@mui/system";
import MakeArrangementForm from "../components/MakeArrangementForm";
import TeacherArrangemetTable from "../components/TeaceherArrangementTable";

const AdminFacultyVIew = () => {
  const [teacherdata, setteacherdata] = useState([]);
  const [subjectdata, setsubjectdata] = useState([]);
  const [openarrangement, setopenarrangement] = useState(false);

  const [teacher, setteacher] = useState("Select Teacher");
  const [day, setday] = useState("Select Day");
  const [finday, setfinday] = useState("");
  const [finteacher, setfinteacher] = useState('0');
  const [subject, setsubject] = useState("Select Subject");
  const page = "admin";
  const fetchinfo1 = (selectsubject) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/${selectsubject}`
      )
      .then((response) => setteacherdata(response.data));
  };
  const fetchinfo2 = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/all_subject`
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
    setday("Select Day");
    setfinday("");
  };
  const getteacherdata = (e) => {
    setsubject(e.target.value);
    fetchinfo1(e.target.value);
    setteacher("Select Teacher");
    setday("Select Day");
    setfinday("");
    setfinteacher("");
  };

  const finalday = () => {
    setfinteacher(teacher);
    setfinday(day);
  };
  const control = () => {
    setopenarrangement(true);
  };
  const control2 = () => {
    setopenarrangement(false);
  };
  return (
    <Container>
      {openarrangement ? (
        <div className="popcontainer" >
          <div id="mask"></div>
          <div className="popup" style={{height:"90%",top:"1rem"}}>
            <div className="closeButton" onClick={control2} style={{marginLeft:"32rem"}}>
              +
            </div>
            <MakeArrangementForm />
          </div>
        </div>
      ) : null}
      <div style={{ display: "flex", marginLeft: "-10rem" }}>
        <select
          id="subject"
          placeholder="Select Subject"
          defaultValue="Select Subject"
          className="SelectDay"
          onChange={getteacherdata}
          value={subject}
          style={{ marginLeft: "29rem", marginRight: "-29rem" }}
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
          style={{ marginLeft: "33rem" }}
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
      </div>
      <div>
        <button
          className="View"
          style={{ marginLeft: "26rem" }}
          onClick={finalday}
        >
          View Schedule
        </button>
        <button className="View" onClick={control} style={{ width: "10rem" }}>
          Make Arrangement
        </button>
      </div>

      <TeacherTable page={page} id={finteacher} finday={finday} />
      <TeacherArrangemetTable id={finteacher}/>
    </Container>
  );
};

export default AdminFacultyVIew;
