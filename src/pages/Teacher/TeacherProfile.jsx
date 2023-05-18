import { Typography,Container,Box,Grid} from '@mui/material'
import { useState,useEffect } from 'react'
import React from 'react'
import TeacherNav from '../../components/TeacherNav/TeacherNav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TeacherProfile = () => {
  const navigate = useNavigate()
  const[teacherdata,setteacherdata]=useState([])

  useEffect(() => {
    if(localStorage.getItem("accessToken")&&(localStorage.getItem("user")==="faculty")){
     axios.get(`${process.env.REACT_APP_URL}/departmentss/my_profile`
      ).then((response)=>setteacherdata(response.data))}
     else
     navigate("/login")
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
  


  return (

<>  
{Object.keys(teacherdata).length ?
    <>
    {/* <TeacherNav/> */}
    <Container sx={{margin:"7rem 37vw",backgroundColor:"rgba(257,257,257,0.4)",width:"50%"}} >
    <Box>
    <Typography component="h1" variant="h4" sx={{margin:'2rem 0rem'}}>Teacher Profile</Typography>
    <Grid container spacing={2}>
    <Grid item xs={12} >
    <Typography component="h1" varient="h5" sx={{margin:"0rem 1rem"}}>Full Name : {teacherdata.user_fullname}</Typography>
    <Typography component="h1" varient="h5" sx={{margin:"0rem 1rem"}}>Joined At : {teacherdata.joined_at}</Typography>
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Mobile Number : {teacherdata.mobile_number}</Typography>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Email : {teacherdata.email}</Typography>
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Gender : {teacherdata.gender}</Typography>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Age : {teacherdata.age}</Typography>
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Department : {teacherdata.department}</Typography>
    </Grid>
     <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Subjects : </Typography>
    {teacherdata.subject.map((sub,i)=>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>{sub.subject}</Typography>
     )}
    </Grid>
    </Grid>
    </Box>
   </Container>
  </>
   :null}
   </>
  )
}

export default TeacherProfile