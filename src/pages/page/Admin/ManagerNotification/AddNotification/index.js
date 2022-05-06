import React, { useState } from "react";
import NotificationApi from "../../../../../apis/notificationApi";
function AddModal(props) {
  const { show, handleStatus,handleReset } = props;
  const [error, setError] = useState({
    title: "",
    content: ""
  })
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")


  const handleCreate = ()=>{
    let errorMessage = {...error}
    if(title.trim().length < 3){
      errorMessage= {...errorMessage,title: "Please enter more than 3 characters"}
    }
    if(content.trim().length < 10){
      errorMessage= {...errorMessage,content: "Please enter more than 10 characters"}
    }
    if(content.trim().length < 10 || title.trim().length < 3){
      setError(errorMessage)
      return;
    }

    NotificationApi.createNotification({title,content})
    .then(data=>{
      setTitle("")
      setContent("")
      setError({title:"",content:""})

      handleReset()
      handleStatus(false)
    })
    .catch((err)=>{
      console.log({err})
    })
  }
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } rounded-lg px-5 py-3 bg-white absolute max-h-[500px] w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-primary border-2`}
    >
        <h2 className="text-3xl text-primary font-bold mb-5">Create new notification</h2>
        <label className="flex flex-col mb-5">
        <label >Title of notification:</label>
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        <p className="text-red-500">{error?.title}</p>
        </label>
        <label className="flex flex-col mb-5">
        <label >Content:</label>
        <textarea rows={7} type="text" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
        <p className="text-red-500">{error?.content}</p>
        </label>
       <div className="flex gap-x-5 justify-center">
       <button onClick={handleCreate} className="px-4 py-2 rounded-lg text-white bg-green">Create</button>
       <button onClick={()=>{handleStatus(false)}} className="px-4 py-2 rounded-lg text-white bg-red-500">Cancel</button>
       </div>
    </div>
  );
}

export default AddModal;
