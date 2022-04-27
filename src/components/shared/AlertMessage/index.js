import React from 'react'

function AlertMessage(props) {
    const {message, color, show } = props    
  return (
    <div className={`${show ? "block" : "hidden"} absolute top-0 left-1/2 -translate-x-1/2 h-10 text-white font-bold px-4 py-3`} style={{background: color}}>{message}</div>
  )
}

export default AlertMessage