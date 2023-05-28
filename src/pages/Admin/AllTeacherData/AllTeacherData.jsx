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

const AllTeacherData = () => {
  const [AllTeacher, setAllTeacher] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const[dept,setDept]=useState()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/all_teachers_data`)
      .then((response) => setAllTeacher(response.data));
    axios
      .get(`${process.env.REACT_APP_URL}/departmentss/departments`)
      .then((response) => setDeptData(response.data));
  }, []);
   
  const filterData = AllTeacher.filter(function (value) {
    return value.department === dept;
  });
  console.log(filterData)

  return (
    <>
      <Container>
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
        <FormControl sx={{width:"70%"}}>

          <InputLabel id="demo-simple-select-label">
          Department</InputLabel>
          <Select
            label="Department"
            onChange={(e)=>setDept(e.target.value)}
          >
            {deptData.map((dept) => (
              <MenuItem value={dept.dept}>{dept.dept}</MenuItem>
            ))}
          </Select>
        </FormControl>

        </Box>

        {filterData ? 
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
                  <TableCell align="center">{data.joined_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>:null}
      </Container>
      
    </>
  );
};

export default AllTeacherData;
