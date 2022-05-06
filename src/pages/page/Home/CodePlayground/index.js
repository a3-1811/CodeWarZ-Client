import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ChanllengeApi from "../../../../apis/chanllengeApi";
import CodeApi from "../../../../apis/codeApi";
import "./style.css";
import Loading from "../../../../components/shared/Loading/Loading";
import SubmitResult from "./SubmitResult";

require("codemirror/mode/xml/xml");
require('codemirror/theme/dracula.css');
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");

const avatarNullUrl = "https://res.cloudinary.com/samageapi/image/upload/v1634518566/mi7n5gfku2zay3spqetz.png"

function CodePlayground(props) {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [chanllenge, SetChanllenge] = useState(null);
  const [lang, setLang] = useState("javascript");
  const [error, setError] = useState(false);
  const [result, setResult] = useState("");
  const [submit, setSubmit] = useState({
    show: false,
    result: null,
  });
  const history = useNavigate();

  useEffect(() => {
    ChanllengeApi.getCodeMyChallenges(id)
      .then((res) => {
        console.log(res.myChanllenges)
        let { code } = res.myChanllenges.chanllenge.defaultCode[0];
        let temp;
        if (res.myChanllenges.code[0]) {
          temp = res.myChanllenges.code[0].code;
        } else {
          temp = code.split("$");
        }
        SetChanllenge({
          ...res.myChanllenges.chanllenge,
          currentCode: res.myChanllenges.code,
        });
        //Exist code user ?
        let newCode = typeof temp === "string" ? temp : temp[0].concat(temp[1]);
        setCode(newCode);
      })
      .catch((err) => console.log({ err }));
  }, []);
  const handleSave = () => {
    console.log("saved");
  };
  const excute = () => {
    CodeApi.execute({
      code,
      chanllengeId: chanllenge._id,
      lang,
    })
      .then((res) => {
        if (res.result.error) {
          setError(true);
          setResult(res.result.message);
        } else {
          // render message complier
          let mess = res.result.message
            .trim()
            .split("\n")
            .map((item) => <p key={item}>{item}</p>);
          setResult(mess);
          setError(false);
        }
      })
      .catch((err) => {
        console.log({ err });
        setError(true);
        setResult("Something wrong!");
      });
  };

  const handleSubmit = () => {
    CodeApi.submit({
      code,
      chanllengeId: chanllenge._id,
      lang,
    })
      .then((res) => {
        let error = res.result.find((item) => item.error);
        if (error) {
          setError(true);
          setResult(error.message);
        } else {
          // render message complier
          let mess = res.result.map((testcase, index) => {
            return (
              <div key={`${index}-${index * index}`}>
                {testcase.message
                  .trim()
                  .split("\n")
                  .map((item, index) => (
                    <p key={`${item}-${index}`}>{item}</p>
                  ))}
              </div>
            );
          });
          let success = res.result.every((testcase) => testcase.match);
          mess.push(
            <div key="timeStampExcute">Time execute: {res.timeExcute} ms</div>
          );
          let template = [
            <div key="templateResult" className="flex gap-5 flex-1">
              {mess}
            </div>,
          ];
          setResult(template);
          setError(false);
          if (success) {
            setSubmit({
              show: true,
              result: res.result,
              timeExcute: res.timeExcute,
              chanllengeId: chanllenge._id,
            });
          }
        }
      })
      .catch((err) => console.log({ err }));
  };

  const handleOnChangeLang = (e) => {
    setLang(e.target.value);
    let index = chanllenge.defaultCode.findIndex(
      (lang) => lang.lang.name === e.target.value
    );
    let { code } = chanllenge.defaultCode[index];
    let temp;
    if (chanllenge.currentCode[index]?.code) {
      temp = chanllenge.currentCode[index].code;
    } else {
      temp = code.split("$");
    }
    //Exist code user ?
    let newCode = typeof temp === "string" ? temp : temp[0].concat(temp[1]);
    setCode(newCode);
  };
  return (
    <div className="codePlayground h-full w-full flex">
      {/* Hint, desciptions, Name of problems  */}
      <div className="code-info basis-1/3 flex-shrink bg-white">
        {!chanllenge ? (
          <Loading />
        ) : (
          <Tabs>
            <TabList className="font-bold">
              <Tab>Descriptions</Tab>
              <Tab>Discuss</Tab>
            </TabList>
            <TabPanel className="p-2 text-sm">
              <h2 className="font-bold text-black text-lg mb-3">
                {chanllenge.name}
              </h2>
              <span className="text-green font-bold">
                {chanllenge.difficult.name}
              </span>
              <p className="my-3 italic">{chanllenge.descriptions}</p>
              <p className=" mb-3">
                <i className="fi-lightbulb"></i>Hint: {chanllenge.hint}
              </p>
              <div className="examples">
                {chanllenge.testcases.map((testcase, index) => {
                  return (
                    <div className="example mb-4" key={index}>
                      <h4 className="mb-3 font-bold">Example {index + 1}:</h4>
                      <div className="example-content bg-gray-100 p-2 rounded-sm">
                        <p>
                          <span className="font-bold">Input:</span>{" "}
                          {testcase.input.map((item) => (
                            <span key={item.length}>
                              {JSON.stringify(item)} ,
                            </span>
                          ))}
                        </p>
                        <p>
                          <span className="font-bold">Output:</span>{" "}
                          {JSON.stringify(testcase.output)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="comments">
                {chanllenge.comments.map((comment) => {
                  return (
                    <div className="comment text-sm border-primary border-b-4 p-2" key={comment._id}>
                      <div className="avatarBox rounded-full object-cover h-10 w-10 border-primary border-2">
                        <img
                        className="rounded-full"
                          src={comment.userId ? comment.userId.avatar : avatarNullUrl}
                          alt={comment.userId ? comment.userId.fullName : "Anonymous"}
                        />
                      </div>
                      <div className="content">
                        <h4>{comment.content}</h4>
                        <p>
                          {comment.userId ? comment.userId.fullName : "Anonymous"} -{" "}
                          {
                            comment.userId ?
                            comment.userId.medals[
                              comment.userId.medals.length - 1
                            ].name : "Anonymous"
                          }
                        </p>
                      </div>
                      <span>
                        Created at:{" "}
                        {new Date(comment.time).toLocaleString("vi-VN", {
                          timeZone: "Asia/Ho_Chi_Minh",
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
          </Tabs>
        )}
      </div>
      {submit.show ? (
        <SubmitResult submit={submit} />
      ) : (
        <div className="basis-2/3 flex-shrink h-screen flex flex-col relative">
          <div className="language absolute top-0 right-0 z-50">
            <div className="flex justify-center">
              <div className="xl:w-96">
                <select
                  className="form-select appearance-none
                  block
                  w-32
                  px-3
                  py-1.5
                  cursor-pointer
                  font-bold
                  text-primary
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  onChange={handleOnChangeLang}
                >
                  {chanllenge &&
                    chanllenge.defaultCode.map((lang) => (
                      <option
                        className="cursor-pointer"
                        key={lang.lang._id}
                        value={lang.lang.name}
                      >
                        {lang.lang.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <CodeMirror
            className="text-sm flex-1 h-full"
            value={code}
            onBeforeChange={(editor, data, value) => {
              setCode(value);
            }}
            options={{
              mode: lang,
              theme: "dracula",
              lineNumbers: true,
              extraKeys: {
                "Ctrl-S": handleSave,
              },
            }}
          />
          <div className="bottom">
            <div className={`result ${error ? "error" : ""}`}>{result}</div>
            <div className="control">
              <button className="btn btn-run" onClick={excute}>
                Run
              </button>
              <button className="btn btn-submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodePlayground;
