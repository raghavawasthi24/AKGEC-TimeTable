// import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { Box, Typography,Container } from '@mui/material';
import axios from 'axios';
import React, { useState,useEffect } from 'react'


const TeacherArrangemetTable = (props) => {
    const[arrangementdata,setarrangementdata]=useState([])
    const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
    axios.defaults.headers.common['Authorization'] = AuthStr;
    const fetchInfo = () =>{

        axios.get(`${process.env.REACT_APP_URL}/departmentss/arrangement_lectures_teacher_view/${props.id}`).then((response)=>setarrangementdata(response.data))
    }
    useEffect(() => {
      fetchInfo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

  return (
    <>
    {arrangementdata.length >= 0 ?
    <Container style={{marginBottom:'3rem'}}>
     <Typography className='popmain' style={{fontSize:"2rem",textAlign:"center",marginTop:"2rem"}}>Arrangement Table</Typography>   
     <Box style={{overflowX:"auto"}}>
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
     </Box> 
     </Container>:null}
    </>
  )
}

export default TeacherArrangemetTable;