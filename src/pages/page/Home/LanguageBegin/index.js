import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import javascriptLogo from "../../../../assets/javascript-logo.png"
import pythonLogo from "../../../../assets/python-logo.png"

import LanguageApi from "../../../../apis/languageApi";
import UserApi from "../../../../apis/userApi";
import Notice from "../../../../components/shared/Notice";

function LanguageBegin() {
  const [languagesChoosed, setLanguagesChoosed] = useState([]);
  const [langs, setLangs] = useState([]);
  const history = useNavigate()
 //Notice component control state
 const [dialog, setDialog] = useState({
    message: "",
    isOpen: false,
    isSuccess: false,
  });

  //handleNotice
  const handleNotice = (state) => setDialog({ ...dialog, isOpen: state });

  useEffect(() => {
    (async () => {
      let res = await LanguageApi.getListLanguages();
      setLangs([...res.langs])
   })();
  }, []);

  const handleChooseLanguage = (id) => {
      console.log(id)
    let index = languagesChoosed.findIndex(langID=>langID === id)
    if(index === -1){
        setLanguagesChoosed([...languagesChoosed,id]);
    }else{
        let temp = [...languagesChoosed]
        temp.splice(index,1)
        setLanguagesChoosed([...temp]);
    }
  };
  const handleSubmit = () => {
      if(languagesChoosed.length === 0){
        setDialog({
            ...dialog,
            message: "Please choose lease one language programing!",
            isSuccess: false,
            isOpen: true,
          });
          return
      }
    UserApi.updateProfile({
        programing_languages : [...languagesChoosed]
    })
      .then((res) => {
          setDialog({
            ...dialog,
            message: "Completed ! Please wait a few minutes!",
            isSuccess: true,
            isOpen: true,
          });
          UserApi.generateChapters().then((res)=>{
            setTimeout(() => {
              history("/")
          }, 2000);
          })
          .catch(console.log)
      })
      .catch((err) => {
        setDialog({
            ...dialog,
            message: "Something was wrong!",
            isSuccess: false,
            isOpen: true,
          });
      });
  };
  const logoImages = (name) =>{
      switch (name) {
          case 'javascript':
              return javascriptLogo
           case 'python':
              return pythonLogo   
          default:
              break;
      }
  }
  return (
    <div className="notClickOutside languages flex flex-col justify-center items-center p-4 h-1/2 w-full md:h-3/4">
      <h2 className="text-center mb-4 font-bold text-white text-xl md:mb-3">
        Choose your languages want to practices!
      </h2>
      <div className="content h-full flex gap-x-10 justify-center items-center mb-4  sm:flex-col sm: gap-y-10">
        {langs && langs.map((lang) => {
          return (
            <div className="imageBox" key={lang._id}>
              <img
              className={languagesChoosed.find(item => item === lang._id) ? "choosed" : ""}
                src={logoImages(lang.name)}
                alt={lang.name}
                onClick={()=>{handleChooseLanguage(lang._id)}}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className="chooserButton inline-block text-center font-semibold text-white text-lg px-5 py-2 bg-primary rounded-3xl"
      >
        Confirm
      </button>
      <Notice
            status={dialog.isOpen}
            message={dialog.message}
            handleNotice={handleNotice}
            typeNotice={dialog.isSuccess}
          />
    </div>
  );
}

export default LanguageBegin;
