import { Box } from '@mui/material'
import React from 'react'
import LogoutBtn from '../Logout/LogoutBtn'
import { useNavigate } from 'react-router-dom'

const TeacherNav = () => {
    const navigate = useNavigate()
  return (
    <Box sx={{margin:"1rem 0rem",right: "36rem", position: "absolute"}}>
    {/* <button className="View" style={{width:"12rem"}} onClick={showstudent}>
        View Student TimeTable
      </button> */}
    <button className='View' onClick={()=>navigate("/teacherprofile" )} style={{width:"10rem"}}>View Profile Data</button>
    <button className='View' onClick={()=>navigate("/teacher")} style={{width:"10rem"}}>View TimeTable</button>

     <LogoutBtn />
    </Box>
  )
}

export default TeacherNav