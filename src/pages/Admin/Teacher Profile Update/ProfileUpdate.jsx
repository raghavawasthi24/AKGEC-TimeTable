import {
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { MultiSelect } from "react-multi-select-component";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";

const ProfileUpdate = () => {
  const [profileData, setProfileData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [subjectdata, setSubjectData] = useState([]);
  const [dept, setdept] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState([]);
  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/all_departments`)
      .then((response) => setDepartmentData(response.data));
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/Profileupdate/9`)
      .then((response) => setProfileData(response.data));

  }, []);

  useEffect(() => {
    if (dept)
      axios
        .get(`${process.env.REACT_APP_URL}/departmentss/all_subjects/2/${dept}`)
        .then((response) => { 
          const arr = response.data.map((sub) => ({name: sub.subject, value: sub.sub_id}))
          setSubjectData(arr)})
  }, [dept]);
 console.log("bjbjb")

  return (
    <>
      {departmentData.length > 0 ? (
        <Container sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}>
          <Typography component="h1" variant="h5">Teacher Profile Update</Typography>
          <Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                style={{ minWidth: "50vw" }}
                //   error={Boolean(formerror.gender)}
              >
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Department"
                  onChange={(e) => setdept(e.target.value)}
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
                  value={selectedSubject}
                  onChange={(e) => (setSelectedSubject(e.value))}
                  options={subjectdata}
                  optionLabel="name"

                  placeholder="Select Subjects"
                  display="chip"
                  sx={{minWidth:"50% !important"}}
                  className="w-full md:w"
                />
   
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </>
  );
};

export default ProfileUpdate;
