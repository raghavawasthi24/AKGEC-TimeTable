import React, { useEffect, useState } from 'react';
import "./Login.css";
// import Cookies from "universal-cookie";
// import jwt from "jwt-decode";
import TextField from '@mui/material/TextField';
// import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const navigate = useNavigate()

  const initialvalues = {
    email: "",
    password: ""
  }

  // const cookies = new Cookies();

  const [formvalues, setFormvalues] = useState(initialvalues);
  const [error, setError] = useState(true);
  const [errors, setErrors] = useState("");
  const [verified, setVerified] = useState(false)
  const [facultyturn, setFacultyturn] = useState(false);
  // const [adminturn, setAdminturn] = useState(false);
  // const [pos, setPos] = useState(false);
  // const [user, setUser] = useState("");


  // const boldline = useRef();

  const facultyHandler = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  }

  // FUNCTION ON SUBMITTING
  const facultyvalidateForm = (e) => {
    e.preventDefault();
    formerror();
    if (facultyturn === false)
      setFacultyturn(true)
    else
      setFacultyturn(false)
  }

  useEffect(() => {
    delete axios.defaults.headers.common.Authorization
    
    if (verified === true) {
      if (error === true) {
        // console.log(formvalues)
        axios.post(`${process.env.REACT_APP_URL}/accounts/login/`, {
          email: formvalues.email,
          password: formvalues.password
        }).then((resp) => {
          // userToken.accessToken=resp.data.access,
          // setUser(resp.data.access);
          // console.log(resp.data.access);
          
          
          if((resp.data[0].access) && (resp.data[1].Admin===true)){
            // console.log("logged in admin")
          localStorage.setItem("accessToken",resp.data[0].access);
          localStorage.setItem("user","Admin");
<<<<<<< HEAD
    
=======
          console.log("logged in admin")
>>>>>>> 8df6fe43de3256e0a4abfdb869d8f78064b06a2e
          navigate("/admin")

          }
          
          else if((resp.data[0].access) && (resp.data[1].Admin===false)){
            localStorage.setItem("accessToken",resp.data[0].access);
            localStorage.setItem("user","faculty");
  
            navigate("/Teacher")
  
            }

          // else{
          //   toast.error("Try Logging as Admin")
          // }
        }).catch((err) => {
          toast.error("Invalid Details")
        })
      }
  
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facultyturn])

  // const adminHandler = (e) => {
  //   const { name, value } = e.target;
  //   setFormvalues({ ...formvalues, [name]: value });
  // }

  // FUNCTION ON SUBMITTING
  // const adminvalidateForm = (e) => {
  //   e.preventDefault();
  //   formerror();
  //   if (adminturn === false)
  //     setAdminturn(true)
  //   else
  //     setAdminturn(false)
  // }

//   useEffect(() => {
//     if (verified === true) {
//       if (error === true) {
        
//         axios.post(`${process.env.REACT_APP_URL}/accounts/login/`,{
      
//           email: formvalues.email,
//           password: formvalues.password
//         },
        
//         ).then((resp) => {
          
//           if((resp.data[0].access) && (resp.data[1].Admin===true)){
//           localStorage.setItem("accessToken",resp.data[0].access);
//           localStorage.setItem("user","Admin");

//           navigate("/admin")

//           }
//           else if((resp.data[0].access) && (resp.data[1].Admin===false)){
//             localStorage.setItem("accessToken",resp.data[0].access);
//             localStorage.setItem("user","Admin");
  
//             navigate("/Teacher")
  
//             }
//           else{
//             toast.error("Try Logging as Teacher")
//           }
//         }).catch((err) => {
//         toast.error("Invalid Details")
//         })
//       }
//     }
// // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [adminturn])

  //  VALIDATION STARTED
  const formerror = () => {
    setError(true);

    if (formvalues.email === "") {
      setError(false);
      setErrors("Invalid Email or Password")
    }
    else
      setErrors("")

    if (formvalues.password === "") {
      setError(false);
      setErrors("Invalid Email or Password")
    }
    else
      setErrors("")

    setVerified(true)
  }
  // VALIDATION END

  // const switchFaculty = () => {
  //   setPos(false)
  //   setFormvalues(initialvalues)
  //   boldline.current.style.left = "0";
  //   boldline.current.style.removeProperty("right");
  // }
  // const switchAdmin = () => {
  //   setPos(true)
  //   setFormvalues(initialvalues)
  //   boldline.current.style.removeProperty("left");
    // boldline.current.style.right = "0";
  // }


  return (
    <Container>
    <div className='login'>
      <div className='login-form'>
        <p style={{ color: 'red' }}>{errors}</p>
        <div className='form-header'>
          <div className='login-text'>
            <button>Login</button>
            {/* <button onClick={switchAdmin}>Login as Admin</button> */}
          </div>
          <hr className='line' />
          {/* <hr ref={boldline} className='boldline'></hr> */}
        </div>

        {/* FACULTY LOGIN FORM START */}

        <form className='faculty-form' onSubmit={facultyvalidateForm}>
          <TextField
            label="Email Address"
            variant="filled"
            value={formvalues.email}
            sx={{ width: '80%', margin: '1.2rem 0' }}
            name="email"
            size='small'
            onChange={facultyHandler} />

          <TextField
            label="Password"
            type="password"
            variant="filled"
            value={formvalues.password}
            sx={{ width: '80%', marginBottom: '1.2rem 0' }}
            name="password"
            size='small'
            onChange={facultyHandler} />

          <input type='submit' className='submit' />
        </form>

        {/* FACULTY LOGIN FORM END */}
        {/* ADMIN LOGIN FORM START */}

        {/* <form className='admin-form' id={pos === true ? "" : "hide"} onSubmit={adminvalidateForm}>
          <TextField
            label="Email Address"
            variant="filled"
            value={formvalues.email}
            sx={{ width: '80%', margin: '1.2rem 0' }}
            name="email"
            size='small'
            onChange={adminHandler} />

          <TextField
            label="Password"
            type="password"
            variant="filled"
            value={formvalues.password}
            sx={{ width: '80%', marginBottom: '1.2rem 0' }}
            name="password"
            size='small'
            onChange={adminHandler} />

          

          <input type='submit' className='submit' />
        </form> */}

      </div>
    </div>
    <ToastContainer/>

    </Container>
  )
}

export default Login;