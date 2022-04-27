import React, { useState } from 'react'
import VNPay from "../../../../assets/star/vnpay-logo.jpg";
import { useNavigate } from 'react-router-dom';
import "./style.scss"

function Stars() {
  const [method, setMethod] = useState("vnpay")
  let history = useNavigate()
  const handleMethodChange = (method) =>{
    setMethod(method)
  }
  const handleNextStep = ()=>{
    history('/stars/'+method)
  }
  return (
    <div className='h-full'>
      <h2 className='text-white text-center font-semibold text-3xl mb-5'>Buy Stars</h2>
      <div className="content h-full ">
        <h2 className='text-white font-semibold text-2xl mb-5'>Choose a deposit method</h2>
        <div className="list-deposit flex items-center justify-center gap-x-10 lg:flex-col lg:gap-y-10 mb-10">
          <div onClick={()=>{handleMethodChange("vnpay")}} className={`deposit h-52 w-80 cursor-pointer hover:border-primary hover:shadow-circle hover:border-2 object-cover ${method === "vnpay" ?  "active" : ""}`}>
            <img src={VNPay} className="w-full h-full" alt="vnpay" />
          </div>
        </div>
        <button onClick={()=>{handleNextStep()}} className='bg-primary py-2 px-3 font-bold text-xl text-white mx-auto block'>Next Step</button>
      </div>
    </div>

  )
}

export default Stars