import React, { useEffect, useRef, useState } from "react";
import UserApi from "../../../../apis/userApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./style.scss";
import Notice from "../../../../components/shared/Notice";

import useStore from "../../../../store/useStore";


function Friends() {
  const [users, setUsers] = useState(null);
  const [result, setResult] = useState(null)
  const keywordRef = useRef("")
//Notice component control state
const [dialog, setDialog] = useState({
  message: "",
  isOpen: false,
  isSuccess: false,
});
  useEffect(() => {
    (async () => {
      try {
        let me = JSON.parse(localStorage.getItem('acc'))
        let { users } = await UserApi.getListUser();
        let usersStatus = users.map(user =>{
          let temp = {...user,selected: false}
          return {...temp}
        })
          let exceptMe = usersStatus.filter(user=> user._id !== me._id && !me.friends.includes(user._id))
          setUsers(exceptMe);
          setResult(exceptMe)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSelectedFriends = (userId)=>{
    let index = users.findIndex(user=>user._id === userId)
    let temp = [...users]
    temp[index].selected = !users[index].selected
    setUsers(temp)
  }

  const handleInviteFriends = ()=>{
    let isSelected = users.some(user=> user.selected)
    if(!isSelected){
      return;
    }else{
      let wishList = users.filter(user=> user.selected)
      let listIds = wishList.map(user =>user._id)
      UserApi.inviteFriends({friends: [...listIds]})
      .then(res=>{
        setDialog({
          message: "Invited just sent!",
          isSuccess: true,
          isOpen: true,
        });
      })
      .catch(err=>{
        setDialog({
          message: "Some thing wrong!",
          isSuccess: false,
          isOpen: true,
        });
      })
    }
  }
  
  //handleNotice
  const handleNotice = (state) => setDialog({ ...dialog, isOpen: state });

  const handleOnChange = (e)=>{
    let keyword = e.target.value

    if(keywordRef.current){
        clearInterval(keywordRef.current)
    }
    keywordRef.current = setTimeout(() => {
      let result = users.filter(user => user.fullName.toLowerCase().includes(keyword.toLowerCase())
      || user.email.toLowerCase().includes(keyword.toLowerCase())
      )
      setResult(result)
      clearInterval(keywordRef.current)
    }, 500);
  }

  return (
    <div className=" flex justify-center items-center flex-col">
      <h2 className="text-white font-bold text-2xl text-center my-3">
        Invite Friends
      </h2>
      <div className="search w-1/2 relative mb-5">
        <input
          type="text"
          placeholder="Name or email"
          className="w-full px-2 py-3 pr-10 bg-gray-300 text-gray-600"
          name="keywords"
          onChange={handleOnChange}
        />
        <i className="cursor-pointer absolute right-0 top-1/2 text-xl p-4 -translate-y-1/2 fa  text-gray-600 fa-search"></i>
      </div>
      <div className="peoples w-3/4 h-60 overflow-y-scroll mb-5 flex  gap-5">
        {result ? (
          result.map((user) => {
            return (
              <div className={`user w-16 h-20 ${user.selected ? "selected" : ""}`} key={user._id} onClick={()=>{handleSelectedFriends(user._id)}}>
                <div className="imageBox h-16 w-16 rounded-full object-cover">
                  <img className="rounded-full h-full w-full" src={user.avatar} alt={user.fullName} />
                  <i className="hidden fa fa-check"></i>
                </div>
                <span className="font-semibold limit-1 w-full text-white text-sm text-center">{user.fullName}</span>
              </div>
            );
          })
          
        ) : (
        users && users.length === 0 ? "Everyone was your friends" : <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
        )}
      </div>
      <div className="submitBox">
        <span className="text-white font-semibold text-lg rounded-2xl bg-green px-6 py-2   cursor-pointer" onClick={handleInviteFriends}>Send invitation</span>
      </div>
      <Notice
        status={dialog.isOpen}
        message={dialog.message}
        handleNotice={handleNotice}
        typeNotice={dialog.isSuccess}
      />
    </div>
  );
}

export default Friends;
