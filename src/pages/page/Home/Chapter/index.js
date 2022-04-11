import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from "react-router-dom";
import useStore from "../../../../store/useStore";
import Chanllenge from './Chanllenge';

function Chapter() {
  // Index of chapter in account
  const { id } = useParams();
  const [chapter,setChapter] = useState([])
  const chapters = useStore(state=>state.chapters)
  useEffect(()=>{
    if(chapters.length >0 )
      setChapter([...chapters[id].chapter])
  },[chapters])
  return (
    <div className='flex justify-center items-center xl:flex-wrap xl:flex-row xl:gap-1 h-4/5 w-full gap-3'>{
      chapter.length > 0 ? chapter.map((item,index)=> <Chanllenge chanllenge={item} key={index}/>) : ""
    }</div>
  )
}

export default Chapter