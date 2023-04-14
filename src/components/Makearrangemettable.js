import axios from 'axios';
import React, { useState,useEffect } from 'react'


const Makearrangemettable = () => {
    const[arrangementdata,setarrangementdata]=useState([])
    const fetchInfo = () =>{
        axios.get(`https://time-table-production.up.railway.app/departmentss/arrangement_lectures_view/${5}`).then((response)=>setarrangementdata(response.data))
    }
    useEffect(() => {
      fetchInfo();
    }, [])
    
      
  return (
    <>
     <div className='popmain' style={{margin:"2rem 33rem"}}>Arrangement Table For Student</div>    
      <table>
        <thead>
            <tr>
            <td id='time'>S.NO</td>
                <td id='time'>Period</td>
                <td id='time'>Teacher</td>
                <td id='time'>Subject</td>
                <td id='time'>type</td>
                <td id='time'>Date</td>
            </tr>
            {arrangementdata.map((data,i)=>(
                <tr>
                <td>{i+1}</td>
                    <td>{data.period_time}</td>
                    <td>{data.faculty_name}</td>
                    <td>{data.subject_name}</td>
                    <td>{data.type}</td>
                    <td>{data.date}</td>
                </tr>
            ))}
        </thead>
     </table>
    </>
  )
}

export default Makearrangemettable;