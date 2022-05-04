import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from 'antd';
import BattleApi from "../../../../apis/battleApi";
import useStore from "../../../../store/useStore";
import "./style.scss";


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
    render: (name) => <span className="limit-1">{name}</span>,
  },
  {
      title: 'Number Args',
      dataIndex: 'numberArgs',
      width: '20%',
    },
    {
      title: 'Hint',
      dataIndex: 'hint',
      width: '20%',
      render: (hint) => <span className="limit-1">{hint}</span>,
    },
    {
      title: 'Descriptions',
      dataIndex: 'descriptions',
      width: '20%',
      render: (desciptions) => <span className="limit-1">{desciptions}</span>,
    },
  {
      title: 'Difficult',
      dataIndex: 'difficult',
      width: '20%',
      render: (diffcult) => <span className="limit-1">{diffcult.name}</span>,
    },
  {
      title: '',
      dataIndex: 'action1',
      render: (item,record ) => <Link className="text-blue-500 underline" to={`/manager-chanllenge/detail/${record._id}`}>Detail</Link>,
    },
    {
      title: '',
      dataIndex: 'action2',
      render: (item,record ) => <Link className="text-blue-500 underline" to={`/manager-chanllenge/update/${record._id}`}>Update</Link>,

    },
];

function ManagerChanllenge() {
  const chanllenges = useStore(state=>state.chanllenges)
  const [table, setTable] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 6,
    },
    loading: false,
  })
  useEffect(() => {
    //Data demo
    if(chanllenges && chanllenges.length > 0){
      console.log(chanllenges)
      let data = chanllenges.map((chanllenge)=>{
        return {
          ...chanllenge
        }
      })
      setTable({...table,data : data})
    }
       
  }, [chanllenges])
  const handlePanigationChange = (current)=>{
    setTable({...table,pagination:{...table.pagination,current}})
  }
  return (
    <div className="content pl-[24px] pt-[29px] pr-[100px] relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
      Chanlenge manager &gt;{" "}
        <span className="text-primary font-bold">List challenge</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Chanlenge manager</h2>
      <div className="relative">
      <Table
        className="mt-4"
        columns={columns}
        dataSource={table.data}
        pagination={{...table.pagination,onChange: handlePanigationChange}}
        loading={table.loading}
      />
      {/* Add button */}
      <Link to="/manager-chanllenge/add" className="absolute -right-28 top-0 flex flex-col h-[94px] w-24 justify-center items-center text-center bg-primary bg-opacity-20 text-primary font-bold cursor-pointer hover:text-primary p-3"><i className="fa fa-plus-square text-xl"></i><span className="text-sm">Create chanllenge</span></Link>
      </div>
      
    </div>
  )
}

export default ManagerChanllenge