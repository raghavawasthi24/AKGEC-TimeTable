import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Period from '../components/Period';
import "../styles/Section.css";

const Section = () => {
  
    let classData=[];

    const [classwise_Data,setClasswise_Data]=useState(classData)
  
  
    useEffect(()=>{
      axios.get("https://time-table-production.up.railway.app/departmentss/view-time-table1/3")
      .then((res)=>{
        console.log(res.data)
        classData=[];
        for(let j=0;j<res.data.Monday.length;j++)
        {
            classData.push(res.data.Monday[j]);
            
        }
        for(let j=0;j<res.data.Tuesday.length;j++)
        {
            classData.push(res.data.Tuesday[j]);
            
        }
        for(let j=0;j<res.data.Wednesday.length;j++)
        {
            classData.push(res.data.Wednesday[j]);
            
        }
        for(let j=0;j<res.data.Thursday.length;j++)
        {
            classData.push(res.data.Thursday[j]);
            
        }
        for(let j=0;j<res.data.Friday.length;j++)
        {
            classData.push(res.data.Friday[j]);
            
        }
        console.log(classData);
        setClasswise_Data(classData);
      }).catch((err)=>{
        console.log(err)
      })
    },[])
    return (
      <div className="App">
        <div className='grid-container'>
         {
            classwise_Data.map((val)=>{
                return(
                    <Period subject={val.subject} faculty={val.faculty} type={val.type}/>
                )
            })
         }        
        </div>
      </div>
    );
  
}

export default Section