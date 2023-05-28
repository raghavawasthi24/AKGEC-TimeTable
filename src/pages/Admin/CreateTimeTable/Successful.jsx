import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNav from '../../../components/AdminNav/AdminNav'

const styles={
    successfulCont:{
      width:"100vw",
      display:"flex",
      justifyContent:"center"
    },
    successDiv:{
        marginTop:"3%",
       backgroundColor:"grey",
       padding:"3%"
    }
}

const Successful = () => {
const navigate = useNavigate()
useEffect(() => {
  if(!(localStorage.getItem("accessToken")&&(localStorage.getItem("user")==="Admin"))){
   navigate("/login")
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])
  return (
    <>
    <AdminNav/>

    <div style={styles.successfulCont}>
        <div style={styles.successDiv}>
           <p style={{fontSize:"2rem"}}>The TimeTable is successfuly created.</p>
        </div>
    </div>
    </>
  )
}

export default Successful