import React, { useRef, useState } from 'react';
import "../styles/CreateTimeTable.css";
// import SelectSection from '../components/SelectSection';
import AdminNavbar from '../components/AdminNavbar';
import Header from "../components/Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export let sectionObj=[]

const CreateTimeTable = () => {

  const initialvalues = {
    year: "",
    department: "",
    section: "",
    subject: "",
    type_of_lecture: "",
    no_of_lecture: "",
    teacher:""
  }

  

  const [sectionNo, setsectionNo] = useState([{}]);
  const [visibiltyCount, setVisibiltyCount] = useState(0);
  const [section, setSection] = useState([]);
  const [sectionSel,setSectionSel]=useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formvalues,setFormvalues]=useState(initialvalues);
  const [teacherlist,setTeacherlist]=useState([]);
  // const [teacherId,setTeacherId]=useState("");
  // const teachId=useRef();

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
    setSubjects([]);
    if(visibiltyCount<2)
    setVisibiltyCount(2);
    axios.get("https://time-table-production.up.railway.app/departmentss/department_wise_sections/1/7")
      .then((resp) => {
        console.log(resp.data)
        for (let i = 0; i < resp.data.length; i++) {
          setSection((prev) => {
            return [...prev, {
              id:resp.data[i].id,
              section:resp.data[i].section
            }]
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
            return [...prev, resp.data[i]]
          })
        }
        console.log(resp)
        console.log(subjects)
      }).catch((err) => {
        console.log(err)
      })
  }

  const teacherSel=(e)=>{
    setTeacherlist([]);
    if(visibiltyCount<4)
    setVisibiltyCount(4);
    axios.get(`https://time-table-production.up.railway.app/departmentss/select_teachers/${e.target.value}`).then((resp)=>{
      console.log(resp)
      for(let i=0;i<resp.data.length;i++)
      {
        setTeacherlist((prev)=>{
          return[...prev,{id:resp.data[i].user_id,teacher:resp.data[i].user}]
        })
      } 
      console.log(teacherlist)
    }).catch((err)=>{
      console.log(err)
    })
    console.log(e.target.value);
  }



  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  }

  
   
  const sectionVal=(e)=>{
    if(visibiltyCount<3)
    setVisibiltyCount(3);
    if(e.target.checked)
    {
      sectionObj.push(e.target.value);
      // console.log(e.target.value)
    }
    else
    // sectionObj.pop(e.target.value);
    {
      for(let i=0;i<sectionObj.length;i++)
      {
        if(sectionObj[i]===e.target.value)
        {
        for(let j=i;j<sectionObj.length;j++)
        {
           sectionObj[j]=sectionObj[j+1]
        }
        sectionObj.length--;
        
      }
      }
    }
    console.log(sectionObj)
    setSectionSel(sectionObj)
  }

  const no_of_lecSel=()=>{
    if(visibiltyCount<5)
    setVisibiltyCount(5);
  }

  const type_of_lecSel=()=>{
    if(visibiltyCount<6)
    setVisibiltyCount(6);
  }



  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(formvalues)
    console.log(sectionObj)
    console.log({
      year: formvalues.year,
    department: formvalues.department,
    section: sectionSel,
    subject: formvalues.subject,
    type_of_lecture:  formvalues.type_of_lecture,
    no_of_lecture:  formvalues.no_of_lecture,
    teacher:formvalues.teacher,
    })

    axios.post("https://time-table-production.up.railway.app/departmentss/create_table/",{
    class_id: sectionSel,
    subject_id: formvalues.subject,
    type:  formvalues.type_of_lecture,
    no_of_lectures:  formvalues.no_of_lecture,
    teacher_id:formvalues.teacher,
    }).then((resp)=>{
      console.log(resp)
    }).catch((err)=>{
      console.log(err)
    })
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
          <select className={visibiltyCount > 0 ? 'select-opt' : 'hide'} name="department" onChange={e => { inputHandler(e); deptselect()}}>
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
            } */}
            {/* {
              <select className='select-opt' name="section" onChange={ddd} multiple>
              {
                section.map((val)=>{
                  return(<option value={val}>{val}</option>)
                })
              }
            </select>
            } */}
            {
              section.map((val)=>{
                return(<div>
                  <input type="checkbox" value={val.id} onClick={sectionVal}/>
                  <label>{val.section}</label>
                </div>)
              })
            }
          </div>
          {/* <button onClick={addSec}>Add</button> */}
        </div>
        <div className='select-lec'>
          <select className={visibiltyCount > 2 ? 'select-opt' : 'hide'} name="subject" onChange={e => { inputHandler(e); teacherSel(e)}}>
            <option disabled selected>Select Subject</option>
            {
              subjects.map((val) => {
                return (<option value={val.id}>{val.subject}</option>)
              })
            }
          </select>
          <select className={visibiltyCount > 3 ? 'select-opt' : 'hide'} name="type_of_lecture" onChange={e => { inputHandler(e); no_of_lecSel()}}>
            <option disabled selected>Type of Lectures</option>
            <option>THEORY</option>
            <option>LAB</option>
          </select>
          <select className={visibiltyCount > 4 ? 'select-opt' : 'hide'} name="no_of_lecture" onChange={e => { inputHandler(e); type_of_lecSel()}}>
            <option disabled selected>No of Lectures</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>


        <div className={visibiltyCount > 5 ? 'teacher-sel' : 'hide'}>



          
            <select className='select-opt'  name='teacher' onChange={e=>{inputHandler(e)}}>
              <option selected disabled>Select Teacher</option>
          {
            teacherlist.map((val)=>{
              return(<option value={val.id}>{val.teacher}</option>)
            })
          }
          </select>
          
        </div>

        <button type='submit'> Create TimeTable</button>

        
      </form>
    </>
  )
}

export default CreateTimeTable