import React from 'react';
import "../styles/Period.css";

const Period = (props) => {
  return (
    <div className='periods'>
      <p>{props.subject}</p>
      <p>{props.faculty}</p>
      <p>{props.type}</p>
    </div>
  )
}

export default Period