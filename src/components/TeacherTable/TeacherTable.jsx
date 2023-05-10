import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherTable.css";
import { Container } from "@mui/system";


const TeacherTable = (props) => {
  const [data, setData] = useState({});
  const [open, setopen] = useState(false);
  const [periodsdata, setperiodsdata] = useState({});
  const [Subjectdata, setSubjectData] = useState([]);
  const [sectiondata, setsectiondata] = useState([]);
  const [subject, setsubject] = useState();
  const [classid, setclassid] = useState();

  const deletelecture = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_URL}/departmentss/delete_lecture/${id}`
      )
      .then((response) => alert(response.data.msg))
      .catch((error) => alert("Already Deleted !!"));
    setopen(false);
  };
  const updatelecture = (periodsdata) => {
    axios.put(
      `${process.env.REACT_APP_URL}/departmentss/update_lecture/${periodsdata.id}`,
      { subject: subject, cid: classid }
    );
  };

  const fetchInfo = () => {
    return axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/view_teacher/${props.id}`
      )
      .then((response) => setData(response.data));
  };
  const fetchinfo2 = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/all_teachers_data`
      )
      .then((response) => setSubjectData(response.data));
  };
  const fetchinfo3 = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/departmentss/department_wise_sections/2/1`
      )
      .then((response) => setsectiondata(response.data));
  };

  useEffect(() => {
    if (props.finday) fetchInfo();
  }, [props.finday]);

  useEffect(() => {
    fetchinfo2()
    fetchinfo3();
  }, []);
  const teachersubject = Subjectdata.filter(function (value) {
    return value.user_id === props.id;
  });


  const control = (periods) => {
    if (props.page === "admin") {
      setopen(true);
      setperiodsdata(periods);
    } else props.page("null");
  };

  const period = [
    "8:30-9:20",
    "9:20-10:10",
    "10:10-11:00",
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
          <div className="popup">
            <div className="closeButton" onClick={() => setopen(false)}>
              +
            </div>
            <div className="popmain">Update Lecture</div>
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
                subject.subject.map((data) => (
                  <option value={data.id}>{data.subject}</option>
                ))
              )}
            </select>
            <label className="popHead">Select Class</label>
                <select
                  defaultValue="Select Section"
                  onChange={(e) => setclassid(e.target.value)}
                  className="popInput"
                >
                  <option disabled value="Select Section">
                    Select Section
                  </option>
                  {sectiondata.map((section) => (
                    <option value={section.id}>{section.section}</option>
                  ))}
                </select>
            <div className="popbuttonflex">
              <button
                className="View"
                id="delete"
                onClick={() => deletelecture(periodsdata.id)}
              >
                Delete Lecture
              </button>
              <button
                className="View"
                id="arrangement"
                onClick={() => updatelecture(periodsdata)}
              >
                Update Lecture
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {Object.keys(data).length && props.finday ? (
        props.finday === "Entire Week" ? (
          <div style={{ marginLeft: "-8.8rem" ,marginBottom:"2rem" }}>
            <table className="EntireWeek">
              <thead>
                <tr className="EntireWeekRow">
                  <td className="EntireWeekRow" id="time"></td>
                  {period.map((time, i) => (
                    <td className="EntireWeekRow" id="time">
                      {time}
                    </td>
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
                            props.page !== "admin" ||
                            periods.subject_name.length === 1 ||
                            periods.subject_name === "break"
                          }
                        >
                          <div>{periods.subject_name}</div>
                          <div>{periods.section}</div>
                          <div style={{color:"#ff6600"}}>{periods.type}</div>
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
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
                            props.page !== "admin" ||
                            periods.subject_name.length === 1 ||
                            periods.subject_name === "break"
                          }
                        >
                          <div>{periods.subject_name}</div>
                          <div>{periods.section}</div>
                          <div style={{color:"#ff6600"}}>{periods.type}</div>
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
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
                            props.page !== "admin" ||
                            periods.subject_name.length === 1 ||
                            periods.subject_name === "break"
                          }
                        >
                          <div>{periods.subject_name}</div>
                          <div>{periods.section}</div>
                          <div style={{color:"#ff6600"}}>{periods.type}</div>
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
