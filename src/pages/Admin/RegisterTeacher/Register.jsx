import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
  const initialvalues = {
    full_name: "",
    mobile_number: "",
    age: "",
    email: "",
    password: "",
    gender: "",
  };

  const navigate = useNavigate();
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerror, setformerror] = useState({});
  // const [submitbtn, setsubmitbtn] = useState(false);

  const inputhandler = (e) => {
    const { name, value } = e.target;
    validate(name,value)
    setformvalues({ ...formvalues, [name]: value });
  };
  const regex_fullname = /^[A-Za-z]+([\ A-Za-z]+)*$/;
  const regex_email = /^[a-zA-Z0-9._%+-]+@akgec\.ac\.in$/;
  const regex_mobile = /^[6-9]([0-9]){9}$/;

  const validate = (name,value) => {
  let error = {};
  switch(name){
     case 'full_name':
      error.full_name = regex_fullname.test(value)
        ? ""
        : "Invalid Name";
        break
      case 'email' : error.email = regex_email.test(value) ? "" : "Invalid Email";
      break
      case 'mobile_number': error.mobile =regex_mobile.test(value) ? "" : "Invalid Mobile Number";
      break
      case 'age': error.age = value ? "" : "Enter Age";
      break
      case 'password': error.password = value? "" : "Enter Password";
      break
      case 'gender': error.gender = value ? "" : "Enter Gender";
      break
      default:{}

      }
    setformerror({ ...formerror,...error });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    if(Object.values(formerror).every((x) => x === "" )&&Object.values(formvalues).every((x) => x !== "")){
    axios
      .post(`${process.env.REACT_APP_URL}/accounts/register/`, {
        full_name: formvalues.full_name,
        email: formvalues.email,
        age: formvalues.age,
        gender: formvalues.gender,
        password: formvalues.password,
        mobile_number: formvalues.mobile_number,
      })
      .then((response)=>(localStorage.setItem(response.data[1].profile_id))).catch((report)=>toast.error((Object.keys(report.response.data.error))  + " Already Registered"));
  }
  else{
    toast.error("Invalid Details")
  }};
  // useEffect(() => {
  //   console.log(formerror)

  //   if (Object.values(formerror).every((x) => x === "")) {
  //     setsubmitbtn(true);
  //   }
  // }, [formerror]);

  return (
    <>
      <Container
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
          <Box component="form"  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={formvalues.full_name}
                  error={Boolean(formerror.full_name)}
                  fullWidth
                  name="full_name"
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={inputhandler}
                  helperText={formerror.full_name}
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(formerror.mobile)}
                  fullWidth
                  name="mobile_number"
                  id="Mobile Number"
                  label="Mobile Number"
                  value={formvalues.mobile_number}
                  helperText={formerror.mobile}
                  type="number"
                  onChange={inputhandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="age"
                  error={Boolean(formerror.age)}
                  fullWidth
                  id="Age"
                  label="Age"
                  value={formvalues.age}
                  helperText={formerror.age}
                  type="number"
                  onChange={inputhandler}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={Boolean(formerror.email)}
                  name="email"
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={formvalues.email}
                  helperText={formerror.email}
                  type="email"
                  onChange={inputhandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  error={Boolean(formerror.email)}
                  helperText={formerror.password}
                  name="password"
                  fullWidth
                  value={formvalues.password}
                  label="Password"
                  type="password"
                  id="password"
                  onChange={inputhandler}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  style={{ minWidth: "50vw" }}
                  error={Boolean(formerror.gender)}
                >
                  <InputLabel id="demo-simple-select-label">Gender </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="gender"
                    onChange={inputhandler}
                    value={formvalues.gender}
                    fullWidth
                    name="gender"
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText>{formerror.gender}</FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#FBC705",
                borderRadius: "18px",
              }}
              onClick={handleSubmit}
              // disabled={!submitbtn}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Box sx={{ display: "flex" }}>
                  {" "}
                  Already have an account?
                  <Typography
                    sx={{ color: "#6358DC", marginLeft: "10px" }}
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
      </Container>
      <ToastContainer/>
    </>
  );
};

export default Register;
