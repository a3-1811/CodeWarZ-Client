import React, { useEffect, useState } from "react";
import NotificationApi from "../../../../apis/notificationApi";
import UserApi from "../../../../apis/userApi";

import { useNavigate } from "react-router-dom";
function Notices() {
  const [notifications, setNotifications] = useState(null);
  const [invites, setInvites] = useState(null);
  const history = useNavigate()
  useEffect(() => {
    (async () => {
      try {
        const { notifications } = await NotificationApi.getNotifications();
        const { invites } = await NotificationApi.getInviteRequest();
        setInvites(invites)
        setNotifications(notifications);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const calcTime = (time) => {
    let minus = 60 * 1000;
    let hours = 60 * minus;
    let day = 24 * hours;

    let timeMessage = new Date(time);
    let now = new Date();

    let dif = now.getTime() - timeMessage.getTime();
    if (dif < minus) {
      return "just now";
    } else {
      if (dif < hours) {
        return `${Math.floor(dif / minus)} minutes ago`;
      } else {
        if (dif < day) {
          return timeMessage.toLocaleTimeString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          });
        } else {
          return timeMessage.toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          });
        }
      }
    }
  };

  const handleAccept = (inviteId,accept)=>{
    UserApi.acceptInvite({inviteId,accept})
    .then(res=>{
      history('/converstation')
    })
    .catch(err=>{
      console.log({err})
    })
  }

  return (
    <div className="h-screen">
      <h2 className="text-center text-white font-semibold text-3xl mb-5">
        Notifications
      </h2>
      <div className="notifications w-full h-3/4 overflow-y-scroll">
        {
          invites ? invites.map((invite)=>{
            return (
              <div
                  key={invite._id}
                  className="mb-3 text-white p-2 notification w-full flex justify-between items-center bg-gray-600 bg-opacity-40"
                >
                  <div className="content w-2/3">
                    <h3 className="font-bold text-lg">{invite.sender.fullName} send a request to become a friend</h3>
                    <p className="w-full my-2">
                      <span onClick={()=>{handleAccept(invite._id,true)}} className=" px-3 py-1 bg-primary rounded-lg text-lg cursor-pointer mx-2">Accept</span>
                      <span onClick={()=>{handleAccept(invite._id,false)}} className=" px-3 py-1 bg-red-600 rounded-lg text-lg cursor-pointer mx-2">Deny</span>
                    </p>
                  </div>
                  <span className="time">{calcTime(invite.createdAt)}</span>
                </div>
            )
          }) : ""
        }
        {notifications
          ? notifications.map((noti) => {
              return (
                <div
                  key={noti._id}
                  className="mb-3 text-white p-2 notification w-full flex justify-between items-center bg-gray-600 bg-opacity-40"
                >
                  <div className="content w-2/3">
                    <h3 className="font-bold text-lg text-primary">{noti.title}</h3>
                    <p className="limit-1 w-full">{noti.content}</p>
                  </div>
                  <span className="time">{calcTime(noti.createdAt)}</span>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Notices;
