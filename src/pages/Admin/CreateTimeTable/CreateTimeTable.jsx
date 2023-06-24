import React, { useState } from 'react';
import { Tab, Tabs } from "@mui/material";
import CreateLec from './CreateLec';
import CreateLab from './CreateLab';

const CreateTimeTable = () => {
    const createArr=["Lecture","Lab"]
    const [value,setValue]=useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(event,newValue);
      };
  return (
    <div>
        <Tabs value={value} onChange={handleChange} sx={{width:"100vw"}} centered>
        {createArr?.map((type, id) => {
          return <Tab label={type} key={id} className="shadow" sx={{width:"50%"}}/>;
        })}
      </Tabs>
      <div className={value==0?"":"hide"}> 
        <CreateLec/>
      </div>
      <div className={value==1?"":"hide"}>
         <CreateLab/>
      </div>
    </div>
  )
}

export default CreateTimeTable