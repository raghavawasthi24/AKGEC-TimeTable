import axios from 'axios';
import React, { useState,useEffect } from 'react'


const Makearrangemet = () => {
    const[freeteacher,setfreeteacher]=useState([])
    const fetchInfo = () =>{
        axios.get("https://time-table-production.up.railway.app/departmentss/arrangement_teachers").then((response)=>setfreeteacher(response.data))
    }
    useEffect(() => {
      fetchInfo();
    }, [])
    
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
    <>
     <table>
        <thead>
            <tr>
                <td></td>
                <td>Available Teacher</td>
                <td>Subject</td>
                <td>Class</td>
            </tr>
            {period.map((period)=>(
                <tr>
                    <td>{period}</td>
                    <td>
                    <select
          id="teacher"
          onChange={finalteacher}
          placeholder="Select Teacher"
          defaultValue="Select Teacher"
          className="SelectDay"
          value={teacher}

        >
          <option disabled>Select Teacher</option>
          {freeteacher.map((teacher) => (
            <option value={teacher.user_id}>{teacher.user}</option>
          ))}
        </select>
                    </td>
                    <td></td>
                    <td></td>
                </tr>

            ))}
        </thead>
     </table>
    </>
  )
}

export default Makearrangemet