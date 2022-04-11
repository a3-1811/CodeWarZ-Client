import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../apis/userApi";
// Zutand store
import useStore from "../store/useStore";

function CodeTeamplate({ children }) {
  const updateInfo = useStore((state) => state.updateInfo);
const fetchMyChapters = useStore((state) => state.fetchMyChapters);


  const history = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        let checkAuth = await UserApi.checkAuthen();
        localStorage.setItem("acc", JSON.stringify(checkAuth.user));
        updateInfo(checkAuth.user);
        fetchMyChapters()
        if (checkAuth.user.programing_languages.length === 0) {
          history("/chooseLanguages");
        }
      } catch (error) {
        localStorage.removeItem("acc");
        localStorage.removeItem("tokenAuth");
        history("/login");
      }
    })();
  }, [history, updateInfo,fetchMyChapters]);
  
  return (
    <div className="main w-full h-screen max-h-screen md:p-1">
     {children}
    </div>
  );
}

export default CodeTeamplate;
