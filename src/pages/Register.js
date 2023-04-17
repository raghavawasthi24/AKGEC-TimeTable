import React from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Container,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const initialvalues = {
        full_name: "",
        mobile_number: "",
        email: "",
        gender: "",
        residence: "",
      }
  const navigate = useNavigate();
  const [formvalues, setformvalues] = useState(initialvalues);
  const regex_email = /^([a-z]){3,15}[2][12]([0-9]){5,6}@akgec.ac.in$/;
  const regex_contact = /^[6-9]([0-9]){9}$/;
  return (
    <>
      <Container
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="Mobile Number"
                label="Mobile Number"
                name="Mobile Number"
                autoComplete="Mobile Number"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="Age"
                label="Age"
                name="Age"
                autoComplete="Age"
                type="number"
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid sx={{marginTop:"1rem",display:"flex"}} >
              <FormLabel id="demo-controlled-radio-buttons-group" sx={{padding:"1rem"}}>
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                // value={value}
                // onChange={handleChange}
                sx={{margin:"1rem"}}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#FBC705" , borderRadius:"18px" }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography>
                {" "}
                Already have an account?
                <Typography
                  sx={{ color: "#6358DC" }}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Register;
