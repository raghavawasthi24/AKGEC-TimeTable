import { Typography,TextField,Container,Box,Grid} from '@mui/material'
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
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Full Name</Typography>
    <TextField id="filled-basic"  variant="filled" disabled label={teacherdata.user_fullname} sx={{margin:"1rem",width:'20rem',border:"2px solid black",borderRadius:"10px"}}/>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Joined At</Typography>
    <TextField id="filled-basic" label={teacherdata.joined_at} variant="filled" disabled sx={{margin:"1rem" , width:"20rem" ,border:"2px solid black",borderRadius:"10px"}}/>
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Mobile Number</Typography>
    <TextField id="filled-basic" label={teacherdata.mobile_number} variant="filled" disabled sx={{margin:"1rem" , width:"20rem" ,border:"2px solid black",borderRadius:"10px"}}/>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Email</Typography>
    <TextField id="filled-basic"  label={teacherdata.email} variant="filled" disabled sx={{margin:"1rem" , width:"20rem" ,border:"2px solid black",borderRadius:"10px"}}/>
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Gender</Typography>
    <TextField id="filled-basic"  label={teacherdata.gender} variant="filled" disabled sx={{margin:"1rem" , width:"20rem" ,border:"2px solid black",borderRadius:"10px"}}/>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Age</Typography>
    <TextField id="filled-basic"  label={teacherdata.age} variant="filled" disabled sx={{margin:"1rem" , width:"20rem" ,border:"2px solid black",borderRadius:"10px"}}/>
    </Grid>
    <Grid item xs={12}>
    <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>Department</Typography>
    <TextField id="filled-basic"  label={teacherdata.department} variant="filled" disabled sx={{margin:"1rem" , width:"20rem" ,border:"2px solid black",borderRadius:"10px"}}/>
    </Grid>
    {teacherdata.subject.map((sub,i)=>
      <Grid item xs={12}>
      <Typography component="h1" varient="h4" sx={{margin:"0rem 1rem"}}>{'Subject '+ (i+1)}</Typography>
    <TextField id="filled-basic"  label={sub.subject} variant="filled" disabled sx={{margin:"1rem" , width:"20rem" ,border:"2px solid black",borderRadius:"10px"}} />
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