// import { TableCell, TableContainer, TableHead } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from "@mui/material";
import "./OELecture.css";
import Nav from '../components/Nav/Nav';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from "../../../../components/AdminNav/AdminNav";

export let lecObj={
    lecId:"",
    year:"",
    dept:"",
    sections:[],
    period:""
}

const OELecture = () => {
    const navigate = useNavigate();
    const tableheader=["S.No","Department","Sections","Period Time"];
    const [showpopup,setShowpopup]=useState(false)
    const [delid,setdelId]=useState();

    const [pdpdata,setPdpdata]=useState([]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/departmentss/oe_lecture_view`)
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
        setShowpopup(true);
        setdelId(id);
        
    }

    const confirmDelete=()=>{
        console.log(delid);
       axios.delete(`${process.env.REACT_APP_URL}/departmentss/oe_lectureRUD/${delid}`)
        .then((res)=>{
            console.log(res);
            toast.success("Classes deleted successfully");
            // window.location.reload();
            axios.get(`${process.env.REACT_APP_URL}/departmentss/oe_lecture_view`)
            .then((res)=>{
                console.log(res.data)
                setPdpdata(res.data)
                setShowpopup(false);
            })
        }).catch((err)=>{toast.error("Invalid Details")})
     
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
                                <button className='button' onClick={e=>editOELec(item.id,item.year,item.department,item.sections,item.period_no)} style={{margin:"0.5rem 0"}}>Edit</button>
                                <button className='button' onClick={e=>delOELec(item.id)} style={{backgroundColor:"black",color:"white"}}>Delete</button>
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

export default OELecture;
