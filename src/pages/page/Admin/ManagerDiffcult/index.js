import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Select, Table, Input} from 'antd';
import BattleApi from "../../../../apis/battleApi";
import useStore from "../../../../store/useStore";
import "./style.scss";
import AddModal from "./AddDifficult";
import UpdateModal from "./UpdateDifficult";

function ManagerDifficult() {
  const chanllenges = useStore(state=>state.chanllenges)
  const difficults = useStore(state=>state.difficults)
  const searchRef = useRef('')
  //Data
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '50%',
      render: (name) => <span className="limit-1">{name}</span>,
    },
      {
        title: '',
        width: '15%',
        dataIndex: 'action2',
        render: (item,record ) => <span onClick={()=>{handleUpdate(record._id)}} className="text-blue-500 underline cursor-pointer">Update</span>,
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
  const [updateModal, setUpdateModal] = useState({
    show : false,
    difficult : null
  })
  const [addModal, setAddModal] = useState({
    show : false,
  })
  useEffect(() => {
    //Data demo
    if(difficults && difficults.length > 0){
      let data = difficults.map((difficult,index)=>{
        return {
          stt: index,
          key: difficult._id,
          ...difficult
        }
      })
      setTable({...table,data : data})
    }
       
  }, [difficults])
  const handlePanigationChange = (current)=>{
    setTable({...table,pagination:{...table.pagination,current}})
  }
  const handleOnSearch = (e)=>{
    let value = e.target.value
    if(searchRef){
      clearInterval(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
     let temp = difficults.filter(item=>item.name.toLowerCase().includes(value.toLowerCase()))

     let data = temp.map((difficult,index)=>{
      return {
        ...difficult,
        key: difficult._id,
        stt: index
      }
    })
      setTable({...table,data : data})
      clearInterval(searchRef.current)
    }, 700);
  }
  //handle update modal
  const handleUpdate = (id)=>{
    let index = difficults.findIndex(item => item._id === id)
   if(index!=-1){
    setUpdateModal({
      ...updateModal,
      show: true,
      difficult: difficults[index]
    })
   }
  }
  const handleStatus= (show)=>{
    setUpdateModal({
      ...updateModal,
      show
    })
  }
  //Handle Add difficult
  const handleAddDiffcicult = ()=>{
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
  return (
    <div className="manager-difficult content pl-[24px] pt-[29px] pr-[100px] relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
      Difficult manager &gt;{" "}
        <span className="text-primary font-bold">List difficults</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Difficult manager</h2>
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
      <div onClick={handleAddDiffcicult} to="/manager-difficult/add" className="absolute -right-28 top-0 flex flex-col h-[94px] w-24 justify-center items-center text-center bg-primary bg-opacity-20 text-primary font-bold cursor-pointer hover:text-primary p-3"><i className="fa fa-plus-square text-xl"></i><span className="text-sm">Create difficult</span></div>
      </div>
      <UpdateModal show={updateModal.show} difficult={updateModal.difficult} handleStatus={handleStatus}/>
      <AddModal show={addModal.show} handleStatus={handleStatusAdd}/>
    </div>
  )
}

export default ManagerDifficult