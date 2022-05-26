import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Select, Table, Input} from 'antd';
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
      width: '15%',
    },
    {
      title: 'Hint',
      dataIndex: 'hint',
      width: '15%',
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
      width: '15%',
      render: (item,record ) => <Link className="text-blue-500 underline" to={`/manager-chanllenge/detail/${record._id}`}>Detail</Link>,
    },
    {
      title: '',
      width: '15%',
      dataIndex: 'action2',
      render: (item,record ) => <Link className="text-blue-500 underline" to={`/manager-chanllenge/update/${record._id}`}>Update</Link>,

    },
];
const { Option } = Select;

function ManagerChanllenge() {
  const chanllenges = useStore(state=>state.chanllenges)
  const difficults = useStore(state=>state.difficults)
  const searchRef = useRef('')

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
      let data = chanllenges.map((chanllenge)=>{
        return {
          key: chanllenge._id,
          ...chanllenge
        }
      })
      setTable({...table,data : data})
    }
       
  }, [chanllenges])
  const handlePanigationChange = (current)=>{
    setTable({...table,pagination:{...table.pagination,current}})
  }
  const handleChangeDifficult = (value)=>{
    let data
    if(value == 'all'){
      data = chanllenges.map((chanllenge)=>{
        return {
          key: chanllenge._id,
          ...chanllenge
        }
      })
    }else{
      data = chanllenges.filter(item=>item.difficult._id === value).map((chanllenge)=>{
        return {
          key: chanllenge._id,
          ...chanllenge
        }
      })
    }
     
    setTable({...table,data : data})
  }
  const handleOnSearch = (e)=>{
    console.log(e.target.value)
    let value = e.target.value
    if(searchRef){
      clearInterval(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
     let temp = chanllenges.filter(item=>item.name.toLowerCase().includes(value.toLowerCase()) || 
     item.descriptions.toLowerCase().includes(value.toLowerCase()) || item.hint.toLowerCase().includes(value.toLowerCase())
     )

     let data = temp.map((chanllenge)=>{
      return {
        key: chanllenge._id,
        ...chanllenge
      }
    })
      setTable({...table,data : data})
      clearInterval(searchRef.current)
    }, 700);
  }
  return (
    <div className="manager-chanllenge content pl-[24px] pt-[29px] pr-[100px] relative lg:pr-[24px] max-h-screen overflow-y-scroll">
      <div className="path text-gray-600 font-bold text-lg mb-11">
      Chanlenge manager &gt;{" "}
        <span className="text-primary font-bold">List challenge</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">Chanlenge manager</h2>
      <div className="controls flex justify-between">
        <div className="flex gap-x-2">
          <div className="item flex flex-col text-sm">
            <span className="font-semibold">Độ khó</span>
            {difficults &&
            <Select
            onChange={handleChangeDifficult}
            defaultValue={"All"}
            className="w-[200px] px-2 py-3"
          >
            <Option value="all">All</Option>
            {difficults.map((diff)=><Option key={diff._id} value={diff._id}>{diff.name}</Option>)}
          </Select>
            }
          </div>
        </div>
        <div className="item flex flex-col text-sm">
          <span className="font-semibold">Từ khoá</span>
          <Input.Search
            placeholder="Nhập từ khóa"
            onChange={handleOnSearch}
            className="w-[250px]"
          />
        </div>
      </div>
      <div className="relative lg:flex lg:flex-col">
      <Table
        className="mt-4"
        columns={columns}
        dataSource={table.data}
        pagination={{...table.pagination,onChange: handlePanigationChange}}
        loading={table.loading}
      />
      {/* Add button */}
      <Link to="/manager-chanllenge/add" className="lg:relative lg:w-full lg:top-auto lg:right-auto absolute -right-28 top-0 flex flex-col h-[94px] w-24 justify-center items-center text-center bg-primary bg-opacity-20 text-primary font-bold cursor-pointer hover:text-primary p-3"><i className="fa fa-plus-square text-xl"></i><span className="text-sm">Create chanllenge</span></Link>
      </div>
      
    </div>
  )
}

export default ManagerChanllenge