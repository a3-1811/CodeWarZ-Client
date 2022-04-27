import React, { useContext, useEffect, useState } from 'react'
import FindingAlert from "./FindingAlert";
import { SocketContext } from "../../../../contexts/socket";
import useStore from "../../../../store/useStore";
import { useNavigate } from 'react-router-dom';

function Battle() {
  const socket = useContext(SocketContext);
  const user = useStore(state => state.user)
  const history = useNavigate()
  const [isFinding, setIsFinding] = useState(false)
  const [online, setOnline] = useState({
    peoples: 0,
    ingame: 0
  })
  const handleFindBattle = (status = true)=>{
    if(!status){
      socket.emit('CANCEL_BATTLE_REQUEST',)
    }else{
      socket.emit('SEND_BATTLE_REQUEST',{id : user._id, fullName: user.fullName})
    }
    setIsFinding(status)
  }

    useEffect(() => {
      // emit USER_ONLINE event
      socket.emit("ADD_USER_ONLINE", {
        id: user._id,
        fullName: user.fullName,
      });
      // List user online
      socket.emit("GET_LIST_ONLINE")

      socket.on("GET_USERS", (usersOnline) => {
        //List player in game
      socket.emit("GET_LIST_BATTLES")
      socket.on("GET_BATTLES", (battles) => {
        setOnline({...online,ingame: battles.length * 2,peoples: usersOnline.length})
      });
      });

      // Directive to battle
      socket.on("MOVE_INTO_BATTLE",(roomId)=>{
        history('/fight/'+roomId)
      })

    return () => {
      socket.off("GET_USERS")
      socket.off("GET_BATTLES")
      socket.off("MOVE_INTO_BATTLE")
    }
  }, [socket,user])

  return (
    <div>
      <h2 className='text-white text-center font-semibold text-3xl mb-5'>Battle</h2>
      <div className="content relative">
        <div className="info flex justify-around items-center gap-x-10 text-white mb-10">
          <div className="peoples text-lg flex justify-center items-center flex-col">
             <i className="fa fa-users mb-2 text-green  text-xl"></i> {online.peoples} People online
          </div>
          <div className="timeWait text-lg flex justify-center items-center flex-col">
          <i className="fa fa-mask mb-2 text-red-600 text-xl"></i> {online.ingame} People ingame
          </div>
        </div>
        <button onClick={()=>{handleFindBattle()}} className='bg-primary py-2 px-3 font-bold text-xl text-white mx-auto block'>Find battle</button>
      </div>
      {isFinding ? <FindingAlert handleFindBattle={handleFindBattle}/> : ""}
    </div>
  )
}

export default Battle