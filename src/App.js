import React from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTimeTable from './pages/Admin/CreateTimeTable/CreateTimeTable';
import Student from './pages/Student/Student';
import Header from './components/Header/Header';
import Teacher from './pages/Teacher/Teacher';
import Login from './pages/Login/Login';
import AdminFacultyVIew from './pages/Admin/AdminFacultyView/AdminFacultyView';


const App = () => {

  return(
    <>
    <Header/>
      <Routes>
      <Route path="/" element={<Student/>} />
      <Route path="/Teacher" element={<Teacher/>} />
      <Route path="/create-time-table" element={<CreateTimeTable/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/adminfaculty" element={<AdminFacultyVIew/>} />
      </Routes>
    
    </>
  )
  
}

export default App;
