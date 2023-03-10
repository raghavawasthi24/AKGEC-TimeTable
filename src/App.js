import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Section from './pages/Section';
import Teacher from './pages/Teacher';


const App = () => {

  return(
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Section/>} />
      <Route path="/Teacher" element={<Teacher/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
  
}

export default App;
