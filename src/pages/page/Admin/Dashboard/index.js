import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { Line } from "react-chartjs-2";
import UserApi from "../../../../apis/userApi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import AdminRightContent from "../../../../components/layout/AdminRightContent";
import useStore from "../../../../store/useStore";
import {SocketContext} from "../../../../contexts/socket";

import PaymentApi from "../../../../apis/paymentApi";
ChartJS.register(
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const options = {
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      yAlign: "bottom",
      padding: {
        left: 30,
        right: 30,
        top: 5,
        bottom: 5,
      },
      backgroundColor: "#5185F7",
      displayColors: false,
      callbacks: {
        title: function (tooltipItem) {
          return;
        },
        label: function (tooltipItem) {
          return tooltipItem.dataset.data[tooltipItem["dataIndex"]];
        },
      },
    },
  },
  legend: {
    display: false,
  },
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scale: {
    yAxes: [
      {
        type: "linear",
        position: "bottom",
        ticks: {
          max: 100,
          min: 0,
          stepSize: 1,
        },
      },
    ],
  },
};

function Dashboard() {
  const socket = useContext(SocketContext)
  // Store
  const user = useStore((state) => state.user);

  const [payments, setPayments] = useState(null);
  const [manager, setManager] = useState(null);
  const [userOnline, setUserOnline] = useState([]);
  const [filter, setFilter] = useState("day");
  const [dateSelected, setDateSelected] = useState(new Date())

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
    (async () => {
      let { payments } = await PaymentApi.getListPayment();
      let { manager } = await UserApi.manager();
      setManager(manager);
      setPayments(payments);
    })();
  }, []);

  const handleOnChange = (e) => {
    setFilter(e.target.value);
  };

  const renderDataSetMoney = () => {
    var canvas = document.createElement("canvas");
    var chart = canvas.getContext("2d");
    let gradient = chart.createLinearGradient(0, 0, 0, 450);

    gradient.addColorStop(0, "rgba(206, 221, 255,1)");
    gradient.addColorStop(0.5, "rgba(206, 221, 255,0.7)");
    gradient.addColorStop(1, "rgba(206, 221, 255,0.3)");
    // Variable
    let date = dateSelected;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const days = new Date(year, month, 0).getDate();
    let listDays = Array.from({ length: days }, (_, i) => i + 1);
    let listMonths = Array.from({ length: 12 }, (_, i) => i + 1);
    //Cacluator money earn incoming
    let labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    let data = [33, 53, 85, 41, 44, 65];
    switch (filter) {
      case "day":
        // Caclulator day by day
        var temp = listDays.reduce((curr, next) => {
          let paymentOfDay = payments.filter(
            (payment) =>
              new Date(payment.createdAt).getDate() === next &&
              new Date(payment.createdAt).getMonth() + 1 === month &&
              new Date(payment.createdAt).getFullYear() === year
          );
          let totalDayMoney = paymentOfDay.reduce((curr, next) => {
            return curr + next.amount;
          }, 0);
          curr.push(totalDayMoney);
          return [...curr];
        }, []);
        labels = [...listDays];
        data = [...temp];
        break;
      case "week":
        //day of week start of month
        let weekArray = [];
        for (let i = 0; i < 4; i++) {
          let obj = {};
          obj.startDay = new Date(year, month - 1, 7 * i + 1);
          obj.endDay = new Date(year, month - 1, 7 * i + 7);
          weekArray.push(obj);
        }
        // Caclulator week
        var temp = weekArray.reduce((curr, next) => {
          let paymentOfDay = payments.filter((payment) => {
            if (
              next.startDay <= new Date(payment.createdAt) &&
              next.endDay >= new Date(payment.createdAt)
            ) {
              return true;
            }
            return false;
          });
          let totalDayMoney = paymentOfDay.reduce((curr, next) => {
            return curr + next.amount;
          }, 0);
          curr.push(totalDayMoney);
          return [...curr];
        }, []);
        labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        data = [...temp];
        break;
      case "month":
        //day of week start of month
        // Caclulator week
        var temp = listMonths.reduce((curr, next) => {
          let paymentOfDay = payments.filter((payment) => {
            if (
              next === new Date(payment.createdAt).getMonth() + 1 &&
              year === new Date(payment.createdAt).getFullYear()
            ) {
              return true;
            }
            return false;
          });
          let totalDayMoney = paymentOfDay.reduce((curr, next) => {
            return curr + next.amount;
          }, 0);
          curr.push(totalDayMoney);
          return [...curr];
        }, []);
        labels = [...listMonths];
        data = [...temp];
        break;
      default:
        break;
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "Money (VND)",
          data: data,
          fill: true,
          backgroundColor: gradient,
          borderColor: "#5185F7",
          pointStyle: "circle",
          pointRadius: 6,
          pointBorderWidth: 3,
          pointBorderColor: "#fff",
          pointBackgroundColor: "#5185F7",
        },
      ],
    };
  };
  const handleDateChange = (date) =>{
    setDateSelected(date)
  }
  return (
    <div className="flex w-full">
      <div className="pt-5 dashboard__main w-2/3">
        <h2 className="mb-6 text-primary font-semibold text-2xl">Dashboard</h2>
        <div className="content w-full">
          {manager && (
            <div className="list flex items-center justify-between w-full gap-x-1 gap-y-1 flex-wrap">
              <div className="item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl">
                <div className="header flex items-center gap-x-3">
                  <div className="iconBox h-10 w-10 flex items-center justify-center bg-primary rounded-full bg-opacity-10">
                    <i className="fa fa-carrot text-primary text-xl"></i>
                  </div>
                  <div className="limit-2 font-bold text-xs w-[90px]">
                    Number chanllenges
                  </div>
                </div>
                <div className="font-bold text-3xl text-gray-600">
                  {manager.chanllenges.length}
                </div>
              </div>
              <div className="item flex flex-col items-start gap-y-1 px-3 py-2  rounded-xl">
                <div className="header flex items-center gap-x-3">
                  <div className="iconBox h-10 w-10 flex items-center justify-center bg-[#FFAC6A] rounded-full bg-opacity-10">
                    <i className="fa fa-language text-[#FFAC6A] text-xl"></i>
                  </div>
                  <div className="limit-2 font-bold text-xs w-[90px]">
                    Number languages
                  </div>
                </div>
                <div className="font-bold text-3xl text-gray-600">
                  {manager.languages.length}
                </div>
              </div>
              <div className="item flex flex-col items-start gap-y-1 px-3 py-2  rounded-xl">
                <div className="header flex items-center gap-x-3">
                  <div className="iconBox h-10 w-10 flex items-center justify-center bg-green rounded-full bg-opacity-10">
                    <i className="fa fa-user-astronaut text-green text-xl"></i>
                  </div>
                  <div className="limit-2 font-bold text-xs w-[90px]">
                    Number users
                  </div>
                </div>
                <div className="font-bold text-3xl text-gray-600">
                  {manager.users.length}
                </div>
              </div>
              <div className="item flex flex-col items-start gap-y-1 px-3 py-2  rounded-xl">
                <div className="header flex items-center gap-x-3">
                  <div className="iconBox h-10 w-10 flex items-center justify-center bg-red-600 rounded-full bg-opacity-10">
                    <i className="fab fa-canadian-maple-leaf text-red-600 text-xl"></i>
                  </div>
                  <div className="limit-2 font-bold text-xs w-[90px]">
                    Number diffcults
                  </div>
                </div>
                <div className="font-bold text-3xl text-gray-600">
                  {manager.difficults.length}
                </div>
              </div>
            </div>
          )}

          <div className="chart w-full mt-5 h-full p-[15px]">
            <div className="flex justify-between items-center w-full">
              <h3 className="font-bold text-sm">Statistical table</h3>
              <div className="selectBox flex justify-center items-center gap-x-3">
                <span className="font-bold text-sm">View by</span>
                <select
                  onChange={handleOnChange}
                  className="rounded-2xl cursor-pointer focus:outline-none w-[100px] outline-none border-gray-200 border-1 px-[12px] py-[5px] text-gray-500"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
            </div>
            {/* Chart  */}
            {payments && <Line data={renderDataSetMoney()} options={options} />}
          </div>
        </div>
      </div>
      {manager && 
      <AdminRightContent totalUser={manager.users.length} userOnline={userOnline} handleDateChange={handleDateChange}/>
      }
    </div>
  );
}

export default Dashboard;
