import React, { useEffect, useState } from "react";
import DifficultApi from "../../../../../apis/difficultApi";
import useStore from "../../../../../store/useStore";

function UpdateModal(props) {
  const updateDifficult = useStore(state=> state.updateDifficult)
  const { show, difficult, handleStatus } = props;
  const [error, setError] = useState("")
  const [name, setName] = useState()

useEffect(() => {
  if(difficult){
    setName(difficult.name)
  }
}, [difficult])


  const handleUpdate = ()=>{
    if(name.trim().length < 3){
      setError("Please enter more than 3 characters")
      return;
    }else{
      DifficultApi.updateDifficult(difficult._id,name)
      .then(data=>{
        console.log(data)
        updateDifficult(difficult._id,data.difficult)
        setName("")
        setError("")
        handleStatus(false)
      })
      .catch((err)=>{
        console.log({err})
      })
    }
  }
  const handleNameChange = (e)=>{
    setName(e.target.value)
  }
  return (
    <div
    className={`${
      show ? "block" : "hidden"
    } rounded-lg px-5 py-3 bg-white absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 border-primary border-2`}
  >
      <h2 className="text-3xl text-primary font-bold mb-5">Update difficult</h2>
      <label className="flex flex-col mb-5">
      <label >Name of diffcult:</label>
      <input type="text" value={name} onChange={handleNameChange}/>
      <p className="text-red-500">{error}</p>
      </label>
     <div className="flex gap-x-5 justify-center">
     <button onClick={handleUpdate} className="px-4 py-2 rounded-lg text-white bg-primary">Update</button>
     <button onClick={()=>{handleStatus(false)}} className="px-4 py-2 rounded-lg text-white bg-red-500">Cancel</button>
     </div>
  </div>
  );
}

export default UpdateModal;
