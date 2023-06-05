import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/primereact.min.css";

import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const CreateSubject = () => {
  const [newSubject, setNewSubject] = useState();
  const [year, setYear] = useState();
  const [dept, setDept] = useState();
  const [option, setOption] = useState();
  const [department, setDepartment] = useState([]);
  const [updateSub, setUpdateSub] = useState([]);
  const [updatedSub, setUpdatedSub] = useState({});
  const [allSubject, setAllSubject] = useState([]);
  const [filtered2, setfiltered] = useState();

  const yearArray = [1, 2, 3, 4];

  const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
  axios.defaults.headers.common["Authorization"] = AuthStr;
  useEffect(() => {
    if (option && year)
      axios
        .get(
          `${process.env.REACT_APP_URL}/departmentss/all_departments/${year}`
        )
        .then((res) => {
          const arr = res.data.map((sub) => ({
            name: sub.dept,
            id: sub.deptid,
          }));
          setDepartment(arr);
        });
  }, [option, year]);

  useEffect(() => {
    if (option === "UPDATE" && year && dept)
      axios
        .get(
          `${process.env.REACT_APP_URL}/departmentss/all_subjects/${year}/${dept}`
        )
        .then((res) => setAllSubject(res.data));
  }, [option, year, dept]);

  useEffect(() => {
    if (newSubject && option === "UPDATE") {
      axios
        .get(
          `${process.env.REACT_APP_URL}/departmentss/Subjectupdate/${newSubject}`
        )
        .then(
          (res) => (
            setUpdateSub(res.data),
            setUpdatedSub(res.data),
            intial(res.data.department)
          )
        );
    }
  }, [newSubject, option]);

  const handleSubmit = () => {
    const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
    axios.defaults.headers.common["Authorization"] = AuthStr;
    const finaldept = [];
    dept.map((dep) => finaldept.push(dep.id));

    axios
      .post(`${process.env.REACT_APP_URL}/departmentss/SubjectCreate`, {
        subject: newSubject,
        year: year,
        department: finaldept,
      })
      .then(
        (res) => toast.success("Subject Added Successfully"),
        setOption(),
        setNewSubject(),
        setYear(),
        setDept(),
        (finaldept.length = 0)
      );
  };
  const handleUpdate = () => {
    const finaldept = [];
    filtered2.map((dep) => finaldept.push(dep.id));

    const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
    axios.defaults.headers.common["Authorization"] = AuthStr;
    const obj = {
      department: finaldept,
      year: updatedSub.year,
      subject: updatedSub.subject,
      id: updatedSub.id,
    };
    axios
      .patch(
        `${process.env.REACT_APP_URL}/departmentss/Subjectupdate/${newSubject}`,
        obj
      )
      .then(
        (res) => setOption(),
        setUpdateSub([]),
        setUpdatedSub({}),
        setDept(),
        (finaldept.length = 0),
        setfiltered(),

        toast.success("Updated Successfully")
      );
  };
  const handleDelete = () => {
    const AuthStr = "Bearer ".concat(localStorage.getItem("accessToken"));
    axios.defaults.headers.common["Authorization"] = AuthStr;
    axios
      .delete(
        `${process.env.REACT_APP_URL}/departmentss/Subjectupdate/${newSubject}`
      )
      .then(
        (res) => setOption(),
        setUpdateSub([]),
        setUpdatedSub({}),
        toast.success("Deleted Successfully")
      );
  };

  const intial = (value) => {
    var filtered = department.filter(function (item) {
      return value?.indexOf(item.id) !== -1;
    });
    setfiltered(filtered);
  };

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
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ textAlign: "center" }}
          >
            Select Option
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=" "
            name="radio-buttons-group"
            row
            onChange={(e) => setOption(e.target.value)}
          >
            <FormControlLabel value="ADD" control={<Radio />} label="ADD" />
            <FormControlLabel
              value="UPDATE"
              control={<Radio />}
              label="UPDATE"
            />
          </RadioGroup>
        </FormControl>
        {option === "ADD" ? (
          <Box>
            <Typography
              component="h1"
              variant="h5"
              style={{ margin: "1rem 0rem", textAlign: "center" }}
            >
              Add Subject
            </Typography>
            <Box>
              <TextField
                sx={{ margin: "1rem 0rem" }}
                fullWidth
                id="outlined-basic"
                label="Subject"
                variant="outlined"
                onChange={(e) => setNewSubject(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  label="Year"
                  name="Year"
                  defaultValue="Year"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  {yearArray.map((val) => {
                    return <MenuItem value={val}>{val}</MenuItem>;
                  })}
                </Select>
              </FormControl>
       
              <FormControl fullWidth>
                <MultiSelect
                  style={{ maxWidth: "40rem", margin: "1rem 0rem" }}
                  value={dept}
                  onChange={(e) => setDept(e.value)}
                  options={department}
                  optionLabel="name"
                  placeholder="Select Department"
                  display="chip"
                  className="w-full md:w-20rem"
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
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
                Add Subject
              </Button>
            </Box>
          </Box>
        ) : null}

        {option === "UPDATE" ? (
          <Container>
            <Typography
              component="h1"
              variant="h5"
              style={{ margin: "1rem 0rem", textAlign: "center" }}
            >
              Update Subject
            </Typography>

            <FormControl fullWidth sx={{ margin: "1rem 0rem" }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                label="Year"
                name="Year"
                defaultValue="Year"
                onChange={(e) => {
                  setYear(e.target.value);
                  setUpdatedSub({});
                  setUpdateSub([]);
                }}
              >
                {yearArray.map((val) => {
                  return <MenuItem value={val}>{val}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ margin: "1rem 0rem" }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                label="Department"
                name="departments"
                defaultValue="Department"
                onChange={(e) => {
                  setDept(e.target.value);
                  setUpdateSub([]);
                  setUpdatedSub({});
                }}
              >
                {department.map((val) => {
                  return <MenuItem value={val.id}>{val.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ margin: "1rem 0rem" }}>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                label="Subject"
                name="Subject"
                defaultValue="Department"
                onChange={(e) => {
                  setNewSubject(e.target.value);
                  setUpdateSub([]);
                  setUpdatedSub({});
                }}
              >
                {allSubject.map((val) => {
                  return <MenuItem value={val.id}>{val.subject}</MenuItem>;
                })}
              </Select>
            </FormControl>

            {Object.keys(updateSub).length > 0 ? (
              <Box>
                <TextField
                  sx={{ margin: "1rem 0rem" }}
                  fullWidth
                  id="outlined-basic"
                  label="Subject"
                  variant="outlined"
                  onChange={(e) =>
                    setUpdatedSub({ ...updatedSub, subject: e.target.value })
                  }
                  defaultValue={updateSub.subject}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select
                    label="Year"
                    name="Year"
                    defaultValue={updateSub.year}
                    onChange={(e) => {
                      setUpdatedSub({ ...updatedSub, year: e.target.value });
                    }}
                    value={updatedSub.year}
                  >
                    {yearArray.map((val) => {
                      return <MenuItem value={val}>{val}</MenuItem>;
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <MultiSelect
                    style={{ maxWidth: "60rem", margin: "1rem 0rem" }}
                    options={department}
                    optionLabel="name"
                    placeholder="Select Department"
                    display="chip"
                    className="w-full md:w-20rem"
                    onChange={(e) => setfiltered(e.value)}
                    value={filtered2}
                  />
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#FBC705",
                      borderRadius: "18px",
                      marginRight: "2rem",
                    }}
                    onClick={handleUpdate}
                    // disabled={!submitbtn}
                  >
                    Update Subject
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "red",
                      borderRadius: "18px",
                    }}
                    onClick={handleDelete}
                    // disabled={!submitbtn}
                  >
                    Delete Subject
                  </Button>
                </Box>
              </Box>
            ) : null}
          </Container>
        ) : null}
      </Container>
      <ToastContainer />
    </>
  );
};

export default CreateSubject;
