import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.scss";

function AdminRightContent(props) {
  const { userOnline, handleDateChange, totalUser } = props;
  const [value, onChange] = useState(new Date());
  const [circleValue, setCircleValue] = useState({
    user: [
      { fill: "#FF7506", percent: 60 },
      { fill: "#7E7D88", percent: 25 },
    ],
  });
  const hanldeOnChangeDate = (value, event) => {
    onChange(value);
    handleDateChange(value);
  };
  useEffect(() => {
    //caculator user online, offline
    let onlinePercent = (userOnline.length / totalUser).toFixed(2) * 100;
    let offlinePercent =
      ((totalUser - userOnline.length) / totalUser).toFixed(2) * 100;
    let res = [
      { fill: "green", percent: onlinePercent },
      { fill: "#7E7D88", percent: offlinePercent },
    ].sort((curr, next) => next.percent - curr.percent);
    setCircleValue({ ...circleValue, user: [...res] });
  }, [userOnline]);

  return (
    <div className="right__content w-1/3 pt-6 ml-2 h-screen max-h-screen">
      <h2 className="mb-6 text-primary font-semibold text-xl ml-2">General</h2>
      <div className="flex flex-col items-center w-full gap-y-2">
        <div className="lg:flex-col shadow-circle shadow-gray-300 rounded-xl px-3 py-2 items-center flex justify-between gap-x-5">
          <div className="lg:gap-x-1 circles flex justify-between gap-x-2 items-center">
            <div className="cirlce relative h-14 w-14">
              {circleValue.user.map((item, index) => (
                <CircularProgressbar
                  key={index}
                  text={
                    item.percent == circleValue.user[0].percent
                      ? `${item.percent}%`
                      : ""
                  }
                  strokeWidth={5}
                  styles={{
                    path: { stroke: item.fill },
                    trail: { stroke: "#EAEAEC" },
                    text: { stroke: "#000", fontSize: "24px" },
                  }}
                  value={item.percent}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-${
                    14 - index * 2
                  } w-${14 - index * 2}`}
                />
              ))}
            </div>
            <div className="name">
              <div className="number font-bold text-lg text-[#535261]">
                {totalUser}
              </div>
              <span className="text-sm text-primary font-medium">
                <i className="fa fa-user-astronaut"></i> User
              </span>
            </div>
          </div>
          <div className="detail flex flex-col gap-y-1">
            <div className="flex items-center justify-between gap-x-2">
              <div className="text-xs flex items-center gap-x-1">
                <span className="h-1 w-1 block bg-green rounded-full"></span>
                Đang hoạt động
              </div>
              <span className="text-sm font-bold text-primary">
                {userOnline && userOnline.length}
              </span>
            </div>
            <div className="flex items-center justify-between gap-x-2">
              <div className="text-xs flex items-center gap-x-1">
                <span className="h-1 w-1 block bg-[#7E7D88] rounded-full"></span>
                Đang offline
              </div>
              <span className="text-sm font-bold text-primary">
                {totalUser - userOnline.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 mt-2">
        <Calendar
          onChange={hanldeOnChangeDate}
          value={value}
          className="text-xs rounded-2xl w-full"
        />
      </div>
    </div>
  );
}

export default AdminRightContent;
