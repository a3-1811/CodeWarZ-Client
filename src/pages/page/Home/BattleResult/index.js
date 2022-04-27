import React, { useContext, useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { SocketContext } from "../../../../contexts/socket";
import { Controlled as CodeMirror } from "react-codemirror2";
import BattleApi from "../../../../apis/battleApi";

require("codemirror/mode/xml/xml");
require('codemirror/theme/dracula.css');
require("codemirror/mode/javascript/javascript");

function BattleResult() {
  const socket = useContext(SocketContext);
  const [result, setResult] = useState(null)
  const history = useNavigate()

    const {winnerId} = useParams()
    useEffect(() => {
        socket.emit("GET_RESULT",winnerId)

        socket.on("SEND_RESULT",(result)=>{
          setResult(result)
          if(JSON.parse(localStorage.getItem('acc'))._id === winnerId){
            BattleApi.addNewBattle({
              chanllengeId : result.chanllengeId,
              winner: {
                id: result.winner.id,
                code : result.winner.code
              },
              loser: {
                id: result.loser.id,
                code : result.loser.code
              }
            })
          }
        })
      return () => {
        socket.off("SEND_RESULT")
      }
    }, [socket,winnerId])
    
    const handleRemoveBattle= ()=>{
      socket.emit("DETELE_BATTLE",winnerId)
      setTimeout(() => {
        history('/')
      }, 1000);
    }
    
  return (
    <div>{
      result ? (
        <div className="flex justify-center flex-col items-center p-10">
          <h1 className='mb-5 font-bold text-center text-5xl text-primary'>{result.winner.fullName} WIN !</h1>
          <div className="content flex justify-center gap-x-10 w-full">
          <div className="winner w-1/3">
          <h2 className='text-white font-bold text-lg mb-3'>{result.winner.fullName} code :</h2>
          <CodeMirror
            className="text-sm flex-1 h-full pointer-events-none"
            value={result.winner.code}
            options={{
              mode: "javascript",
              theme: "dracula",
              lineNumbers: true,
            }}
          />
          </div>
          <div className="loser  w-1/3">
          <h2 className='text-white font-bold text-lg mb-3'>{result.loser.fullName} code :</h2>
          <CodeMirror
            className="text-sm flex-1 h-full pointer-events-none"
            value={result.loser.code}
            options={{
              mode: "javascript",
              theme: "dracula",
              lineNumbers: true,
            }}
          />
          </div>
          </div>
          <button onClick={handleRemoveBattle} className='block bg-primary px-3 py-2 text-white font-bold mt-16'>Back home page</button>
        </div>
      ) : ""
      }</div>
  )
}

export default BattleResult