import React, { useState } from 'react';
import "../styles/CreateTimeTable.css";
import SelectSection from '../components/SelectSection';
import AdminNavbar from '../components/AdminNavbar';
import Header from "../components/Header";

const CreateTimeTable = () => {



  const [sectionNo, setsectionNo] = useState([{}]);

  const addSec = () => {
    setsectionNo((prev) => {
      return [...prev, {}]
    })
    console.log(sectionNo)
  }



  return (
    <>
    <AdminNavbar/>
    <div className='createTable'>
      <div className='dept-select'>
        <select className='select-opt'>
        <option disabled selected>Select Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>
        <select className='select-opt'>
        <option disabled selected>Select Department</option>
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
        </select>
      </div>
      <div className="selectSection">
        <div className='section-box'>
          {
            sectionNo.map(() => {
              return (<SelectSection />)
            })
          }
        </div>
        <button onClick={addSec}>Add</button>
      </div>
      <div className='select-lec'>
        <select className='select-opt'>
        <option disabled selected>Select Subject</option>
          <option>Data Structure</option>
          <option>Data</option>
        </select>
        <select className='select-opt'>
        <option disabled selected>Type of Lectures</option>
          <option>Theory</option>
          <option>Lab</option>
        </select>
        <select className='select-opt'>
        <option disabled selected>No of Lectures</option>
          <option>1</option>
          <option>2</option>
        </select>
      </div>
    </div>
    </>
  )
}

export default CreateTimeTable