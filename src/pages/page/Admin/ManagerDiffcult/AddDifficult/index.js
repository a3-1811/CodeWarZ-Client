import React, { useState } from "react";
import DifficultApi from "../../../../../apis/difficultApi";
import useStore from "../../../../../store/useStore";
function AddModal(props) {
  const addDifficults = useStore(state=> state.addDifficults)
  const { show, handleStatus } = props;
  const [error, setError] = useState("")
  const [name, setName] = useState("")

  const handleCreate = ()=>{
    if(name.trim().length < 3){
      setError("Please enter more than 3 characters")
      return;
    }else{
      DifficultApi.addDifficult({name})
      .then(data=>{
        addDifficults(data.difficult)
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
        <h2 className="text-3xl text-primary font-bold mb-5">Create new difficult</h2>
        <label className="flex flex-col mb-5">
        <label >Name of diffcult:</label>
        <input type="text" value={name} onChange={handleNameChange}/>
        <p className="text-red-500">{error}</p>
        </label>
       <div className="flex gap-x-5 justify-center">
       <button onClick={handleCreate} className="px-4 py-2 rounded-lg text-white bg-green">Create</button>
       <button onClick={()=>{handleStatus(false)}} className="px-4 py-2 rounded-lg text-white bg-red-500">Cancel</button>
       </div>
    </div>
  );
}

export default AddModal;
