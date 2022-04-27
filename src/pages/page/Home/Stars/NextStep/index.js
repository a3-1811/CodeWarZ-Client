import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GiftCard from "../../../../../assets/star/gift-star.png";
import PaymentApi from "../../../../../apis/paymentApi";
import useStore from "../../../../../store/useStore";

function NextStep() {
  const starsFlag = [100,500,1000,2000,5000,10000]
  const [amountSelected, setAmountSelected] = useState(100)
  let history = useNavigate()
  const user = useStore(state=>state.user)

  const handleNextStep = async ()=>{
    try {
      let url = await PaymentApi.createPaymentUrl({
        amount: amountSelected,
        orderDescription :`${user.fullName} buy stars in system. Amount :${amountSelected}.`
      })
      console.log(url)
    } catch (error) {
      console.log({error})
      
    }
  }
  return (
    <div className='w-full'>
      <h2 className='text-white text-center font-semibold text-3xl mb-5'>Select amount</h2>
      <div className="content flex justify-center items-center flex-wrap gap-5 w-1/2 mx-auto">
        {starsFlag.map((amount)=>{
          return (
            <div key={amount} onClick={()=>{setAmountSelected(amount)}} className={`${amount === amountSelected ? "border-2 border-primary" : ""} gift h-40 w-40 relative bg-gray-600 cursor-pointer`}>
              <img src={GiftCard} alt="gift" className='opacity-50'/>
              <div className="amount absolute bottom-0 left-0 top-0 right-0 flex justify-center items-center flex-col font-bold text-white text-xl">
                <span >
                {amount} Stars
                </span>
                <span >
                {amount/10 < 1000 ? amount/10+".000" : amount/10000 +"M" } VND
                </span>
              </div>
        </div>
          )
        })}
      </div>
      <button onClick={()=>{handleNextStep()}} className='bg-primary mt-5 py-2 px-3 font-bold text-xl text-white mx-auto block'>Next Step</button>
    </div>
  )
}

export default NextStep