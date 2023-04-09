import React,{useState}from 'react';
import SelectSection from '../components/SelectSection';

const CreateTimeTable = () => {

  let sectionObj = [
    {},{}
  ]

  const [sectionNo,setsectionNo]=useState(sectionObj);

  const addSec=()=>{
    sectionObj.push({})
    console.log(sectionObj)
    setsectionNo(sectionObj)
    console.log(sectionNo)
  }



  return (
    <div className='createTable'>
      <div className='selectSection'>

        {
          sectionNo.map(() => {
            return(<SelectSection />)
            
          })
        }
      </div>
      <button onClick={addSec}>add</button>
    </div>
  )
}

export default CreateTimeTable