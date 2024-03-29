// import { TableCell, TableContainer, TableHead } from '@mui/material'
import axios from 'axios';
import "./ViewPDPLecture.css";
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
    const [showpopup,setShowpopup]=useState(false)
    const [delid,setdelId]=useState();


    const [pdpdata,setPdpdata]=useState([]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/departmentss/pdp_lecture_view`)
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
        setShowpopup(true);
        setdelId(id);
    }

    const confirmDelete=()=>{
        console.log(delid);
        axios.delete(`${process.env.REACT_APP_URL}/departmentss/pdp_lectureRUD/${delid}`)
        .then((res)=>{
            console.log(res);
            toast.success("Classes deleted Successfully");
            axios.get(`${process.env.REACT_APP_URL}/departmentss/pdp_lecture_view`)
        .then((res)=>{
            console.log(res.data)
            setPdpdata(res.data)
        })
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
                                <button className='button' onClick={e=>editPDPLec(item.id,item.branch,item.branch_id,item.period_no,item.day)} style={{margin:"0.2rem",backgroundColor:"white",border:"1px solid black"}}>Edit</button>
                                <button className='button' onClick={e=>delPDPLec(item.id)} style={{backgroundColor:"black",color:"white"}}>Delete</button>
                            </TableCell>                         
                        </TableRow>
                    )
                })
               }
            </TableBody>
        </Table>
       </TableContainer>
       <div className={showpopup?'popupWindow':"hide"}>
           <div className='delete-Popup'>
            <p style={{fontSize:"1.2rem",margin:"0.5rem"}}>Are you sure to delete this?</p>
            <div className='deleteBtn'>
                <button className='button' style={{margin:"0.5rem",backgroundColor:"red",color:"white"}} onClick={confirmDelete}>Delete</button>
                <button className='button' style={{margin:"0.5rem",backgroundColor:"black",color:"white"}} onClick={()=>setShowpopup(false)}>Cancel</button>
            </div>
           </div>
       </div>
       <ToastContainer/>
    </>
  )
}

export default ViewPDPLec