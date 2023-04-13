import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TeacherTable.css"
import { Container } from "@mui/system";
import MakeArrangementForm from "./MakeArrangementForm";

const TeacherTable = (props) => {
  const [data, setData] = useState({});
  const [open, setopen] = useState(false);
  const [periodsdata, setperiodsdata] = useState({});
  const[subject,setsubject]=useState()
  const[classid,setclass]=useState()
  

  const deletelecture = (id) => {
    axios.delete(`https://time-table-production.up.railway.app/departmentss/delete_lecture/${id}`).then((response) => alert(response.data.msg,)).catch((error)=>alert('Already Deleted !!'));
    setopen(false)
  }
  const updatelecture = (periodsdata) =>{
    axios.put(`https://time-table-production.up.railway.app/departmentss/update_lecture/${periodsdata.id}`,{subject:subject,cid:classid})
    console.log(subject,classid)
  }

  const fetchInfo = () => {
    return axios
      .get(
        `https://time-table-production.up.railway.app/departmentss/view_teacher/${props.id}`
      )
      .then((response) => setData(response.data));
  };

  useEffect(() => {
    if (props.finday) fetchInfo();
  }, [props.finday]);

  const control = (periods) => {
    if (props.page === "admin") {
      setopen(true);
      setperiodsdata(periods);
    } else props.page("null");
  };

  const period = [
    "8:30-9:20",
    "9:20-10:10",
    "11:00-11:50",
    "11:50-12:40",
    "12:40-1:30",
    "1:30-2:20",
    "2:20-3:10",
    "3:10-4:00",
  ];

  return (
    <Container>
      {open ? (
        <div className="popcontainer">
      
        <div id="mask"></div>
        <div className="popup"
        >
        <div className="closeButton"  onClick={()=>setopen(false)}>+</div>
        <div className="popmain">Update Lecture</div>
          <label className="popHead">Subject</label>
          <input type="text" defaultValue={periodsdata.subject_name} className="popInput" onChange={(e)=>(setsubject(e.target.value))} />
          <label className="popHead">Class</label>
          <input type="text" defaultValue={periodsdata.section} className="popInput" onChange={(e)=>(setclass(e.target.value))}   />
          <div className="popbuttonflex">
          <button className="View" id="delete" onClick={()=>deletelecture(periodsdata.id)}>
              Delete Lecture
            </button>
            <button className="View" id="arrangement"  onClick={()=>updatelecture(periodsdata)}>
              Update Lecture
            </button>
           
          </div>
        </div>
        </div>
      ) : null}

      {Object.keys(data).length && props.finday ? (
        props.finday === "Entire Week" ? (
          <div style={{marginLeft:"-2rem"}}>
            <table className="EntireWeek">
              <thead>
                <tr className="EntireWeekRow">
                  <td className="EntireWeekRow" id="time"></td>
                  {period.map((time, i) => (
                    <td className="EntireWeekRow" id="time">{time}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((days) => (
                  <tr className="EntireWeekRow">
                    <td className="EntireWeekRow">{days}</td>
                    {data[days].map((periods) => (
                      <td className="EntireWeekRow">
                        <button
                          className="updatepop"
                          onClick={() => control(periods)}
                          disabled={
                            props.page !== "admin" || (periods.subject_name.length === 1)
                          }
                        >
                          <div>{periods.subject_name}</div>
                          <div>{periods.section}</div>
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Subject</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {period.map((time, i) => (
                <tr>
                  <td>{time}</td>
                  <td>{data[props.finday][i].subject_name}</td>
                  <td>{data[props.finday][i].section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <div className="empty">No TimeTable Selected</div>
      )}
    </Container>
  );
};

export default TeacherTable;
