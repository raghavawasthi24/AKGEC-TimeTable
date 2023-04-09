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
      <div className="selectSection">
        <div className='section-box'>
          {
            sectionNo.map(() => {
              return (<SelectSection />)
            })
          }
        </div>
        <button onClick={addSec}>add</button>
      </div>
    </div>
    </>
  )
}

export default CreateTimeTable