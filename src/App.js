import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTable from './pages/CreateTable';
import Section from './pages/Section';
import Header from './components/Header';
import Teacher from './pages/Teacher';


const App = () => {

  return(
    <>
    <Header/>
    <Section/>
    </>
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Section/>} />
      <Route path="/Teacher" element={<Teacher/>} />
      <Route path="/table" element={<CreateTable/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
  
}

export default App;
