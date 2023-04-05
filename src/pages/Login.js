import React, { useEffect, useState } from 'react';
import "../styles/Login.css";
import TextField from '@mui/material/TextField';
import Header from '../components/Header';


const Login = () => {

  const initialvalues={
    email:"",
    password:""
  }
  const [formvalues,setFormvalues]=useState(initialvalues);
  const [error,setError]=useState(true);
  const [errors,setErrors]=useState("");
  const [verified,setVerified]=useState(false)
  const [turn,setTurn]=useState(false);

  const userHandler = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });   
  }

  const validateForm=(e)=>{
   e.preventDefault();
   formerror();
   if(turn==false)
   setTurn(true)
   else
   setTurn(false)
   }


  const formerror=()=>{
   setError(true);
    
   if(formvalues.email=="")
   {
    setError(false);
    setErrors("Invalid Email or Password")
   }
   else
   setErrors("")

   if(formvalues.password=="")
   {
    setError(false);
    setErrors("Invalid Email or Password")
   }
   else
   setErrors("")

   setVerified(true)
  }

  useEffect(()=>{
    if(verified==true)
    {
    if(error==true)
    {
      console.log(formvalues)
    }
    else
    console.log("sry");
  }

  },[turn])

  return (
    <div className='login'>
      <Header/>
      <div className='login-form'>
      <p style={{color:'red'}}>{errors}</p>
        <div className='login-text'>
          <h3>Login as Faculty</h3>
          <h3>Login as Admin</h3>
        </div>
        
        <hr className='line'/>
        <form className='form' onSubmit={validateForm}>
           <TextField id="filled-basic" label="Email Address" variant="filled" value={formvalues.email} sx={{width:'80%',margin:'1.2rem 0'}} name="email" size='small' onChange={userHandler}/>
           <TextField id="filled-basic" label="Password" type="password" variant="filled" value={formvalues.password} sx={{width:'80%',marginBottom:'1.2rem 0'}} name="password" size='small' onChange={userHandler}/>

           <div className='remember'>
              <div className='checkbox'>
                <input type='checkbox'/>
                <label>Remember Me</label>
              </div>
              <p>Forgot Password?</p>
           </div>

           <input type='submit' className='submit'/>
           </form>

      </div>
    </div>
  )
}

export default Login