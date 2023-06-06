// import { TableCell, TableContainer, TableHead } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from "@mui/material";
import "./OELecture.css";
import Nav from '../components/Nav/Nav';
import { useNavigate } from 'react-router-dom';

export let lecObj={
    lecId:"",
    year:"",
    dept:"",
    sections:"",
    period:""
}

const OELecture = () => {
    const navigate = useNavigate();
    const tableheader=["S.No","Department","Sections","Period Time"];

    const [pdpdata,setPdpdata]=useState([]);
    useEffect(()=>{
        axios.get("https://time-table-production-9807.up.railway.app/departmentss/oe_lecture_view")
        .then((res)=>{
            console.log(res.data)
            setPdpdata(res.data)
        })
    },[])

    const editOELec=(id,year,dept,sections,period)=>{
    //   console.log(id); 
    lecObj.lecId=id;
    lecObj.year=year;
    lecObj.dept=dept;
    lecObj.sections=sections;
    lecObj.period=period;
     navigate("/editOELectures")

    }

    const delOELec=(id)=>{
        axios.delete(`${process.env.REACT_APP_URL}/departmentss/oe_lectureRUD/${id}`)
        .then((res)=>{
            console.log(res);
        })
    }
    
  return (
    <div className='pdpLec'>
        <Nav/>
       <TableContainer>
        <Table>
            <TableHead>
                {
                    tableheader.map((item)=>{
                        return(<TableCell style={{textAlign:"center"}}>{item}</TableCell>)
                    })
                }
            </TableHead>
            <TableBody>
               {
                pdpdata.map((item,key)=>{
                    return(
                        <TableRow>
                            <TableCell style={{textAlign:"center"}}>{key+1}</TableCell>
                            <TableCell style={{textAlign:"center"}}>{item.department_name}</TableCell>
                            <TableCell sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",border:"none"}}>
                                {
                                    item.sections.map((val)=>{
                                       return(<p style={{padding:"0.2rem"}}>{val.section}</p>)
                                    })
                                }
                            </TableCell>
                            <TableCell style={{textAlign:"center"}}>{item.period}</TableCell>
                            <TableCell sx={{width:"10%"}}>
                                <button className='button' onClick={e=>editOELec(item.id,item.year,item.department,item.sections,item.period_no)} style={{margin:"0.2rem"}}>Edit</button>
                                <button className='button' onClick={e=>delOELec(item.id)} style={{backgroundColor:"red",color:"white"}}>Delete</button>
                            </TableCell>
                        </TableRow>
                    )
                })
               }
            </TableBody>
        </Table>
       </TableContainer>
    </div>
  )
}

export default OELecture;
