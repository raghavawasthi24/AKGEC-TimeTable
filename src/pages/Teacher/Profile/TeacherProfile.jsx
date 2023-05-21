import { Typography,Container,Box,Grid} from '@mui/material'
import { useState,useEffect } from 'react'
import React from 'react'
import TeacherNav from '../../../components/TeacherNav/TeacherNav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./TeacherProfile.css"
import AdminNav from '../../../components/AdminNav/AdminNav'
const TeacherProfile = () => {
  const navigate = useNavigate()
  const[teacherdata,setteacherdata]=useState([])

  useEffect(() => {
    if(localStorage.getItem("accessToken")&&(((localStorage.getItem("user")==="faculty"))||(localStorage.getItem("user")==="Admin"))){
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
    {/* <Box style={{display:"flex",justifyContent:"flex-end"}}> */}
    {localStorage.getItem("user") === "faculty" ? <TeacherNav/> : <AdminNav/>}
    {/* </Box> */}
    <Container  >
    <Box style={{margin:'1rem'}}>
    <Typography component="h1" variant="h4" style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}} >My Profile</Typography>
    <Grid container spacing={2} style={{justifyContent:"center",display:"grid"}}>
    <Grid item xs={12}  >
    <Box style={{display:'flex'}}>
    <Typography className="profilehead">Full Name : </Typography>
    <Typography component="h1" varient="h4" className="details" >{teacherdata.user_fullname}</Typography>
    </Box>
    <Box style={{display:'flex'}}>
    <Typography className="profilehead">Joined At : </Typography>
    <Typography component="h1" varient="h4" className="details"> {teacherdata.joined_at}</Typography>
    </Box>
    <Box style={{display:'flex'}}>
    <Typography className="profilehead">Mobile Number : </Typography>
    <Typography component="h1" varient="h4" className="details"> {teacherdata.mobile_number}</Typography>
    </Box>

    <Box style={{display:'flex'}}>
    <Typography className="profilehead">Email :  </Typography>
    <Typography component="h1" varient="h4"  className="details">{teacherdata.email}</Typography>
    </Box>

    <Box style={{display:'flex'}}>
    <Typography className="profilehead">Gender :  </Typography>
    <Typography component="h1" varient="h4"  className="details">{teacherdata.gender}</Typography>
    </Box>

    <Box style={{display:'flex'}}>
    <Typography className="profilehead">Age :</Typography>
    <Typography component="h1" varient="h4"  className="details"> {teacherdata.age}</Typography>
    </Box>


    <Box style={{display:'flex'}}>
    <Typography className="profilehead">Department : </Typography>
    <Typography component="h1" varient="h4" className="details"> {teacherdata.department}</Typography>
    </Box>

    <Box style={{display:'flex'}}>
    <Typography component="h1" varient="h4" className="profilehead" >Subjects : </Typography>
    <Grid className='subjectBox'>

    {teacherdata.subject.map((sub,i)=>
    <Typography component="h1" varient="h4" className="details"> - {sub.subject}</Typography>

     )}
    </Grid>

     </Box>
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