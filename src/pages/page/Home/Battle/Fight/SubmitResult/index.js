import React from 'react'

function SubmitResult(props) {

    const {submit} = props
    const {  result,timeExcute } = submit
    const renderResult = (result)=>{
        // render message complier
        let mess = result.map((testcase,index) => {
            return ( 
              <div className='text-sm' key={`${index}-${index*index}`}>
                {testcase.message
                  .trim()
                  .split("\n")
                  .map((item, index) => (
                    <p className={item.includes('Success') ? `text-green font-bold` : ""} key={`${item}-${index}`}>{item}</p>
                  ))}
              </div>
            );
          });
          let temp = [<div className='basis-1/2 flex flex-wrap gap-1' key="resultComplier">{mess}</div>,<div  className='basis-1/2 flex justify-center font-bold' key="timeStampExcute">Time execute: {timeExcute} ms</div>]
          let template = [<div key="tempalteResult" className="flex">{temp}</div>];
          return template
    }
    
  return (
    <div className="basis-2/3 flex-shrink h-screen flex flex-col relative bg-white border-l-4 p-5">
        <h2 className="font-bold text-4xl my-3 text text-green text-center">Passed</h2>
        <div className="complier">{renderResult(result)}</div>
    </div>
  )
}

export default SubmitResult