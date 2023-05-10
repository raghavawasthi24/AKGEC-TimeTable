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


const Register = () => {
  const initialvalues = {
    full_name: "",
    mobile_number: "",
    age: "",
    email: "",
    password: "",
    gender: "",
  };
  let error = {};

  const navigate = useNavigate();
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerror, setformerror] = useState(error);
  const [submitbtn, setsubmitbtn] = useState(false);

  const inputhandler = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };
  const regex_fullname = /^[A-Za-z]+([\ A-Za-z]+)*$/;
  const regex_email = /^[a-zA-Z0-9._%+-]+@akgec\.ac\.in$/;
  const regex_mobile = /^[6-9]([0-9]){9}$/;

  const validate = () => {
    error.full_name = regex_fullname.test(formvalues.full_name)
      ? ""
      : "Invalid Name";
    error.email = regex_email.test(formvalues.email) ? "" : "Invalid Email";
    error.mobile = regex_mobile.test(formvalues.mobile_number)
      ? ""
      : "Invalid Mobile Number";
    error.age = formvalues.age ? "" : "Enter Age";
    error.password = formvalues.password ? "" : "Enter Password";
    error.gender = formvalues.gender ? "" : "Enter Gender";
    setformerror({ ...error });

    return Object.values(error).every((x) => x === "");
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_URL}/accounts/register/`, {
        full_name: formvalues.full_name,
        email: formvalues.email,
        age: formvalues.age,
        gender: formvalues.gender,
        password: formvalues.password,
        mobile_number: formvalues.mobile_number,
      })
      .then((response) => alert("Email Sent Successfully")).catch((report)=>alert((Object.keys(report.response.data.error))  + " Must be Filled"));
  };
  useEffect(() => {
    if (validate()) {
      setsubmitbtn(true);
    }
  }, []);

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
        <form onChange={validate}>
          <Box component="form" noValidate sx={{ mt: 3 }}>
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
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography sx={{ display: "flex" }}>
                  {" "}
                  Already have an account?
                  <Typography
                    sx={{ color: "#6358DC", marginLeft: "10px" }}
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default Register;
