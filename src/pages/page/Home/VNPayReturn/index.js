import React , {useEffect, useState} from 'react'
import qs from "qs";
import { useLocation, useNavigate, } from 'react-router-dom';
import PaymentApi from "../../../../apis/paymentApi";
import Robo from "../../../../assets/star/robo.png";

function VNPayReturn() {
    const search = useLocation().search.substring(1);
    const { vnp_Amount, vnp_PayDate,vnp_OrderInfo, vnp_ResponseCode,vnp_TransactionNo } = qs.parse(search)
    console.log(qs.parse(search))
    const [success, setSuccess] = useState(false)
    const history = useNavigate()
    useEffect(() => {
      (async()=>{
          if(vnp_ResponseCode == "00"){
              setSuccess(true)
            try {
              let {payment} = await PaymentApi.addPaymentInfo({
                amount: vnp_Amount,
                payDate: vnp_PayDate,
                orderInfo : vnp_OrderInfo,
                transactionNo : vnp_TransactionNo
            })
            } catch (error) {
              setSuccess(false)
            }
          }
      })()
    }, [])
    const handleNextStep = async ()=>{
        history('/')
      }
  return (
    <div>
        <div className="thanks relative h-full w-full flex  items-center object-cover">
            <div className="content w-1/2 flex justify-center items-center flex-col">
            <h1 className={`text-[50px] font-bold text-white  mb-10 ${!success ? "text-red-600" : "" }`}>{success ? "Thanks you" : "Fail to buy stars"}</h1>
             <button onClick={()=>{handleNextStep()}} className='bg-primary mt-5 py-2 px-3 font-bold text-xl text-white mx-auto block'>Back</button>
            </div>
            <img src={Robo} alt="robo" className='h-1/2 w-1/2 opacity-80'/>
        </div>
   </div>
  )
}

export default VNPayReturn