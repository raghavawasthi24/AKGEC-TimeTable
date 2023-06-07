// import { TableCell, TableContainer, TableHead } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from "@mui/material";
import Nav from '../components/Nav/Nav';
import AdminNav from "../../../../components/AdminNav/AdminNav";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export let lecId={
    id:"",
    dept:"",
    branch_id:"",
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

    const editPDPLec=(id,branch,branch_id,period,day)=>{
    //   console.log(id); 
    lecId.id=id;
    lecId.branch_id=branch_id;
    lecId.branch=branch;
    lecId.period=period;
    lecId.day=day;
     navigate("/editPDPLectures")
    }

    const delPDPLec=(id)=>{
        axios.delete(`${process.env.REACT_APP_URL}/departmentss/pdp_lectureRUD/${id}`)
        .then((res)=>{
            console.log(res);
            toast.success("Classes deleted Successfully")
        }).catch((err)=>{
            toast.error("Invalid Details")
        })
    }
    
  return (
    <>
        <AdminNav/>
        <Nav/>
       <TableContainer sx={{width:"80%",margin:" 1rem auto"}}>
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
                            <TableCell style={{textAlign:"center"}}>{days[item.day-1]}</TableCell>
                            <TableCell style={{textAlign:"center"}}>{item.period}</TableCell> 
                            <TableCell sx={{width:"10%"}}>
                                <button className='button' onClick={e=>editPDPLec(item.id,item.branch,item.branch_id,item.period_no,item.day)} style={{margin:"0.2rem"}}>Edit</button>
                                <button className='button' onClick={e=>delPDPLec(item.id)} style={{backgroundColor:"black",color:"white"}}>Delete</button>
                            </TableCell>                         
                        </TableRow>
                    )
                })
               }
            </TableBody>
        </Table>
       </TableContainer>
       <ToastContainer/>
    </>
  )
}

export default ViewPDPLec