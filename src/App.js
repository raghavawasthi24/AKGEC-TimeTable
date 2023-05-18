import React, { useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTimeTable from './pages/Admin/CreateTimeTable/CreateTimeTable';
import Student from './pages/Student/Student';
import Header from './components/Header/Header';
import Teacher from './pages/Teacher/Teacher';
import Login from './pages/Login/Login';
import AdminFacultyVIew from './pages/Admin/AdminFacultyView/AdminFacultyView';
import Register from "./pages/Admin/RegisterTeacher/Register"
import TeacherProfile from './pages/Teacher/TeacherProfile';

import Successful from './pages/Admin/CreateTimeTable/Successful';
import axios from 'axios';
// import ProfileUpdate from './pages/Admin/TeacherProfileUpdate/ProfileUpdate';


const App = () => {
   
  useEffect(() => {
  setInterval(()=>{
  if((localStorage.getItem("accessToken")&&((localStorage.getItem("user")===("Admin"))||(localStorage.getItem("user")===("faculty"))))){
    delete axios.defaults.headers.commmon.Authorization
   axios.post(`${process.env.REACT_APP_URL}/accounts/refresh-token/`,{}).then((response)=>(console.log(response)))}},5000)
  }, [])

  return(
    <>
    <Header/>
      <Routes>
      <Route path="/" element={<Student/>} />
      <Route path="/Teacher" element={<Teacher/>} />
      <Route path="/create-time-table" element={<CreateTimeTable/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/admin" element={<AdminFacultyVIew/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/teacherprofile" element={<TeacherProfile/>}/>
      <Route path="/*" element={<Student/>}/>
      <Route path="/created" element={<Successful/>} />
      {/* <Route path='/profileupdate' element={<ProfileUpdate/>}/> */}
      </Routes>
    
    </>
  )
  
}

export default App;
