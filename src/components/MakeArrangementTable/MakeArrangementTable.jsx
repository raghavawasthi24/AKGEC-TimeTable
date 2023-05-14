import axios from 'axios';
import React, { useState,useEffect } from 'react'


const Makearrangemettable = (props) => {
    const[arrangementdata,setarrangementdata]=useState([])
   
    useEffect(() => {
      console.log(props.id)
      if(props.id)
      axios.get(`${process.env.REACT_APP_URL}/departmentss/arrangement_lectures_view/${props.id}`).then((response)=>setarrangementdata(response.data))
      
    }, [props.id])
    
      
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
     <div className='popmain' style={{margin:"5%"}}>Arrangement Table For Student</div>    
      <table>
        <thead>
            <tr>
            <td id='time'>S.NO</td>
            <td id='time'>Date</td>
                <td id='time'>Period</td>
                <td id='time'>Teacher</td>
                <td id='time'>Subject</td>
                <td id='time'>type</td>
            </tr>
            {arrangementdata.map((data,i)=>(
                <tr>
                <td>{i+1}</td>
                <td>{data.date.split("-").reverse().join("-")}</td>
                    <td>{data.period_time}</td>
                    <td>{data.faculty_name}</td>
                    <td>{data.subject_name}</td>
                    <td>{data.type}</td>
                </tr>
            ))}
        </thead>
     </table>
    </div>
  )
}

export default Makearrangemettable;