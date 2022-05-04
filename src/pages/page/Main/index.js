import React, { useContext, useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import UserApi from "../../../apis/userApi";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "../../../components/shared/ConfirmBox";
import Notice from "../../../components/shared/Notice";
import useStore from "../../../store/useStore";
import { SocketContext } from "../../../contexts/socket";

function Main() {
const history=  useNavigate()
const user = useStore(state => state.user)
const socket = useContext(SocketContext);
// Zutands Store
const updateChapter = useStore((state) => state.updateChapter);
const chapters = useStore((state) => state.chapters);
// Primary States
const [confirmBox, setConfirmBox] = useState({
  content: "", 
  status: false
})
//Notice component control state
const [dialog, setDialog] = useState({
  message: "",
  isOpen: false,
  isSuccess: false,
  index: -1
});

useEffect(() => {
  // emit USER_ONLINE event
  socket.emit("ADD_USER_ONLINE", {
    id: user._id,
    fullName: user.fullName,
  });
}, [socket])


  const handleOpenChapter=(chapterIndex)=>{
    // Set notice for change point stars to unlock new chapter
    setConfirmBox({
      content: "Do you want to unlock this chapter!",
      status:true,
      index : chapterIndex
    })
  }
  //Chuyen vao trang chanllenges cua chapter
  const handleChooseChapter= (chapterIndex,unlocked)=>{
    if(!unlocked)
      return
    history("/chapter/"+chapterIndex)
  }
  // Confirm box handlers
  const handlePopupConfirm = (status)=>{
    setConfirmBox({...confirmBox,status: status})
  }
  const handleResult= (accept,index)=>{
    setConfirmBox({...confirmBox,status: false})
    if(accept){
      UserApi.unlockChapter(index)
      .then((res)=>{
        let newChapter = {...res.newChapter}
        updateChapter(index,newChapter)
        setDialog({
          ...dialog,
          message: "Unlocked new chapter success!",
          isSuccess: true,
          isOpen: true,
        });
      })
      .catch((err)=>{
        setDialog({
          ...dialog,
          message: err.response.data.error,
          isSuccess: false,
          isOpen: true,
        });
      })
    }
  }
  // Notice handlers
  const handleNotice = (state) => setDialog({ ...dialog, isOpen: state });

  return (
    <>
        <h2 className="title text-center font-bold text-white text-2xl alo">Chapters list</h2>
    <div className="chanllenges md:overflow-scroll md:h-full md:flex-wrap gap-x-5 flex justify-center items-center w-full">
      {chapters && chapters.map((chapter, index)=>{
        return (<div className={`chanllenge__item flex-1 md:basis-1/3 ${chapter.unlocked ? "" : "lock"}`} key={index} onClick={()=>{

          handleChooseChapter(index,chapter.unlocked)
        }}>
        <h2 className="title">Chapter {index+1}</h2>
        <img
          src={`images/chapters/${index}.png`}
          alt="dasd"
        />
        {!chapter.unlocked ? (<div className="lockArea">
          <LockClosedIcon
            className="text-white h-1/4 w-1/4 cursor-pointer"
            onClick={() => {
              handleOpenChapter(index);
            }}
          />
        </div>) : ""}
      </div>)
      })}
      <svg className="hidden">
        <filter id="wavy">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.009"
            numOctaves="5"
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              dur={60}
              values="0.02;0.005;0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="10"></feDisplacementMap>
        </filter>
      </svg>
      <ConfirmBox
        status={confirmBox.status}
        content={confirmBox.content}
        handlePopupConfirm={handlePopupConfirm}
        handleResult={handleResult}
        index={confirmBox.index}
      />
      <Notice
            status={dialog.isOpen}
            message={dialog.message}
            handleNotice={handleNotice}
            typeNotice={dialog.isSuccess}
          />
    </div>
    </>
  );
}

export default Main;
