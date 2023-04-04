import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Teacher.css";

function Teacher() {
  const [data, setData] = useState({});
  localStorage.setItem("tid","7")
  const id = localStorage.getItem("tid")
  console.log(id)
  const fetchInfo = () => {
    return axios
      .get(
        `https://time-table-production.up.railway.app/departmentss/view_teacher/${id}`
      )
      .then((response) => setData(response.data));
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const [day, setday] = useState("");
  const [finday, setfinday] = useState("");
  const resultday = (e) => {
    setday(e.target.value);
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

  const finalday = () => {
    setfinday(day);
  };
  return (
    <>
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
      {Object.keys(data).length && finday ? finday === "Entire Week" ? <div>
        <table className="EntireWeek">
            <thead>
                <tr className="EntireWeekRow">
                    <td className="EntireWeekRow"></td>
                    {period.map((time,i) => (
                        <td className="EntireWeekRow">{time}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(data).map((days)=>(
                    <tr className="EntireWeekRow">
                    <td className="EntireWeekRow">{days}</td>
                    {data[days].map((periods)=>(
                        <td className="EntireWeekRow">
                        <div>{periods.subject}</div>
                        <div>{periods.cid}</div>
                        </td>
                    ))}
                    </tr>
                ))}
            </tbody>
        </table>
      </div>:
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
                {/* <td>{data[finday][i].period}</td> */}
                <td>{data[finday][i].subject}</td>
                <td>{data[finday][i].cid}</td>
              </tr>
            ))}
        {/* {data[finday].map((item, i) => (
          <tr key={i}>
           
          </tr>
        ))} */}
          </tbody>
        </table>
       : <div className="empty">No TimeTable Selected</div>}
    </>
  );
}

export default Teacher;
