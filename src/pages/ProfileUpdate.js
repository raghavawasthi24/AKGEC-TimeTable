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
  const [selectedCities, setSelectedCities] = useState(null);
  const [temp, settemp] = useState({ name: "", value: "" });
  const arr = [];

  // console.log(dept)

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
        .then((response) => setSubjectData(response.data));
  }, [dept]);

  useEffect(() => {
    console.log(subjectdata)
    subjectdata.map((sub) => (
    (settemp({name: sub.subject, value: sub.sub_id })),
    arr.push(temp)));
    console.log(arr);
  }, [subjectdata]);

  return (
    <>
      {departmentData.length > 0 ? (
        <Container>
          <Typography>Teacher Profile Update</Typography>
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
              <div className="card flex justify-content-center">
                <MultiSelect
                  value={selectedCities}
                  onChange={(e) => setSelectedCities(e.value)}
                  options={arr}
                  optionLabel="name"
                  placeholder="Select Subjects"
                  display="chip"
                  className="w-full md:w-20rem"
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </>
  );
};

export default ProfileUpdate;
