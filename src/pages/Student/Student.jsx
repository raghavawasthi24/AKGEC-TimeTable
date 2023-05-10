import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Period from '../../components/Period/Period';
import "../Student/Student.css";
import Makearrangemettable from '../../components/MakeArrangementTable/MakeArrangementTable';


const Student = () => {
  
    let classData_mon=[];
    let classData_tue=[];
    let classData_wed=[];
    let classData_thurs=[];
    let classData_fri=[];

    let period_time_obj=[];

    const [classwise_Data_Mon,setClasswise_Data_Mon]=useState(classData_mon)
    const [classwise_Data_Tue,setClasswise_Data_Tue]=useState(classData_tue)
    const [classwise_Data_Wed,setClasswise_Data_Wed]=useState(classData_wed)
    const [classwise_Data_Thurs,setClasswise_Data_Thurs]=useState(classData_thurs)
    const [classwise_Data_Fri,setClasswise_Data_Fri]=useState(classData_fri)
    const [period_time,setPeriod_time]=useState(period_time_obj)
  
  
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_URL}/departmentss/view-time-table1/14`)
      .then((res)=>{
        console.log(res.data)

        period_time_obj=[
          {period:"."},
        ]

        classData_mon=[
          {
            days:"Monday"
          }
        ];
        classData_tue=[
          {
            days:"Tuesday"
          }
        ];
        classData_wed=[
          {
            days:"Wednesday"
          }
        ];
        classData_thurs=[
          {
            days:"Thursday"
          }
        ];
        classData_fri=[
          {
            days:"Friday"
          }
        ];
        
        for(let j=0;j<res.data.Monday.length;j++)
        {
            classData_mon.push(res.data.Monday[j]);
            period_time_obj.push({period:res.data.Monday[j].period_time});
            
        }
        for(let j=0;j<res.data.Tuesday.length;j++)
        {
            classData_tue.push(res.data.Tuesday[j]);
            
        }
        for(let j=0;j<res.data.Wednesday.length;j++)
        {
            classData_wed.push(res.data.Wednesday[j]);
            
        }
        for(let j=0;j<res.data.Thursday.length;j++)
        {
            classData_thurs.push(res.data.Thursday[j]);
            
        }
        for(let j=0;j<res.data.Friday.length;j++)
        {
            classData_fri.push(res.data.Friday[j]);
            
        }


        console.log(classData_mon,period_time_obj,classData_tue);
        setClasswise_Data_Mon(classData_mon);
        setClasswise_Data_Tue(classData_tue);
        setClasswise_Data_Wed(classData_wed);
        setClasswise_Data_Thurs(classData_thurs);
        setClasswise_Data_Fri(classData_fri);
        setPeriod_time(period_time_obj);
      }).catch((err)=>{
        console.log(err)
      })
    },[])


    return (
      <div className="section">

        <div className='student-opt'>
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
            <option>CS</option>
            <option>IT</option>
            <option>ECE</option>
          </select>

          <select className='select-opt'>
            <option disabled selected>Select Section</option>
            <option>S1</option>
          </select>
        </div>

        <button className='view-student-timetable'>View TimeTable</button>



        <div className='grid-container'>
        <div className='period_days'>
         {
            period_time.map((val)=>{
                return(
                  <div className='period_time'>
                  <Period period={val.period}/>
                  </div>
                )
            })
         }   
         </div> 
        <div className='period_days'>
         {
            classwise_Data_Mon.map((val)=>{
                return(
                  <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days}/>         

                )
            })
         }   
         </div> 
         <div className='period_days'>    
          {
            classwise_Data_Tue.map((val)=>{
                return(
                  <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days}/>         
                )
            })
         }  
         </div>
         <div className='period_days'>    
          {
            classwise_Data_Wed.map((val)=>{
                return(
                  <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days}/>         

                )
            })
         }  
         </div>   
         <div className='period_days'>    
          {
            classwise_Data_Thurs.map((val)=>{
                return(
                  <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days}/>         

                )
            })
         }  
         </div>   
         <div className='period_days'>    
          {
            classwise_Data_Fri.map((val)=>{
                return(
                  <Period subject={val.subject_name} faculty={val.faculty_name} type={val.type} days={val.days}/>         

                )
            })
         }  
         </div>         
        </div>
        <Makearrangemettable/>
      </div>
    );
  
}

export default Student