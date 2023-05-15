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
    <Container>

    <Box  sx={{ mt: 3 }}>
   
    <Typography component="h1" variant="h3">Teacher Profile</Typography>
    <Grid container spacing={2}>

    <Grid item xs={12} >
    <TextField id="filled-basic"  variant="filled" disabled label={teacherdata.user_fullname} sx={{margin:"1rem"}}/>


    <TextField id="filled-basic" label={teacherdata.joined_at} variant="filled" disabled sx={{margin:"1rem"}}/>
    </Grid>

    <Grid item xs={12}>

    <TextField id="filled-basic" label={teacherdata.mobile_number} variant="filled" disabled sx={{margin:"1rem"}}/>
   
    <TextField id="filled-basic"  label={teacherdata.email} variant="filled" disabled sx={{margin:"1rem"}}/>
    </Grid>

    <Grid item xs={12}>

    <TextField id="filled-basic"  label={teacherdata.gender} variant="filled" disabled sx={{margin:"1rem"}}/>
   

    <TextField id="filled-basic"  label={teacherdata.age} variant="filled" disabled sx={{margin:"1rem"}}/>
    </Grid>

    <Grid item xs={12}>

    <TextField id="filled-basic"  label={teacherdata.department} variant="filled" disabled sx={{margin:"1rem"}}/>
    </Grid>
   

    {teacherdata.subject.map((sub,i)=>
      <Grid item xs={12}>
      <Box sx={{display:"flex"}}>
      <Typography component="h1" varient="h5">{'Subject '+ (i+1)}</Typography>
    <TextField id="filled-basic"  label={sub.subject} variant="filled" disabled />
    </Box>
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