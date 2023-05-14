import React from 'react'

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
  return (
    <div style={styles.successfulCont}>
        <div style={styles.successDiv}>
           <p style={{fontSize:"2rem"}}>The TimeTable is successfuly created.</p>
        </div>
    </div>
  )
}

export default Successful