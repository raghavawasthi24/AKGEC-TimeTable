import React, { useState,useEffect } from 'react'
import axios from 'axios' 
import "../styles/CreateTable.css"

const CreateTable = () => {

  const fetchinfo = () =>{
    axios.get("https://time-table-production.up.railway.app/departmentss/select_teachers/2").then((response) => setteacherdata(response.data))
  }
  useEffect(() => {
    fetchinfo();
  }, []);
 
  const[Teacher,setteacher]=useState("")
  const[subjectid,setsubjectid]=useState("")
  const[classid,setclassid]=useState("")
  const[lecture,setlecture]=useState()
  const[type,settype]=useState("")
  const[teacherdata,setteacherdata]=useState([])

  const finalteacher = (e) =>{
     setteacher(e.target.value)
  }
  const Post = () =>{
    axios.post("https://time-table-production.up.railway.app/departmentss/create_table/",{teacher_id:Teacher , subject_id:subjectid, class_id :[classid], no_of_lectures:parseInt(lecture) ,type:type}).then((response)=> console.log(response)).catch((error) => console.log(error))
  }
  return (
    <div className='maintable'>
    <div style={{fontSize:"3rem" , width:"17rem" ,marginLeft:"-2rem"}}>Create Table</div>
    <div className='field'>
    <select 
        id="teacher"
        onChange={finalteacher}
        placeholder="Select Teacher"
        defaultValue="Select Teacher"
        className="SelectTeacher">
        <option disabled >Select Teacher</option>
    {teacherdata.map((teachername,i)=>(
      <option value={teachername.id} key={i}>{teachername.user}</option>
    ))}
    {/* <input type="text" placeholder='Teacher Id' onChange={(e)=>setteacher(e.target.value)}/> */}
    </select>
    </div>
    <div className='field'>
    <input className='inputfield' type="text" placeholder='Subject Id' onChange={(e)=> setsubjectid(e.target.value)}/>
    </div>
    <div className='field'>
    <input className='inputfield' type="text" placeholder='Class Id'  onChange={(e)=>setclassid(e.target.value)}/>
    </div>
    <div className='field'>
    <input className="inputfield" type="number" placeholder='No of Lecture'  onChange={(e)=>setlecture(e.target.value)}/>
    </div>
    <div className='field'>
    <input className="inputfield"  type="text" placeholder='LAB or THEORY'  onChange={(e)=>settype(e.target.value)}/>
    </div>
    <input style={{marginLeft:"1.5rem"}}className='View' type="Submit" placeholder='Post' onClick={Post}/>
    </div>
  )
}

export default CreateTable;