import React from 'react';
import "../styles/Period.css";

const Period = (props) => {
  return (
    <div className='periods'>
      
      <p className='timetable_days'>{props.days}</p>
      <p className='timetable_subject'>{props.subject}</p>
      <p className='timetable_period'>{props.period}</p>
      <p className='timetable_faculty'>{props.faculty}</p>
      <p className='timetable_type'>{props.type}</p>
    </div>
  )
}

export default Period