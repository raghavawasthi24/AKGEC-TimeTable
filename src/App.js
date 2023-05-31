import React from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTimeTable from './pages/Admin/CreateTimeTable/CreateTimeTable';
import Student from './pages/Student/Student';
import Header from './components/Header/Header';
import Teacher from './pages/Teacher/Teacher';
import Login from './pages/Login/Login';
import AdminFacultyVIew from './pages/Admin/AdminFacultyView/AdminFacultyView';
import Register from "./pages/Admin/RegisterTeacher/Register"
import TeacherProfile from '../src/pages/Teacher/Profile/TeacherProfile';

import Successful from './pages/Admin/CreateTimeTable/Successful';
import AllTeacherData from './pages/Admin/AllTeacherData/AllTeacherData';
import Create from './pages/Admin/CRUD/Create';


const App = () => {
   
 

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
      <Route path="/myprofile" element={<TeacherProfile/>}/>
      <Route path="/*" element={<Student/>}/>
      <Route path="/created" element={<Successful/>} />
      <Route path="/allteacher" element={<AllTeacherData/>}/>
      {/* <Route path='/CreateDepartment' element={<CreateDepartment/>} /> */}
      <Route path="/create" element={<Create/>}/>
      </Routes>
    
    </>
  )
  
}

export default App;
