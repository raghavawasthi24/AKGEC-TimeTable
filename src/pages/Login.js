import React, { useEffect, useState, useRef} from 'react';
import {useNavigate} from "react-router-dom"
import "../styles/Login.css";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import axios from 'axios';


const Login = () => {

  const initialvalues = {
    email: "",
    password: ""
  }

  const cookies = new Cookies();

  const [formvalues, setFormvalues] = useState(initialvalues);
  const [error, setError] = useState(true);
  const [errors, setErrors] = useState("");
  const [verified, setVerified] = useState(false)
  const [facultyturn, setFacultyturn] = useState(false);
  const [adminturn, setAdminturn] = useState(false);
  const [pos, setPos] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();


  const boldline = useRef();

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
    if (verified === true) {
      if (error === true) {
        console.log(formvalues)
        axios.post(`${process.env.REACT_APP_URL}/accounts/login/`, {
          email: formvalues.email,
          password: formvalues.password
        }).then((resp) => {
          // userToken.accessToken=resp.data.access,
          // setUser(resp.data.access);
         
          console.log(resp.data.access);
          localStorage.setItem("accessToken",resp.data.access);
        }).catch((err) => {
          console.log(err)
        })
        // const AuthStr = 'Bearer '.concat(user);
        
        console.log("faculty")
      }
      else
        console.log("sry");
    }

  }, [facultyturn])

  const adminHandler = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  }

  // FUNCTION ON SUBMITTING
  const adminvalidateForm = (e) => {
    e.preventDefault();
    formerror();
    if (adminturn === false)
      setAdminturn(true)
    else
      setAdminturn(false)
  }

  useEffect(() => {
    if (verified === true) {
      if (error === true) {
        console.log(formvalues)
        console.log("admin")
        const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken")); 
        axios.post("https://time-table-production.up.railway.app/accounts/register/",{
          mobile_number:"9151240246",
          email: "raghavawathi240@gmail.com",
          full_name:"Raghav Awasthi",
          gender:"Male",
          age:60,
          password:"string"
        }, {
          headers: {
            Authorization: AuthStr,
          },
        } ).then((resp) => {
          console.log(resp.data)
        }).catch((err) => {
          console.log(err)
        })
      }
      else
        console.log("sry");
    }

  }, [adminturn])

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

  const switchFaculty = () => {
    setPos(false)
    setFormvalues(initialvalues)
    boldline.current.style.left = "0";
    boldline.current.style.removeProperty("right");
  }
  const switchAdmin = () => {
    setPos(true)
    setFormvalues(initialvalues)
    boldline.current.style.removeProperty("left");
    boldline.current.style.right = "0";
  }


  return (
    <div className='login'>
      <div className='login-form'>
        <p style={{ color: 'red' }}>{errors}</p>
        <div className='form-header'>
          <div className='login-text'>
            <button onClick={switchFaculty}>Login as Faculty</button>
            <button onClick={switchAdmin}>Login as Admin</button>
          </div>
          <hr className='line' />
          <hr ref={boldline} className='boldline'></hr>
        </div>

        {/* FACULTY LOGIN FORM START */}

        <form className='faculty-form' id={pos == false ? "" : "hide"} onSubmit={facultyvalidateForm}>
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

          <div className='remember'>
            <div className='checkbox'>
              <input type='checkbox' />
              <label>Remember Me</label>
            </div>
            <p>Forgot Password?</p>
          </div>

          <input type='submit' className='submit' />
        </form>

        {/* FACULTY LOGIN FORM END */}
        {/* ADMIN LOGIN FORM START */}

        <form className='admin-form' id={pos == true ? "" : "hide"} onSubmit={adminvalidateForm}>
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

          <div className='remember'>
            <div className='checkbox'>
              <input type='checkbox' />
              <label>Remember Me</label>
            </div>
            <p>Forgot Password?</p>
          </div>

          <input type='submit' className='submit' />
        </form>
        <div>Don't have an account ?
            <div onClick={()=>navigate("/register")} >Register</div>
        </div>
      </div>
    </div>
  )
}

export default Login;