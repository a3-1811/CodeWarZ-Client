import React, { useEffect, useState } from "react";
import UserApi from "../../../../apis/userApi";
import "./style.scss";
function Rank() {
  const [users, setUsers] = useState(null)
  const [option, setOption] = useState([
    {
      name: "Stars",
      key : "stars",
      active: false
    },
    {
      name: "Error",
      key : "timeError",
      active: false
    },
    {
      name: "Complier",
      key : "timeComplier",
      active: true
    },
    {
      name: "Chanllenge",
      key : "chanllenge",
      active: false
    },
    {
      name: "Time winner",
      key: "timeWinner",
      active:false
    },
    {
      name: "Time Battle",
      key: "timeBattle",
      active:false
    }
  ])
  const [keyActive, setKeyActive] = useState("timeComplier")
  useEffect(() => {
    (async()=>{
      try {
        let {ranking} = await UserApi.ranking()
        //Sort by Complier
        let sortResult = ranking.sort((user,nextUser)=>{
          return nextUser.stats[keyActive] - user.stats[keyActive] 
        })
        setUsers(sortResult)
      } catch (error) {
        console.log({error})
      }
    })()
  }, [])
  
  const handleChangeOption = (key)=>{
    let index = option.findIndex(item=> item.key === key)
    if(index !== -1){
      let temp = [...option].map(item=>{
        item.active = false
        return item
      })
      temp[index].active = true
      setOption([...temp])
      setKeyActive(key)

      //Sort again
      //Sort by key
      let sortResult = users.sort((user,nextUser)=>{
        return nextUser.stats[key] - user.stats[key] 
      })
      setUsers(sortResult)
    }
  }
  return (
    <div>
      <h2 className="text-white text-center font-semibold text-3xl mb-3">
        Leaderboard
      </h2>
      <div className="content flex justify-center items-center flex-col">
        <div className="option flex justify-center items-center gap-x-10">
          {option.map((item)=>{
            return (<span key={item.name} onClick={()=>{handleChangeOption(item.key)}} className={`text-white bg-gray-500 bg-opacity-30 px-2 py-1 rounded-2xl cursor-pointer  hover:bg-white hover:bg-opacity-20 ${item.key === keyActive ? "tabActive" : ""}`}>
            {item.name}
          </span>)
          })}
        </div>
        {users ? <>
          <div className="leader relative mb-5 mt-5">
          <div className="leader-1 flex justify-center items-center flex-col relative z-10">
            <span className="font-bold text-white">1</span>
            <i className="mb-1 text-yellow-200 fa fa-crown"></i>
            <div className="imageBox mb-3 h-24 w-24 rounded-full border-green border-2 shadow-green shadow-circle">
              <img
                className="rounded-full h-full w-full"
                src={users[0].info.avatar}
                alt={users[0].info.fullName}
              />
            </div>
            <div className="info flex justify-center items-center flex-col">
              <span className="text-xs text-white font-bold">{users[0].info.fullName}</span>
              <span className="text-xl text-green font-bold">{users[0].stats[keyActive]}</span>
            </div>
          </div>
          <div className="leader-2 absolute -bottom-5 -left-full -translate-x-1/4 flex justify-center items-center flex-col">
            <span className="font-bold text-white">2</span>
            <i className="mb-1 text-green fa fa-sort-up"></i>
            <div className="imageBox mb-3 h-20 w-20 rounded-full border-green border-2 shadow-green shadow-circle">
              <img
                className="rounded-full h-full w-full"
                src={users[1].info.avatar}
                alt={users[1].info.fullName}
              />
            </div>
            <div className="info flex justify-center items-center flex-col">
              <span className="text-xs text-white font-bold">{users[1].info.fullName}</span>
              <span className="text-xl text-green font-bold">{users[1].stats[keyActive]}</span>
            </div>
          </div>
          <div className="leader-3 absolute -bottom-5 -right-full translate-x-1/4 flex justify-center items-center flex-col">
            <span className="font-bold text-white">3</span>
            <i className="mb-1 text-white fa fa-sort-down"></i>
            <div className="imageBox mb-3 h-20 w-20 rounded-full border-green border-2 shadow-green shadow-circle">
              <img
                className="rounded-full h-full w-full"
                src={users[2].info.avatar}
                alt={users[2].info.fullName}
              />
            </div>
            <div className="info flex justify-center items-center flex-col">
              <span className="text-xs text-white font-bold">{users[2].info.fullName}</span>
              <span className="text-xl text-green font-bold">{users[2].stats[keyActive]}</span>
            </div>
          </div>
        </div>
        <div className="other mt-5 w-full flex justify-center  gap-x-10  flex-wrap gap-y-5 overflow-y-scroll h-1/2 sm:h-80">
        <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3 ">
            <div className="rank flex justify-center items-center flex-col">
              <span className="text-white font-bold">1</span>
              <i className="mb-1 text-green fa fa-sort-up"></i>
            </div>
            <div className="info flex pr-5 justify-between pl-10 items-center relative h-10 rounded-3xl bg-gray-500 bg-opacity-50">
              <div className="imageBox mb-3 h-10 w-10 rounded-full absolute top-0 left-0">
                <img
                  className="rounded-full h-full w-full"
                  src="https://media.baamboozle.com/uploads/images/551156/1636687300_25508.jpeg"
                  alt=""
                />
              </div>
              <span className="mx-5 text-white font-bold">Abe333</span>
              <span className="text-green font-bold">9020</span>
            </div>
          </div>

        </div>
        </> : ""}
      </div>
    </div>
  );
}

export default Rank;
