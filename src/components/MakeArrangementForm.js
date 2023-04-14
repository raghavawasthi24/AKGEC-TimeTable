import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";


const MakeArrangementForm = () => {
  const [Subjectdata, setSubjectData] = useState([]);
  const [freeteacherdata, setfreeteacherdata] = useState([]);
  const [sectiondata, setsectiondata] = useState([]);
  const [perioddata,setperioddata]=useState([])
  const [depdata,setdepdata]=useState([])
  const [time, settime] = useState();
  const [freeteacher, setfreeteacher] = useState();
  const [type, settype] = useState();
  const [subject, setsubject] = useState();
  const [section, setsection] = useState();
  const [dept,setdept] = useState();

  const [date,setdate]=useState()


  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const today = new Date();
  let sysday = weekday[today.getDay()];
  let sysno= weekday.indexOf(sysday);
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
  const fetchinfo3 = (dept) => {
    axios
      .get(
        `https://time-table-production.up.railway.app/departmentss/department_wise_sections/2/${dept}`
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
  const fetchinfo5 = () => {
    axios
      .get(
        "https://time-table-production.up.railway.app/departmentss/all_departments"
      )
      .then((response) => setdepdata(response.data));
  };
  const department = (e) =>{
    setdept(e.target.value) ;
  }
  useEffect(() => {
    fetchinfo3(dept)
  }, [dept])
  
  
  useEffect(() => {
    fetchinfo();
    fetchinfo2();
    fetchinfo4();
    fetchinfo5()
  }, []);

  const create = () => {
    axios.post(
      "https://time-table-production.up.railway.app/departmentss/arrangement_lectures_create",
      {
        day: sysno,
        period: parseInt(time),
        type: type,
        cid: parseInt(section),
        faculty: parseInt(freeteacher),
        subject: parseInt(subject),
        created_at: date
      }
    );
  };

  // const periodteacher =(Object.values(freeteacherdata).map((data)=>((Object.keys(data))==="8:30-9:20")))
  // console.log(periodteacher)
  console.log(date)
  const periodteacher = freeteacherdata.filter(function (value) {
    return value[time];
  });
  const teachersubject = Subjectdata.filter(function (value) {
    return value.user_id === freeteacher;
  });

  return (
    <Container>
        <Container sx={{ display: "grid" }}>
          
              <div className="popmain" style={{margin:"0rem 3.8rem 1rem 3.8rem"}}>Make Arrangements for {sysday}</div>
                <label className="popHead">Select Period</label>
                <select
                  defaultValue="Select Period"
                  onChange={(e) => settime(e.target.value)}
                  className="popInput"
                >
                  <option disabled value="Select Period">
                    Select Period
                  </option>
                  {perioddata.map((time) => (
                    <option value={time.period_no}>{time.timeslot}</option>
                  ))}
                </select>
                <label className="popHead">Select Teacher</label>
                <select
                  defaultValue="Select Teacher"
                  onChange={(e) => setfreeteacher(e.target.value)}
                  className="popInput"

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
                <label className="popHead">Select Subject</label>
                <select
                  defaultValue="Select Subject"
                  onChange={(e) => setsubject(e.target.value)}
                  className="popInput"

                >
                  <option disabled value="Select Subject">
                    Select Subject
                  </option>
                  {teachersubject.map((subject) =>
                      subject.subject.map((data)=>(<option value={data.id}>{data.subject}</option>))
                    
                  )}
                </select>
                <label className="popHead">Type of Lecture</label>
                <select
                  defaultValue="Select Type"
                  onChange={(e) => settype(e.target.value)}
                  className="popInput"

                >
                  <option disabled value="Select Type">
                    Select Type
                  </option>
                  <option value="LAB">Lab</option>
                  <option value="THEORY">Theory</option>
                  <option value="OTHERS">Others</option>
                </select>
                <label className="popHead">Select Department</label>
                <select
                  defaultValue="Select Department"
                  onChange={department}
                  className="popInput"
                >
                  <option disabled value="Select Department">
                    Select Department
                  </option>
                  {depdata.map((dep) => (
                    <option value={dep.id}>{dep.dept}</option>
                  ))}
                </select>
                <label className="popHead">Select Section</label>
                <select
                  defaultValue="Select Section"
                  onChange={(e) => setsection(e.target.value)}
                  className="popInput"

                >
                  <option disabled value="Select Section">
                    Select Section
                  </option>
                  {sectiondata.map((section) => (
                    <option value={section.id}>{section.section}</option>
                  ))}
                </select>
                <label className="popHead">Arrangement Date</label>
                <input type="date" className="popInput"  onChange={(e)=>setdate(e.target.value)} />
              <button className="View" onClick={create} style={{width:"10rem",marginLeft:"10rem"}}>
                Make Arrangement
              </button>
        </Container>
    </Container>
  );
};

export default MakeArrangementForm;
