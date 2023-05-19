import {
  Container,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { MultiSelect } from "react-multi-select-component";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileUpdate = (props) => {

  // const [profileData, setProfileData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [subjectdata, setSubjectData] = useState([]);
  const [dept, setdept] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
  axios.defaults.headers.common['Authorization'] = AuthStr;

  // console.log(dept)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/departments`)
      .then((response) => setDepartmentData(response.data));
    // axios
    //   .get(`${process.env.REACT_APP_URL}/departmentss/Profileupdate/9`)
    //   .then((response) => setProfileData(response.data));
  }, []);

  useEffect(() => {
    if (dept)
      axios
        .get(`${process.env.REACT_APP_URL}/departmentss/all_subjects/2/${dept}`)
        .then((response) => {
          const arr = response.data.map((sub) => ({
            name: sub.subject,
            value: sub.sub_id,
          }))
          setSubjectData(arr);
        });
  }, [dept]);

  const handleSubmit = () => {
    if (selectedSubject == null) {
      toast.error("Select Subject First");
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_URL}/departmentss/Profileupdate/${props.profile_id}`,
          { department: dept, subject: selectedSubject }
        )
        .then(() => toast.success("Profile Updated and Verify Email"));
    }
  };

  // console.log(dept,selectedSubject)

  return (
    <>
      {/* {departmentData.length > 0 ? ( */}
        <Box>
          <Container
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70%",
            }}
          >
            <Typography component="h1" variant="h5" className="updatehead" style={{width:"16rem"}}>
              Teacher Profile Update
            </Typography>
            <Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  style={{ marginTop: "1rem", width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Department"
                    onChange={(e) => {
                      setdept(e.target.value); setSelectedSubject(null)
                    }}
                    defaultValue={""}
                    fullWidth
                    // name='Department'
                  >
                    {departmentData.map((dept) => (
                      <MenuItem value={dept.deptid}>{dept.dept}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <MultiSelect
                  style={{ margin: "1rem 0rem",width:"30vw",minWidth:"15rem"}}
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.value)}
                  options={subjectdata}
                  optionLabel="name"
                  placeholder="Select Subjects"
                  display="chip"
                  className="w-full md:w-20rem"
                />
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
                Update
              </Button>
            </Grid>
          </Container>
          <ToastContainer />
        </Box>
      {/* ) : null} */}
    </>
  );
};

export default ProfileUpdate;
