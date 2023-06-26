import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import AdminNav from "../../../components/AdminNav/AdminNav";
import { useNavigate } from "react-router-dom";
import ProfileUpdate from "../TeacherProfileUpdate/ProfileUpdate";

const AllTeacherData = () => {
  const navigate = useNavigate();
  const [AllTeacher, setAllTeacher] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [dept, setDept] = useState();
  const [profile, setprofile] = useState();

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("user") === "Admin"
    ) {
      axios
        .get(`${process.env.REACT_APP_URL}/departmentss/all_teachers_data`)
        .then((response) => setAllTeacher(response.data));
      axios
        .get(`${process.env.REACT_APP_URL}/departmentss/departments`)
        .then((response) => setDeptData(response.data));
    } else {
      navigate("/login");
    }
  }, []);

  const filterData = AllTeacher.filter(function (value) {
    return (
      value.department === dept &&(
      value.user_fullname !== "​" &&
      value.mobile_number !== "​")
    );
  });
  console.log(filterData);

  const editUser = (e) => {
    setprofile(e);
  };
  const delUser = (e) => {};

  return (
    <>
      <AdminNav />
      <Container>
        {profile ? <ProfileUpdate profile_id={profile} /> : null}
        <Typography variant="h4" sx={{ padding: "1rem" }} align="center">
          Teachers Data
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            justifyContent: "center",
          }}
        >
          {/* <FormControl sx={{ width: "70%" }}>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              label="Department"
              onChange={(e) =>}
            >
              {deptData.map((dept) => (
                <MenuItem value={dept.dept}>{dept.dept}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <FormControl fullWidth sx={{ margin: "1rem 0rem" }}>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              label="Department"
              name="Department"
              defaultValue="Department"
              onChange={(e) => setDept(e.target.value)}
              defaultvalue={dept}
              value={dept}
            >
              {deptData.map((val) => {
                return <MenuItem value={val.dept}>{val.dept}</MenuItem>;
              })}
              <MenuItem value="​">No Department</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {dept && !profile ? (
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="center">S.No</TableCell> */}
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Department</TableCell>
                  <TableCell align="center">Subject</TableCell>
                  <TableCell align="center">Joined On</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData.map((data, i) => (
                  <TableRow key={data.name}>
                    {/* <TableCell align="center">{i + 1}</TableCell> */}

                    <TableCell align="center">{data.user_fullname}</TableCell>
                    <TableCell align="center">{data.email}</TableCell>
                    <TableCell align="center">{data.mobile_number}</TableCell>
                    <TableCell align="center">{data.department}</TableCell>
                    <TableCell align="center">
                      {data.subject.map((subName) => (
                        <Box sx={{ paddingBottom: "0.3rem" }}>
                          {subName.subject}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {data.joined_at.split("-").reverse().join("-")}
                    </TableCell>
                    <TableCell sx={{ width: "10%" }}>
                      <button
                        className="button"
                        onClick={(e) => editUser(data.profile_id)}
                        style={{
                          margin: "0.2rem",
                          backgroundColor: "white",
                          border: "1px solid black",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="button"
                        onClick={(e) => delUser(data.user_id)}
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Container>
    </>
  );
};

export default AllTeacherData;
