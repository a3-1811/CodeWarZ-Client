import React, { useEffect, useState } from "react";
import useStore from "../../../store/useStore";
import Loading from "../../../components/shared/Loading/Loading";
import ChangePasswordModal from "../../../components/shared/ChangePasswordModal";
import ChangeAvatar from "../../../components/shared/ChangeAvatar";
import UserAPI from "../../../apis/userApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Chart library
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function Profile() {
  const me = useStore((state) => state.user);
  const [record, setRecord] = useState(null);
  const [chartData, setchartData] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
  });
  const [modalAvatar, setModalAvatar] = useState({
    isOpen: false,
  });
  useEffect(() => {
    (async () => {
      try {
        let { myRecored } = await UserAPI.getMyRecord();
        setRecord(myRecored);
        // Set pie chart
        let labels = [
          "Total execution times",
          "Time Compiles",
          "Time Errors",
          "Time Submit",
        ];
        let datasets = [
          {
            label: "# of Votes",
            data: Object.keys(myRecored).map((key) => myRecored[key]),
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ];
        setchartData({ labels, datasets });
      } catch (error) {}
    })();
  }, []);

  //   Handle modal  popup
  const handleModal = (value) => {
    setModal({ ...modal, isOpen: value });
  };
  const openModal = () => {
    setModal({ ...modal, isOpen: true });
  };

  const handleModalAvatar = (value) => {
    setModalAvatar({ ...modalAvatar, isOpen: value });
  };
  const openModalAvatar = () => {
    setModalAvatar({ ...modalAvatar, isOpen: true });
  };

  return (
    <>
      {me && Object.keys(me).length !== 0 ? (
        <div className="profile w-full relative h-screen flex gap-2">
          <div className="content w-3/5 h-5/6">
            <div className="info w-full  h-1/4 p-3 mb-2 bg-black text-white">
              {/* Name, Email*/}
              <h2 className="title font-bold text-4xl text-white">{me.fullName}</h2>
              <p>Email: {me.email}</p>
            </div>
            <div className="stats w-full p-2 h-3/4 bg-black text-white">
              {record && chartData ? (
                <>
                  <div className="details flex justify-between items-center">
                    {/* Total submit, total execute code, total fail */}
                    <div className="border-r-2 border-primary p-2">
                      <h3 className="text-white">Total execution times</h3>
                      <span>{record["time"]} s</span>
                    </div>
                    <div className="border-r-2 border-primary p-2">
                      <h3 className="text-white">Time Compiles</h3>
                      <span>{record["timeComplier"]} time</span>
                    </div>
                    <div className="border-r-2 border-primary p-2">
                      <h3 className="text-white">Time Errors</h3>
                      <span>{record["timeError"]} time</span>
                    </div>
                    <div className="border-r-2 border-primary p-2">
                      <h3 className="text-white">Time Submit</h3>
                      <span>{record["timeSubmit"]} time</span>
                    </div>
                  </div>
                  <div className="chart h-full w-full">
                    {/* Chart of Total submit, total execute code, total fail */}
                    <h2 className="text-center font-semibold text-2xl my-2 text-white">Statistics</h2>
                    <div className="chart__content h-2/3">
                      <Pie
                        data={chartData}
                        width={"100%"}
                        height={"100%"}
                        options={{ maintainAspectRatio: false }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}    
            </div>
          </div>
          <div className="themal p-3 h-5/6 w-2/5 bg-black text-white flex flex-col items-center">
            <div className="avatar h-40 w-40 rounded-full relative object-cover">
              <img
                src={me.avatar}
                className="rounded-full h-full w-full"
                alt=""
              />
              <span
                className="absolute bottom-2 left-1/2 w-full -translate-x-1/2 text-center bg-primary rounded-2xl cursor-pointer"
                onClick={openModalAvatar}
              >
                Change avatar
              </span>
            </div>
            <div>
              <h2>
                <span className="px-2 py-1 text-center bg-secondary rounded-2xl cursor-pointer" onClick={openModal}>Change password</span>
              </h2>
            </div>
          <div className="border-white border-t-2 mt-4 w-full">
            <h2 className="font-bold text-lg my-3 text-white">Medals:</h2>
          <p>
                {me.medals.map((medal) => (
                  <span
                    className="py-1 px-2 bg-primary rounded-xl text-xs"
                    key={medal}
                  >
                    {medal.name}
                  </span>
                  
                ))}
              </p>
          </div>
          </div>
          <ChangeAvatar
            user={me}
            isOpen={modalAvatar.isOpen}
            handleModal={handleModalAvatar}
          />
          <ChangePasswordModal
            user={me}
            isOpen={modal.isOpen}
            handleModal={handleModal}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Profile;
