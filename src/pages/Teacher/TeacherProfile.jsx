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
    <TeacherNav/>
    <Container sx={{margin:"7rem 37vw"}} >
    <Box  sx={{ mt: 3 }}>
    <Typography component="h1" variant="h3" sx={{margin:'2rem 0rem'}}>Teacher Profile</Typography>
    <Grid container spacing={2}>
    <Grid item xs={12} >
  
    <Typography component="h1" varient="h5" sx={{margin:"0rem 1rem"}}>Full Name:{teacherdata.user_fullname}</Typography>
    <Typography component="h1" varient="h5" sx={{margin:"0rem 1rem"}}>Joined At:{teacherdata.joined_at}</Typography>
   
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Mobile Number</Typography>
    <Typography  label={teacherdata.mobile_number} variant="filled" disabled />
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Email</Typography>
    <Typography   label={teacherdata.email} variant="filled" disabled />
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Gender</Typography>
    <Typography   label={teacherdata.gender} variant="filled" disabled />
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Age</Typography>
    <Typography   label={teacherdata.age} variant="filled" disabled />
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Department</Typography>
    <Typography   label={teacherdata.department} variant="filled" disabled />
    </Grid>
    {teacherdata.subject.map((sub,i)=>
      <Grid item xs={12}>
      <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>{'Subject '+ (i+1)}</Typography>
    <Typography   label={sub.subject} variant="filled" disabled  />
    </Grid>
    )}
    </Grid>
    </Box>
   </Container>
  </>
   :null}
   </>
  )
}

export default TeacherProfile