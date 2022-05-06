import React, { useContext, useEffect, useRef, useState } from "react";
import {  Table, Input } from 'antd';
import NotificationApi from "../../../../apis/notificationApi";
import useStore from "../../../../store/useStore";
import "./style.scss";
import AddModal from "./AddNotification";

function ManagerNotification() {
  const [notifications, setNotifications] = useState(null)
  const searchRef = useRef('')
  //Data
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '20%',
      render: (title) => <span className="limit-1">{title}</span>,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      width: '50%',
      render: (content) => <span className="limit-1">{content}</span>,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      width: '50%',
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
      let {notifications} = await NotificationApi.getNotifications()
      setNotifications(notifications)
      let data = notifications.map((notification,index)=>{
        return {
          key: notification._id,
          ...notification,
          createdAt : (new Date(notification.createdAt)).toLocaleString("vi-VN", {
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
     let temp = notifications.filter(item=>item.title.toLowerCase().includes(value.toLowerCase())
     || item.content.toLowerCase().includes(value.toLowerCase())
     )

     let data = temp.map((notification,index)=>{
      return {
        key: notification._id,
        ...notification,
        createdAt : (new Date(notification.createdAt)).toLocaleString("vi-VN", {
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
    let {notifications} = await NotificationApi.getNotifications()
      setNotifications(notifications)
      let data = notifications.map((notification,index)=>{
        return {
          key: notification._id,
          ...notification,
          createdAt : (new Date(notification.createdAt)).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          })
        }
      })
      setTable({...table,data : data})
  }
  return (
    <div className="manager-difficult content pl-[24px] pt-[29px] pr-[100px] relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
      Notifications manager &gt;{" "}
        <span className="text-primary font-bold">List Notifications</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Notifications manager</h2>
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
      <div onClick={handleAddUpdate} to="/manager-difficult/add" className="absolute -right-28 top-0 flex flex-col h-[94px] w-24 justify-center items-center text-center bg-primary bg-opacity-20 text-primary font-bold cursor-pointer hover:text-primary p-3"><i className="fa fa-plus-square text-xl"></i><span className="text-sm">Create Notification</span></div>
      </div>
      <AddModal show={addModal.show} handleStatus={handleStatusAdd} handleReset={handleReset}/>
    </div>
  )
}

export default ManagerNotification


