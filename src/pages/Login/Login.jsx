import React, { useEffect, useState } from "react";
import "./Login.css";
// import Cookies from "universal-cookie";
// import jwt from "jwt-decode";
import TextField from "@mui/material/TextField";
// import Header from '../components/Header';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import IconButton from "@mui/material/IconButton";
import FilledInput from '@mui/material/FilledInput';

import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();

  const initialvalues = {
    email: "",
    password: "",
  };

  // const cookies = new Cookies();

  const [formvalues, setFormvalues] = useState(initialvalues);
  const [error, setError] = useState(true);
  const [errors, setErrors] = useState("");
  const [verified, setVerified] = useState(false);
  const [facultyturn, setFacultyturn] = useState(false);
  // const [adminturn, setAdminturn] = useState(false);
  // const [pos, setPos] = useState(false);
  // const [user, setUser] = useState("");
  let [loading, setLoading] = useState(false);

  // const boldline = useRef();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };

  // FUNCTION ON SUBMITTING
  const facultyvalidateForm = (e) => {
    e.preventDefault();
    formerror();
    if (facultyturn === false) setFacultyturn(true);
    else setFacultyturn(false);
  };

  useEffect(() => {
    delete axios.defaults.headers.common.Authorization;

    if (verified === true) {
      if (error === true) {
        // console.log(formvalues)
        setLoading(true);
        axios
          .post(`${process.env.REACT_APP_URL}/accounts/login/`, {
            email: formvalues.email,
            password: formvalues.password,
          })
          .then((resp) => {
            if (resp.data[0].access && resp.data[1].Admin === true) {
              // console.log("logged in admin")
              localStorage.setItem("accessToken", resp.data[0].access);
              localStorage.setItem("user", "Admin");
              localStorage.setItem("refreshToken", resp.data[0].refresh);
              setLoading(false);

              // console.log("logged in admin")
              navigate("/admin");
            } else if (resp.data[0].access && resp.data[1].Admin === false) {
              localStorage.setItem("accessToken", resp.data[0].access);
              localStorage.setItem("user", "faculty");

              navigate("/Teacher");
            }
          })
          .catch((err) => {
            toast.error("Invalid Details");
            setLoading(false);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facultyturn]);

  //  VALIDATION STARTED
  const formerror = () => {
    setError(true);

    if (formvalues.email === "") {
      setError(false);
      setErrors("Invalid Email or Password");
    } else setErrors("");

    if (formvalues.password === "") {
      setError(false);
      setErrors("Invalid Email or Password");
    } else setErrors("");

    setVerified(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={loading ? "loading" : "hide"}>
        <BeatLoader color={"black"} loading={loading} size={15} />
      </div>
      <Container>
        <div className="login">
          <div className="login-form">
            <p style={{ color: "red" }}>{errors}</p>
            <div className="form-header">
              <div className="login-text">
                <button>Login</button>
                {/* <button onClick={switchAdmin}>Login as Admin</button> */}
              </div>
              <hr className="line" />
              {/* <hr ref={boldline} className='boldline'></hr> */}
            </div>

            {/* FACULTY LOGIN FORM START */}

            <form className="faculty-form" onSubmit={facultyvalidateForm}>
              <TextField
                label="Email Address"
                variant="filled"
                value={formvalues.email}
                sx={{ width: "80%", margin: "1.2rem 0" }}
                name="email"
                size="small"
                onChange={inputHandler}
              />

              {/* <TextField
                label="Password"
                type="password"
                variant="filled"
                value={formvalues.password}
                sx={{ width: "80%", marginBottom: "1.2rem 0" }}
                name="password"
                size="small"
                onChange={facultyHandler}
              /> */}

              <FormControl sx={{ m: 1, width: "80%" }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={inputHandler}
                  value={formvalues.password}
                  name="password"
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <input type="submit" className="submit" />
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
        <ToastContainer />
      </Container>
    </>
  );
};

export default Login;
