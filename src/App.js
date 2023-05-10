import React from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTimeTable from './pages/CreateTimeTable';
import Section from './pages/Section';
import Header from './components/Header';
import Teacher from './pages/Teacher';
import Login from './pages/Login';
import AdminFacultyVIew from './pages/AdminFacultyVIew';
import Register from "./pages/Register"
import ProfileUpdate from './pages/ProfileUpdate';


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
      <Route path="/register" element={<Register/>} />
      <Route path='/profileupdate' element={<ProfileUpdate/>}/>
      </Routes>
    
    </>
  )
  
}

export default App;
