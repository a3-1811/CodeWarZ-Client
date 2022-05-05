import React, { useEffect, useState } from "react";
import LanguageApi from "../../../../../apis/languageApi";

import useStore from "../../../../../store/useStore";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "antd";
// Yup validateion schema

function DetailChallenge() {
  const { id } = useParams();
  const difficults = useStore((state) => state.difficults);
  const chanllenges = useStore((state) => state.chanllenges);

  const history = useNavigate();

  const [langs, setLangs] = useState(null);
  const [chanllenge, setChanllenge] = useState(null);

  useEffect(() => {
    (async () => {
      let { langs } = await LanguageApi.getListLanguages();
      setLangs(langs);
      //Find chanllenge
      let chanllenge = chanllenges.find((chanllenge) => chanllenge._id === id);
      if (!chanllenge) {
        history("/");
      }
      setChanllenge(chanllenge);
    })();
  }, []);

  return (
    <div className="w-full content pl-[24px] pt-[29px] pr-[100px] relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
        Chanlenge manager &gt;{" "}
        <span className="text-primary font-bold">Detail chanllenge</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">
      Detail chanllenge
      </h2>
      <div className="relative w-full h-[70vh]">
        {chanllenge && (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-[52px] font-semibold text-base leading-6 text-primary-gray-500'>
                Name:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
                {chanllenge.name}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-[70px] font-semibold text-base leading-6 text-primary-gray-500'>
                Difficult:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
              {chanllenge.difficult.name}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-12 font-semibold text-base leading-6 text-primary-gray-500'>
                Hint:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
              {chanllenge.hint}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-12 font-semibold text-base leading-6 text-primary-gray-500'>
                Descriptions:
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
              {chanllenge.descriptions}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-[60px] font-semibold text-base leading-6 text-primary-gray-500'>
                Languages support
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400'>
              {chanllenge.defaultCode.map((item,index)=>{
                return `${index === 1 ? ", " : ""} ${item.lang.name}`
              })}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className='flex items-center mb-4'>
              <span className='mr-[88px] font-semibold text-base leading-6 text-primary-gray-500'>
                Testcases
              </span>
              <div className='font-normal text-base leading-6 text-primary-gray-400'>
              {chanllenge.testcases.map((item,index)=>{
                return (
                  <div className="mb-2" key={index}>
                    <h3 className="font-bold">Testcase{index+1}:</h3>
                    <div className="flex flex-col">
                    <span>Input: {JSON.stringify(item.input)}</span>
                    <span>Output: {JSON.stringify(item.output)}</span>
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className=''>
              <span className='font-semibold text-base leading-6 text-primary-gray-500'>
                Number agruments
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400 mt-2'>
              {chanllenge.numberArgs}
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div className=''>
              <span className='font-semibold text-base leading-6 text-primary-gray-500'>
                Type of inputs
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400 mt-2'>
              {chanllenge.typeInput.map(item=>{
                return <span key={item}>{item}</span>
              })}
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div className=''>
              <span className='font-semibold text-base leading-6 text-primary-gray-500'>
                Type of output
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400 mt-2'>
              {typeof chanllenge.testcases[0].output}
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div className=''>
              <span className='font-semibold text-base leading-6 text-primary-gray-500'>
                Issues
              </span>
              <p className='font-normal text-base leading-6 text-primary-gray-400 mt-2'>
              {chanllenge.comments.length}
              </p>
            </div>
          </Col>
        </Row>
        )}
      </div>
    </div>
  );
}

export default DetailChallenge;
