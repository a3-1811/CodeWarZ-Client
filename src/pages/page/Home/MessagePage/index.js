import React, { useEffect, useRef, useState, useContext } from "react";
import Picker from "emoji-picker-react";
import Message from "./Message";
import MessageApi from "../../../../apis/messageApi";
import Modal from "../../../../components/shared/ModalConversation";

import { SocketContext } from "../../../../contexts/socket";
import useStore from "../../../../store/useStore";

function MesssagePage(props) {
  // Socket
  const user = useStore(state => state.user)
  const socket = useContext(SocketContext);
  
  const [conversation, setConversation] = useState([]);
  const [userOnline, setUserOnline] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [sending, setSending] = useState(false);
  
  const [modalEmoji, setModalEmoji] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
  });
  
  const scrollRef = useRef();
  
  useEffect(() => {
    (async () => {
      let data = await MessageApi.getCurrentConversation({
        sortBy: "updatedAt:desc",
      });

      if (data.length > 0) {
        data[0].active = true;
        setConversation([...data]);
        setCurrentConversation({ ...data[0] });
      }
    })();
  }, []);

  useEffect(() => {
     // emit USER_ONLINE event
     socket.emit("ADD_USER_ONLINE", {
       id: user._id,
       fullName: user.fullName,
     });
     
     socket.emit("GET_LIST_ONLINE")

     socket.on("GET_USERS", (usersOnline) => {
       setUserOnline([...usersOnline]);
     });

    return () => {
      socket.off("GET_USERS")
    }
  }, [socket])

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [currentConversation]);

  useEffect(() => {
    if(currentConversation){
      socket.on("GET_MESSAGE", (c) => {
        console.log(c)
        let index = conversation.findIndex((item) => item._id === c.newMessage._id);
        let indexCurrent = conversation.findIndex(
          (item) => item._id === currentConversation._id
        );
  
        if (index !== -1) {
          let temp = [...conversation];
          temp[index] = { ...c.newMessage };
          temp[indexCurrent] = { ...temp[indexCurrent], active: true };
          setConversation([...temp]);
          setCurrentConversation({ ...temp[indexCurrent] });
        }
      });
    }
    return ()=>{
      socket.off("GET_MESSAGE")
    }
  }, [socket, conversation,currentConversation]);

  // Handle input textarea change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  //Handle change conversation
  const handleChangeConversation = (id) => {
    const newActiveArray = conversation.map((item) => {
      if (item._id === currentConversation._id) {
        return { ...item, active: false };
      }
      if (item._id === id) {
        return { ...item, active: true };
      }
      return item;
    });

    const converstation = conversation.find((item) => item._id === id);
    setCurrentConversation({ ...converstation });
    setConversation([...newActiveArray]);
  };

  // Handle emojj
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setModalEmoji(false);
    setMessage(message + emojiObject.emoji);
  };
  const handleChangeStatusEmoji = () => {
    setModalEmoji(!modalEmoji);
  };
  // Modal handlers
  const handleOpen = () => setModal({ ...modal, isOpen: true });

  const handleOpenModal = (value) => {
    setModal({ ...modal, isOpen: value });
  };
  //Handle display conversation
  const handleLastMessage = (id) => {
    let c = conversation.find((item) => item._id === id);
    if (c.messages.length === 0) {
      return "Wellcome to our chat!";
    }
    return c.messages[c.messages.length - 1].message;
  };
  // Handle after created new conversation
  const handleRefesh = () => {
    setConversation([...currentConversation]);
  };
  //handle send message
  const handleSendMessage = () => {
    setSending(true);
    if (message && message.trim().length > 1) {
      let newMessage = {
        sender: user._id,
        message,
      };
      MessageApi.createNewMessage(currentConversation._id, newMessage).then(
        (data) => {
          console.log(data)
          let index = conversation.findIndex((c) => data.newMessage._id === c._id);
          let temp = [...conversation];
          temp[index] = { ...data.newMessage };
          setConversation([...temp]);
          setCurrentConversation({ ...data.newMessage });

          socket.emit("SEND_MESSAGE", { ...newMessage, c: data });
          setTimeout(() => {
            setSending(false);
            setMessage("");
          }, 2000);
        }
      );
    }
  };
  return (
    <div className="chat h-full w-full">
      <div className="chat__title mb-2 flex justify-end items-center">
      <span className="p-1 px-2 bg-primary text-white rounded-xl text-sm cursor-pointer"><i className="fa fa-mobile-alt"></i> Call video</span>
        <span className="p-1 px-2 bg-primary text-white rounded-xl text-sm cursor-pointer ml-3" onClick={handleOpen}>Create new conversation</span>
      </div>
      <div className="content flex">
        <div className="left w-2/6 h-full p-1 flex-col flex-nowrap gap-x-3 overflow-y-scroll">
          {/* Contain icon user conversation */}
          {conversation.length === 0
            ? <h2 className="text-white">Create new converstation to chat</h2>
            : conversation.map((c) => {
                return (
                  <div
                    key={c._id}
                    className={`conversation ${c.active ? "active" : ""} `}
                    onClick={() => {
                      handleChangeConversation(c._id);
                    }}
                  >
                    <div className="iconBox">
                      {c.members.length > 2 ? (
                        <div className="groupIcon">
                          {c.members.length < 5
                            ? c.members.map((item, index) => {
                                return (
                                  <img
                                    style={{ marginLeft: `${-10 * index}px` }}
                                    key={item._id}
                                    src={item.avatar}
                                    alt={item.fullName}
                                  />
                                );
                              })
                            : c.members.slice(0, 4).map((item, index) => {
                                return (
                                  <img
                                    style={{ marginLeft: `${-10 * index}px` }}
                                    key={item._id}
                                    src={item.avatar}
                                    alt={item.fullName}
                                  />
                                );
                              })}
                        </div>
                      ) : user._id ===
                        c.members[0]._id ? (
                        <img
                          key={c._id}
                          src={c.members[1].avatar}
                          alt={c.members[0].fullName}
                        />
                      ) : (
                        <img
                          key={c._id}
                          src={c.members[0].avatar}
                          alt={c.members[0].fullName}
                        />
                      )}
                      {/* Handle Online status */}
                      {c.members.length < 3 ? (
                        userOnline.some(
                          (user) => c.members[0]._id === user.id
                        ) ? (
                          <span className="user__status online"></span>
                        ) : (
                          <span className="user__status offline"></span>
                        )
                      ) : c.members.some((item) =>
                          userOnline.some((user) => user.id === item._id)
                        ) ? (
                        <span className="user__status online"></span>
                      ) : (
                        <span className="user__status offline"></span>
                      )}
                    </div>
                    <div className="preview">
                      <h2 className="name">
                        {c.name
                          ? c.name
                          : user._id ===
                            c.members[0]._id
                          ? c.members[1].fullName
                          : c.members[0].fullName}
                      </h2>
                      <p className="lastMessage">
                        {/* Apply esclise ... text overflow */}
                        {handleLastMessage(c._id)}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="right w-4/6 h-full">
          {/* Contain all messages in a conversation */}
          <div className="message__content h-5/6">
            {currentConversation?.messages.length > 0 ? (
              currentConversation.messages.map((item, index) => {
                return (
                  <div key={index} ref={scrollRef}>
                    <Message
                      message={item}
                      owner={
                        user._id ===
                        item.sender._id
                      }
                    />
                  </div>
                );
              })
            ) : (
              <h3>Send something to chat</h3>
            )}
          </div>
          <div className="inputArea h-1/6 w-full relative">
            <textarea
            className="w-full mt-2 resize-none pr-40"
              placeholder="Add your message"
              value={message}
              onChange={handleInputChange}
            ></textarea>
            {modalEmoji ? (
              <div className="emojiBox">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            ) : (
              ""
            )}
            <div className="controlBox text-sm">
              <span className="emojiIcon text-primary"  onClick={handleChangeStatusEmoji}>
                <i className="fab fa-earlybirds"></i>
              </span>
              <span
                className="btn-send cursor-pointer"
                onClick={sending ? null : handleSendMessage}
              >
                Send<i className="fa fa-paper-plane "></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal.isOpen}
        handleModal={handleOpenModal}
        handleRefesh={handleRefesh}
      />
    </div>
  );
}

export default MesssagePage;
