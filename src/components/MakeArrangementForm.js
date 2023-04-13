import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";

const MakeArrangementForm = (props) => {
  const [Subjectdata, setSubjectData] = useState([]);
  const [freeteacherdata, setfreeteacherdata] = useState([]);
  const [sectiondata, setsectiondata] = useState([]);
  const [perioddata,setperioddata]=useState([])
  const [time, settime] = useState();
  const [freeteacher, setfreeteacher] = useState();
  const [type, settype] = useState();
  const [subject, setsubject] = useState();
  const [section, setsection] = useState();
 


  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const control = ()=>{
    status = false
    console.log(status)
  }

  const d = new Date();
  let sysday = weekday[d.getDay()];

  const fetchinfo = () => {
    axios
      .get(
        "https://time-table-production.up.railway.app/departmentss/all_teachers_data"
      )
      .then((response) => setSubjectData(response.data));
  };
  const fetchinfo2 = () => {
    axios
      .get(
        "https://time-table-production.up.railway.app/departmentss/arrangement_teachers"
      )
      .then((response) => setfreeteacherdata(response.data));
  };
  const fetchinfo3 = () => {
    axios
      .get(
        "https://time-table-production.up.railway.app/departmentss/department_wise_sections/2/1"
      )
      .then((response) => setsectiondata(response.data));
  };
  const fetchinfo4 = () => {
    axios
      .get(
        "https://time-table-production.up.railway.app/departmentss/view_period/"
      )
      .then((response) => setperioddata(response.data));
  };
  useEffect(() => {
    fetchinfo();
    fetchinfo2();
    fetchinfo3();
    fetchinfo4();
  }, []);

  const create = () => {
    axios.post(
      "https://time-table-production.up.railway.app/departmentss/arrangement_lectures_create",
      {
        day: sysday,
        period: time,
        type: type,
        cid: section,
        faculty: freeteacher,
        subject: subject,
      }
    );
  };

  // const periodteacher =(Object.values(freeteacherdata).map((data)=>((Object.keys(data))==="8:30-9:20")))
  // console.log(periodteacher)
  const periodteacher = freeteacherdata.filter(function (value) {
    return value[time];
  });
  const teachersubject = Subjectdata.filter(function (value) {
    return value.user_fullname === freeteacher;
  });
  let status = props.status
  console.log(status)
  return (
    <Container>
    { status ? (
        <Container sx={{ display: "grid" }}>
          <div className="popcontainer">
          <div className="mask">
            <div className="popup">
              <div className="closeButton" onClick={control}>
                +
              </div>

              <div className="popmain">Make Arrangements for {sysday}</div>
              <div>
                <label className="pophead">Select Period</label>
                <select
                  defaultValue="Select Period"
                  onChange={(e) => settime(e.target.value)}
                >
                  <option disabled value="Select Period">
                    Select Period
                  </option>
                  {perioddata.map((time) => (
                    <option value={time.period_no} value2={time.timeslot}>{time.timeslot}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="pophead">Select Teacher</label>
                <select
                  defaultValue="Select Teacher"
                  onChange={(e) => setfreeteacher(e.target.value)}
                >
                  <option disabled value="Select Teacher">
                    Select Teacher
                  </option>
                  {periodteacher.map((data) =>
                    Object.values(data).map((name) =>
                      name.map((fullname) => (
                        <option value={fullname.id}>
                          {fullname.full_name}
                        </option>
                      ))
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="pophead">Select Subject</label>
                <select
                  defaultValue="Select Subject"
                  onChange={(e) => setsubject(e.target.value)}
                >
                  <option disabled value="Select Subject">
                    Select Subject
                  </option>
                  {teachersubject.map((subject) =>
                    subject.subject.map((data) => (
                      <option value={data.id}>{data.subject}</option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <label className="pophead">Type of Lecture</label>
                <select
                  defaultValue="Select Type"
                  onChange={(e) => settype(e.target.value)}
                >
                  <option disabled value="Select Type">
                    Select Type
                  </option>
                  <option value="LAB">Lab</option>
                  <option value="THEORY">Theory</option>
                  <option value="OTHERS">Others</option>
                </select>
                <div></div>

                <label className="pophead">Select Class</label>
                <select
                  defaultValue="Select Section"
                  onChange={(e) => setsection(e.target.value)}
                >
                  <option disabled value="Select Section">
                    Select Section
                  </option>
                  {sectiondata.map((section) => (
                    <option value={section.id}>{section.section}</option>
                  ))}
                </select>
              </div>
              <button className="View" onClick={create}>
                Make Arrangement
              </button>
            </div>
          </div>
          </div>
        </Container>):null}
    </Container>
  );
};

export default MakeArrangementForm;
