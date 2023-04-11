import React, { useEffect } from 'react';
import "../styles/SelectSection.css";
import { createElement } from 'react';

const SelectSection = (props) => {



  return (
    <div className='selectSection'>
      <select className='select-opt'>
        <option>{props.section[0]}</option>
        <option>{props.section[1]}</option>
        <option>{props.section[2]}</option>
        <option>{props.section[3]}</option>

      </select>
    </div>
  )
}

export default SelectSection