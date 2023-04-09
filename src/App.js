import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTimeTable from './pages/CreateTimeTable';
import Section from './pages/Section';
import Header from './components/Header';
import Teacher from './pages/Teacher';
import Login from './pages/Login';
import AdminFacultyVIew from './pages/AdminFacultyVIew';


const App = () => {

  return(
    <>
    {/* <Header/> */}
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<Section/>} />
      <Route path="/Teacher" element={<Teacher/>} />
      <Route path="/create-time-table" element={<CreateTimeTable/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/adminfaculty" element={<AdminFacultyVIew/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
  
}

export default App;
