import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Notice from "../Notice"
import UserApi from "../../../apis/userApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
// Yup validateion schema
const schema = yup
  .object({
    password: yup.string().min(6,"Password must be large 6 characters").required(),
    newPassword: yup.string().min(6,"Password must be large 6 characters").required(),
    rePassword: yup.string().min(6,"Password must be large 6 characters").required(),
  })
  .required();

export default function ChangePasswordModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {user} = props

  const { isOpen, handleModal } = props;

  const [notice, setNotice] = React.useState({
    message : "Change password name : ",
    status : false,
    typeNotice : true
  })

  const handleNotice = (value)=>{
    setNotice({...notice,status: value})
  }

  const handleStatus = (value) => {
    handleModal(value);
  };

  const onSubmit = async(data) => {
    // Check Current match 
   try {
    let isValid = await UserApi.loginAccount({email : user.email,password : data.password})

    if(isValid){
      if(data.newPassword === data.rePassword){
        UserApi.updateProfile({password : data.newPassword})
        .then((data)=>{
          setNotice({...notice,status: true,typeNotice:true,message: "Change new password success!"})
          handleStatus(false)
        })
      }
    }
    
   } catch (error) {
    setNotice({...notice,status: true,typeNotice: false,message: "Something wrong!"})
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
        <Box sx={style}>
          <form className="projects__form" onSubmit={handleSubmit(onSubmit)}>
            <h1 style={{padding:"1rem 0",marginBottom: "1rem"}} className="text-3xl text-center font-bold py-2 mb-2">Change Password</h1>
            <div className="inputGroup mb-3">
              <input type="password" {...register("password")} placeholder="Current password" />
              <label className="input-icon">
              <i className="fa fa-key"></i>
              </label>
              <p className="message text-red-600">{errors.password?.message}</p>
            </div>
            <div className="inputGroup mb-3">
              <input type="password" {...register("newPassword")} placeholder="New password" />
              <label className="input-icon">
              <i className="fa fa-lock"></i>
              </label>
              <p className="message text-red-600">{errors.newPassword?.message}</p>
            </div>
            <div className="inputGroup mb-3">
              <input type="password" {...register("rePassword")} placeholder="Repeat new password" />
              <label className="input-icon">
              <i className="fa fa-lock"></i>
              </label>
              <p className="message text-red-600">{errors.rePassword?.message}</p>
            </div>
            <button className="block bg-primary py-1 px-2 rounded-2xl text-white font-semibold mx-auto" type="submit">
              Change Password
            </button>
          </form>
        </Box>
      </Modal>
      <Notice message={notice.message} status={notice.status} handleNotice={handleNotice} typeNotice={notice.typeNotice}/>
    </div>
  );  
}
