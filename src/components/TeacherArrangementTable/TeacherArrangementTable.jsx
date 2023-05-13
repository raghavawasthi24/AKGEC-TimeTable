// import { ConnectingAirportsOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useState,useEffect } from 'react'


const TeacherArrangemetTable = (props) => {
    const[arrangementdata,setarrangementdata]=useState([])
    const fetchInfo = () =>{

        axios.get(`${process.env.REACT_APP_URL}/departmentss/arrangement_lectures_teacher_view/${props.id}`).then((response)=>setarrangementdata(response.data))
    }
    useEffect(() => {
      fetchInfo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

  return (
    <>
     <div className='popmain' style={{margin:"2rem 28.5rem"}}>Arrangement Table</div>    
      <table>
        <thead>
            <tr>
            <td id='time'>S.NO</td>
            <td id='time'>Date</td>
                <td id='time'>Period</td>
                <td id='time'>Subject</td>
                <td id='time'>type</td>
                <td id='time'>Section</td>

            </tr>
            {arrangementdata.map((data,i)=>(
                <tr>
                <td>{i+1}</td>
                <td>{data.date}</td>
                    <td>{data.period_time}</td>
                    <td>{data.subject_name}</td>
                    <td>{data.type}</td>
                    <td>{data.section}</td>
                </tr>
            ))}
        </thead>
     </table>
    </>
  )
}

export default TeacherArrangemetTable;