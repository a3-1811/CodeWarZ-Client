import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Notice from "../Notice";

import UserApi from "../../../apis/userApi";
import MessageApi from "../../../apis/messageApi";
import useStore from "../../../store/useStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "90vh",
  overflowY: "scroll",
};
// Yup validateion schema
const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export default function ConversationModal(props) {
  const { register } = useForm({
    resolver: yupResolver(schema),
  });
  // User profile
  const user = useStore(state => state.user)

  const { isOpen, handleModal, handleRefesh } = props;

  const [notice, setNotice] = React.useState({
    message: "Create new conversation completed",
    status: false,
    typeNotice: true,
  });

  const [name, setName] = React.useState("");

  const [hintMember, setHintMember] = React.useState([]);
  const [listUser, setListUser] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const interval = React.useRef("");

  React.useEffect(() => {
    (async () => {
      let me = JSON.parse(localStorage.getItem('acc'))
      let {users} = await UserApi.getListUser();
      let friends = users.filter(user=> user._id !== me._id && me.friends.includes(user._id))

      setListUser([...friends]);
    })();
  }, []);

  const handleNotice = (value) => {
    setNotice({ ...notice, status: value });
  };

  const handleStatus = (value) => {
    handleModal(value);
  };
  // Handle hint users found by keyword
  const handleHintOnChange = async (e) => {
    let keyword = e.target.value;

    if (interval.current) {
      clearInterval(interval);
    }

    interval.current = setTimeout(() => {
      let you = {...user};
      let res = listUser.filter((item) => {
        return (
          members.findIndex((user) => user._id === item._id) === -1 &&
          item._id !== you._id &&
          (item.fullName.includes(keyword) || item.email.includes(keyword))
        );
      });
      setHintMember([...res]);
      clearInterval(interval);
    }, 1000);
  };

  // Hand storage user want pushing into conversation
  const handleAddNewMember = (user) => {
    if (members.findIndex((item) => item._id === user._id) !== -1) return;

    setMembers([...members, user]);
  };
  const handleRemoveMember = (user) => {
    let index = members.findIndex((item) => item._id === user._id);
    members.splice(index, 1);
    setMembers([...members]);
  };
  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (members.length === 0) {
      setNotice({
        status: true,
        typeNotice: false,
        message: "Add least one person into to the conversation!",
      });
    } else {
      if (members.length > 1) {
        if (name.trim() === "") {
          setNotice({
            status: true,
            typeNotice: false,
            success: "Fill name field for conversation!",
          });
          return;
        }
      }
      let idListMembers = members.map((item) => item._id);
      let newConversation = {
        members: idListMembers,
      };
      if (name !== "") {
        newConversation["name"] = name;
      }
      MessageApi.createConversation(newConversation)
        .then((data) => {
          setNotice({
            status: true,
            typeNotice: true,
            message: "Created new conversation!",
          });
            handleRefesh(data);
        })
        .catch((err) => {
          console.log({ err });
          setNotice({
            status: true,
            typeNotice: false,
            message: err.response.data.error,
          });
        });
    }
  };

  return (
    <div className="absolute top-0 left-0">
      <Modal
        open={isOpen}
        onClose={() => {
          handleStatus(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="border-4 border-primary text-sm  ">
          <form className="members__form" onSubmit={handleSubmit}>
            <h1
              className="font-bold text-3xl mb-3"
            >
              Users
            </h1>
            {members.length > 1 ? (
              <div className="inputGroup">
                <input
                  placeholder="Name of conversation"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label className="input-icon">
                  <i className="fab fa-napster"></i>
                </label>
              </div>
            ) : (
              ""
            )}
            <div className="inputGroup">
              <input
                {...register("email")}
                placeholder="Press something to find other user"
                onChange={handleHintOnChange}
              />
              <label className="input-icon">
                <i className="fa fa-user"></i>
              </label>
              <div className={hintMember.length > 0 ? "hint visible" : "hint"}>
                {hintMember.length > 0
                  ? hintMember.map((member) => {
                      return (
                        <div className="member flex justify-between flex-row mb-5" key={member._id}>
                          <div className="wrap flex justify-between items-center">
                            <div className="iconBox h-7 w-7 rounded-full object-cover">
                              <img
                              className="rounded-full h-full w-full"
                                src={member.avatar}
                                alt={member.fullName}
                              />
                            </div>
                            <div className="ml-2">
                              {" "}
                              {member.fullName} ({member.email})
                            </div>
                          </div>
                          <div
                            className="font-bold h-7 w-7 text-center leading-3 bg-primary cursor-pointer text-white px-2 py-2"
                            onClick={() => {
                              handleAddNewMember(member);
                            }}
                          >
                            +
                          </div>
                        </div>
                      );
                    })
                  : "Not found"}
              </div>
            </div>
            <h1
              style={{ padding: "1rem 0", marginBottom: "1rem" }}
              className="font-bold text-3xl mb-3"
            >
              Members selected
            </h1>
            <div className="members w-full px-3 py-2">
              {members.map((member) => {
                return (
                  <div className="member w-full flex justify-between items-center text-sm mb-5" key={member._id}>
                    <div className="wrap flex justify-between items-center">
                    <div className="iconBox h-7 w-7 rounded-full object-cover">
                      <img
                      className="rounded-full h-full w-full"
                        src={member.avatar}
                        alt={member.fullName}
                      />
                    </div>
                    <div className="ml-2">
                      {" "}
                      {member.fullName} ({member.email})
                    </div>
                    </div>
                    <div
                      className="font-bold h-7 w-7 text-center leading-3 bg-red-600 cursor-pointer text-white px-2 py-2"
                      onClick={() => {
                        handleRemoveMember(member);
                      }}
                    >
                      x
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="btn bg-primary text-white btn-border btn-round"
              style={{ marginTop: "5rem" }}
              type="submit"
            >
              Create conversation
            </button>
          </form>
        </Box>
      </Modal>
      <Notice
        message={notice.message}
        status={notice.status}
        handleNotice={handleNotice}
        typeNotice={notice.typeNotice}
      />
    </div>
  );
}
