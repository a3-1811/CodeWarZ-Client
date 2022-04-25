import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import ChanllengeApi from "../../../../../apis/chanllengeApi";
import useStore from "../../../../../store/useStore";

function SubmitResult(props) {
    const chapters = useStore(state => state.chapters)
    console.log(chapters)

    const {submit} = props
    const { show, result,timeExcute, chanllengeId } = submit
    const [comment, setcomment] = useState("")
    const history= useNavigate()
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
    const handleSubmitComment = (e)=>{
        e.preventDefault()
        let index = chapters.findIndex(chapter=> {
            return chapter.chapter.findIndex(chanllenge => chanllenge.chanllenge._id === chanllengeId) !== -1
        })
        if(comment.trim().length === 0){
            // Find index of chapter
            history('/chapter/'+index)
        }else{
            ChanllengeApi.commentChallenge(chanllengeId,{comment})
            .then(res=>{
                history('/chapter/'+index)
            }).
            catch(err=>console.log)
        }
    }
    const handleChangeComment = (e) =>{
        setcomment(e.target.value)
    }
  return (
    <div className="basis-2/3 flex-shrink h-screen flex flex-col relative bg-white border-l-4 p-5">
        <h2 className="font-bold text-4xl my-3 text text-green text-center">Passed</h2>
        <div className="complier">{renderResult(result)}</div>
        <div className="leaveComment">
        <h2 className="font-bold text-4xl my-3 text text-primary text-center">Leave with your comment</h2>
        <form onSubmit={handleSubmitComment}>
            <textarea name="comment" onChange={handleChangeComment} value={comment} className=' w-full resize-none h-30 mb-4'></textarea>
            <button type="submit" className='bg-primary px-3 py-2 text-white font-bold rounded-sm block ml-auto'>Comment</button>
        </form>
        </div>
    </div>
  )
}

export default SubmitResult