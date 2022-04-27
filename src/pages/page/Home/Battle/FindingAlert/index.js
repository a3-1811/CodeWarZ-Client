import React from 'react'
import Ninja from "../../../../../assets/star/ninja.gif";

function FindingAlert(props) {
    const { handleFindBattle } = props
  return (
    <div className='absolute flex justify-center items-center flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-9999 p-5 bg-red-500'>
        <h3 className='font-bold text-white mb-5'>Searching for battle</h3>
        <div className="anima h-52 w-52 bg-white mb-5">
            <img src={Ninja} className="h-full w-full" alt="ninja waitting battle" />
        </div>
        <button className='bg-primary font-bold text-white rounded-xl px-3 py-2' onClick={()=>{handleFindBattle(false)}}>Cancel</button>
    </div>
  )
}

export default FindingAlert