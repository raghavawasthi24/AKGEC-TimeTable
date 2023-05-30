import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container , Box} from "@mui/system";
import "./MakeArrangement.css"


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
  const [dept,setdept] = useState(0);
  const [date,setdate]=useState()
  const [year,setyear]=useState();
  const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
  axios.defaults.headers.common['Authorization'] = AuthStr;

  const today = new Date(date);
  let sysday = today.getDay();
  console.log(today,sysday)
  const fetchinfo = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/all_teachers_data`
      )
      .then((response) => setSubjectData(response.data));
  };
  const fetchinfo2 = () => {
    
    if(sysday){
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/arrangement_teachers/${sysday}`
      )
      .then((response) => setfreeteacherdata(response.data));}
  };
  const fetchinfo3 = (year,dept) => {
    if(year && dept ){
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/department_wise_sections/${year}/${dept}`
      )
      .then((response) => setsectiondata(response.data));}
  };
  const fetchinfo4 = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/view_period/`
      )
      .then((response) => setperioddata(response.data));
  };
  const fetchinfo5 = (year) => {
    if(year)
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/all_departments/${year}`
      )
      .then((response) => setdepdata(response.data));
  };
  const department = (e) =>{
    setdept(e.target.value) ;
    fetchinfo3()
  }
  // useEffect(() => {
  //   fetchinfo3(dept,year)
  // }, [dept,year])
  
  
  useEffect(() => {
    if(date){
    fetchinfo();
    fetchinfo4();
    fetchinfo2()
  }
  }, [date]);

  useEffect(() => {
    if(year){
    fetchinfo5(year)
  }
  }, [year]);

  useEffect(() => {
    if(year && dept){
    fetchinfo3(year,dept)
  }
  }, [year,dept]);

  const create = () => {
    axios.post(
      `${process.env.REACT_APP_URL}/departmentss/arrangement_lectures_create`,
      {
        day: sysday,
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
  const periodteacher = freeteacherdata.filter(function (value) {
    return value[time];
  });
  const teachersubject = Subjectdata.filter(function (value) {
    return value.user_id === freeteacher;
  });

  return (
    // <Container>
        <Container className='Popbox' >
          
              <div className="popmain" >Make Arrangement</div>
              <label className="popHead">Arrangement Date</label>
                <input type="date" className="popInput"  min= {new Date().toISOString().split('T')[0]}  onChange={(e)=>(setdate(e.target.value),setfreeteacher())} />
                <label className="popHead">Select Period</label>
                <select
                  defaultValue="Select Period"
                  onChange={(e) =>(settime(e.target.value))}
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
                <label className="popHead">Year</label>
                <select
                  defaultValue="Select Year"
                  onChange={(e) => (setyear(e.target.value),setdepdata([]),setsectiondata([]),dept(),section())}
                  className="popInput"

                >
                  <option disabled  value="Select Year">
                    Select Year
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>

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
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <button className="View" onClick={create} id="MakeArr">
                Make Arrangement
              </button>
              </div>
        </Container>
    // </Container>
  );
};


export default MakeArrangementForm