import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import {  Table, Input } from 'antd';
import UserApi from "../../../../apis/userApi";
import "./style.scss";
import AddModal from "./AddNewAdmin";

function ManagerUsers() {
  const [users, setUsers] = useState(null)
  const searchRef = useRef('')
  //Data
  const columns = [
    {
      title: 'FullName',
      dataIndex: 'fullName',
      width: '20%',
      render: (title) => <span className="limit-1">{title}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '30%',
      render: (content) => <span className="limit-1">{content}</span>,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      width: '10%',
      render: (avatar) => <span className="block h-10 w-10 object-cover rounded-full"><img className="w-full- h-full rounded-full" src={avatar} alt="avatar" /></span>,
    },
    {
      title: 'Role',
      dataIndex: 'isAdmin',
      width: '10%',
      render: (isAdmin) => <span>{isAdmin ? "Admin" : "User"}</span>,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      width: '20%',
    },
    {
      title: 'Time exist',
      dataIndex: 'timeExist',
      width: '10%',
    },
  ];

  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 6,
    },
    loading: false,
  })
  const [addModal, setAddModal] = useState({
    show : false,
  })
  useEffect(() => {
    (async()=>{
      let {users} = await UserApi.getListUser()
      setUsers(users)
      let data = users.map((user,index)=>{
        var given = moment(user.createdAt, "YYYY-MM-DD");
        var current = moment().startOf('day');

        let dayExist = moment.duration(current.diff(given)).asDays();
        return {
          key: user._id,
          ...user,
          timeExist : dayExist + "days",
          createdAt: (new Date(user.createdAt)).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          })
        }
      })
      setTable({...table,data : data})
    })()
  }, [])
  const handlePanigationChange = (current)=>{
    setTable({...table,pagination:{...table.pagination,current}})
  }
  const handleOnSearch = (e)=>{
    let value = e.target.value
    if(searchRef){
      clearInterval(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
     let temp = users.filter(item=>item.fullName.toLowerCase().includes(value.toLowerCase())
     || item.email.toLowerCase().includes(value.toLowerCase())
     )

     let data = temp.map((user,index)=>{
      var given = moment(user.createdAt, "YYYY-MM-DD");
      var current = moment().startOf('day');

      let dayExist = moment.duration(current.diff(given)).asDays();
      return {
        key: user._id,
        ...user,
        timeExist : dayExist + "days",
        createdAt: (new Date(user.createdAt)).toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })
      }
    })
    setTable({...table,data : data})
      clearInterval(searchRef.current)
    }, 700);
  }
  //Handle Add notificaiton
  const handleAddUpdate = ()=>{
    setAddModal({
      ...addModal,
      show: true,
    })
  }
  const handleStatusAdd = (show)=>{
    setAddModal({
      ...addModal,
      show
    })
  }
  const handleReset = async()=>{
    let {users} = await UserApi.getListUser()
      setUsers(users)
      let data = users.map((user,index)=>{
        var given = moment(user.createdAt, "YYYY-MM-DD");
        var current = moment().startOf('day');

        let dayExist = moment.duration(current.diff(given)).asDays();
        return {
          key: user._id,
          ...user,
          timeExist : dayExist + "days"
        }
      })
      setTable({...table,data : data})
  }
  return (
    <div className="manager-difficult content pl-[24px] pt-[29px] pr-[100px] relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
      Users manager &gt;{" "}
        <span className="text-primary font-bold">List Users</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Users manager</h2>
      <div className="controls flex justify-end lg:justify-center">
        <div className="item flex flex-col text-sm">
          <span className="font-semibold">Keyword</span>
          <Input.Search
            placeholder="Type something here!"
            onChange={handleOnSearch}
            className="w-[250px]"
          />
        </div>
      </div>
      <div className="relative">
      <Table
        className="mt-4"
        columns={columns}
        dataSource={table.data}
        pagination={{...table.pagination,onChange: handlePanigationChange}}
        loading={table.loading}
      />
      {/* Add button */}
      <div onClick={handleAddUpdate} className="absolute -right-28 top-0 flex flex-col h-[94px] w-24 justify-center items-center text-center bg-primary bg-opacity-20 text-primary font-bold cursor-pointer hover:text-primary p-3"><i className="fa fa-plus-square text-xl"></i><span className="text-sm">Create Admin</span></div>
      </div>
      <AddModal show={addModal.show} handleStatus={handleStatusAdd} handleReset={handleReset}/>
    </div>
  )
}

export default ManagerUsers


