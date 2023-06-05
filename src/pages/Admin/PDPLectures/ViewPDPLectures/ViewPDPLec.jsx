// import { TableCell, TableContainer, TableHead } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from "@mui/material";
import Nav from '../components/Nav/Nav';
import { useNavigate } from 'react-router-dom';

export let lecId=""

const ViewPDPLec = () => {
    const navigate = useNavigate();
    const tableheader=["S.No","Branch","Day","Period Time"];

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
                            <TableCell style={{textAlign:"center"}}>{item.branch}</TableCell>
                            <TableCell style={{textAlign:"center"}}>{item.day}</TableCell>
                            <TableCell style={{textAlign:"center"}}>{item.period}</TableCell>                          
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