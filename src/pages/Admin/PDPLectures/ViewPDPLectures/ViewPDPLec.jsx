// import { TableCell, TableContainer, TableHead } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import "./OELecture.css";
import Nav from '../components/Nav/Nav';
import { useNavigate } from 'react-router-dom';

export let lecId=""

const ViewPDPLec = () => {
    const navigate = useNavigate();
    const tableheader=["S.No","Department","Sections","Period Time"];

    const [pdpdata,setPdpdata]=useState([]);
    useEffect(()=>{
        axios.get("https://time-table-production-9807.up.railway.app/departmentss/pdp_lecture_view")
        .then((res)=>{
            console.log(res.data)
            setPdpdata(res.data)
        })
    },[])

    const editOELec=(id)=>{
    //   console.log(id); 
    lecId=id;
     navigate("/editPDPLectures")

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
                            {
                                item.sections.map((val)=>{
                                   return(<p style={{padding:"0.2rem"}}>{val.section}</p>)
                                })
                            }
                            <TableCell style={{textAlign:"center"}}>{item.period}</TableCell>
                            <TableCell>
                                <button className='button' onClick={e=>editOELec(item.id)}>Edit</button>
                                <button className='button' onClick={e=>delOELec(item.id)}>Delete</button>
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
