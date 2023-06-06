// import { TableCell, TableContainer, TableHead } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from "@mui/material";
import Nav from '../components/Nav/Nav';
import { useNavigate } from 'react-router-dom';

export let lecId={
    id:"",
    dept:"",
    branch:"",
    period:"",
    day:""
}

const ViewPDPLec = () => {
    const navigate = useNavigate();
    const tableheader=["S.No","Branch","Day","Period Time"];
    const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const [pdpdata,setPdpdata]=useState([]);
    useEffect(()=>{
        axios.get("https://time-table-production-9807.up.railway.app/departmentss/pdp_lecture_view")
        .then((res)=>{
            console.log(res.data)
            setPdpdata(res.data)
        })
    },[])

    const editPDPLec=(id)=>{
    //   console.log(id); 
    lecId=id;
     navigate("/editPDPLectures")

    }

    const delPDPLec=(id)=>{
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
                            <TableCell style={{textAlign:"center"}}>{item.branch}</TableCell>
                            <TableCell style={{textAlign:"center"}}>{days[item.day]}</TableCell>
                            <TableCell style={{textAlign:"center"}}>{item.period}</TableCell> 
                            <TableCell sx={{width:"10%"}}>
                                <button className='button' onClick={e=>editPDPLec(item.id,item.department_name,item.branch,item.period,item.day)} style={{margin:"0.2rem"}}>Edit</button>
                                <button className='button' onClick={e=>delPDPLec(item.id)} style={{backgroundColor:"red",color:"white"}}>Delete</button>
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

export default ViewPDPLec