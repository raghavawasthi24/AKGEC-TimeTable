import React, { useState } from 'react';
import "../styles/CreateTimeTable.css";
// import SelectSection from '../components/SelectSection';
import AdminNavbar from '../components/AdminNavbar';
import Header from "../components/Header";
import axios from 'axios';

const CreateTimeTable = () => {

  const initialvalues = {
    year: "",
    department: "",
    section: "",
    subject: "",
    type_of_lecture: "",
    no_of_lecture: ""
  }

  

  const [sectionNo, setsectionNo] = useState([{}]);
  const [visibiltyCount, setVisibiltyCount] = useState(0);
  const [section, setSection] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formvalues,setFormvalues]=useState(initialvalues);

  const addSec = () => {
    setsectionNo((prev) => {
      return [...prev, {}]
    })
    console.log(sectionNo)
  }


  const yearSelect = () => {
    if(visibiltyCount<1){
    console.log("year selected")
    setVisibiltyCount(1)
    }
  }

  const deptselect = (e) => {
    setSection([]);
    if(visibiltyCount<2)
    setVisibiltyCount(2);
    axios.get("https://time-table-production.up.railway.app/departmentss/department_wise_sections/1/7")
      .then((resp) => {
        console.log(resp.data)
        for (let i = 0; i < resp.data.length; i++) {
          setSection((prev) => {
            return [...prev, resp.data[i].section]
          })
        }
        console.log(section)
      }).catch((err) => {
        console.log(err)
      })
    axios.get("https://time-table-production.up.railway.app/departmentss/all_subjects/2/1")
      .then((resp) => {
        for (let i = 0; i < resp.data.length; i++) {
          setSubjects((prev) => {
            return [...prev, resp.data[i].subject]
          })
        }
        console.log(resp)
        console.log(subjects)
      }).catch((err) => {
        console.log(err)
      })
  }

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(formvalues)
  }

  return (
    <>
      <AdminNavbar />
      <form className='createTable' onSubmit={submitHandler}>
        <div className='dept-select'>
          <select className='select-opt' name="year" onChange={e => { inputHandler(e); yearSelect()}} >
            <option disabled selected>Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <select className={visibiltyCount > 0 ? 'select-opt' : 'hide'} onChange={e => { inputHandler(e); deptselect()}}>
            <option disabled selected>Select Department</option>
            <option value="1">CSE</option>
            <option value="2">IT</option>
            <option value="3">ECE</option>
            <option value="4">EN</option>
            <option value="5">ME</option>
            <option value="6">CIVIL</option>
          </select>
        </div>
        <div className={visibiltyCount > 1 ? 'selectSection' : 'hide'}>
          <div className='section-box'>
            {/* {
              sectionNo.map(() => {
                return (<SelectSection section={section} />)
              })
            } */}
            {
              sectionNo.map(()=>{
                return(<div className='selectSection'>
                  <select className='select-opt' name="section" onChange={inputHandler}>
                    {
                      section.map((val)=>{
                        return(<option value={val}>{val}</option>)
                      })
                    }
                  </select>
                </div>)
              })
            }
          </div>
          <button onClick={addSec}>Add</button>
        </div>
        <div className='select-lec'>
          <select className='select-opt' name="subject" onChange={inputHandler}>
            <option disabled selected>Select Subject</option>
            {
              subjects.map((val) => {
                return (<option value={val}>{val}</option>)
              })
            }
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

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default CreateTimeTable