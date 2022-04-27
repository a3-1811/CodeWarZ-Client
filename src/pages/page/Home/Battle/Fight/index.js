import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import ChanllengeApi from "../../../../../apis/chanllengeApi";
import CodeApi from "../../../../../apis/codeApi";
import "./style.css";
import Loading from "../../../../../components/shared/Loading/Loading";
import SubmitResult from "./SubmitResult";

import { SocketContext } from "../../../../../contexts/socket";
import useStore from "../../../../../store/useStore";
import AlertMessage from "../../../../../components/shared/AlertMessage";

require("codemirror/mode/xml/xml");
require('codemirror/theme/dracula.css');
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");

function Fight(props) {
  const socket = useContext(SocketContext);
  const user = useStore(state => state.user)
  const { room } =useParams()
  const [battle, setBattle] = useState(null)
  const [code, setCode] = useState("");
  const [chanllenge, SetChanllenge] = useState(null);
  const [lang, setLang] = useState("javascript");
  const [error, setError] = useState(false);
  const [result, setResult] = useState("");
  const [submit, setSubmit] = useState({
    show: false,
    result: null,
  });
  const timerRef = useRef("")
  const [alert, setalert] = useState({
    message : "", color : "red", show :false
  })
  const history = useNavigate();

  useEffect(() => {
    // emit USER_ONLINE event
    socket.emit("ADD_USER_ONLINE", {
      id: user._id,
      fullName: user.fullName,
    });
    // List user online
    socket.emit("CREATE_BATTLE",{room,  id: user._id,fullName: user.fullName,})
    
    socket.on("INFO_BATTLE",(battle)=>{
      setBattle(battle)
    })
    
    socket.on("RESULT_BATTLE",(winnerId)=>{
      //Result battle
      history('/battleResult/'+winnerId)
    })
  return () => {
    socket.off("INFO_BATTLE")
  }
}, [socket,user])

useEffect(() => {
  //Listen submite
  socket.on("PLAYER_SUBMITED",(playerSubmit)=>{
    // Is you
    if(playerSubmit.id === user._id){
      setalert({...alert,message: "Submited completed. Wait a minute for other player.",color: "green",show: true})
    }else{
      setalert({...alert,message: `${playerSubmit.fullName } have submited. Hurry up!`,color: "red",show: true})
      timerRef.current = setTimeout(() => {
        socket.emit("SUBMITED_LATE",{room,code})
      }, 5000);
    }
  })

  return () => {
    socket.off("PLAYER_SUBMITED")
  }
}, [code,room])


  useEffect(() => {
    if(battle){
      ChanllengeApi.getChanllengeById(battle.chanllengeId)
      .then((res) => {
        let { code } = res.chanllenge.defaultCode[0];
        let temp;
          temp = code.split("$");
        SetChanllenge({
          ...res.chanllenge,
        });
        setCode(temp[0].concat(temp[1]));
      })
      .catch((err) => console.log({ err }));
    }
  }, [battle]);
  const handleSave = () => {
    console.log("saved");
  };
  const excute = () => {
    CodeApi.run({
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
    CodeApi.submitBattle({
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
            //Send result
            socket.emit("SUBMIT_BATTLE",{battle,code})

          }
        }
      })
      .catch((err) => console.log({ err }));
  };

  return (<>
  <div className="info">
        {battle ? (
          <div className="flex justify-around items-center p-5 text-white font-bold text-lg">
          <span>{battle.player1.fullName}</span>
          <span>VS</span>
          <span>{battle.player2.fullName}</span>
          </div>
        ) : ""}
      </div>
    <div className="fight h-full w-full flex max-h-[88vh]">
      
      {/* Hint, desciptions, Name of problems  */}
      <div className="code-info basis-1/3 h-full flex-shrink bg-white">
        {!chanllenge ? (
          <Loading />
        ) : (
            <div className="p-2 text-sm">
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
                              {JSON.stringify(item)}
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
            </div>
        )}
       </div>
      {submit.show ? (
        <SubmitResult submit={submit} />
      ) : (
        <div className="basis-2/3 flex-shrink flex flex-col relative">
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
      <AlertMessage message={alert.message} color={alert.color}  show={alert.show}/>
    </div>
  </>
  );
}

export default Fight;
