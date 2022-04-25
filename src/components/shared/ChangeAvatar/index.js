import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
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
export default function ChangeAvatarModal(props) {

  const { isOpen, handleModal,user } = props;

  const [notice, setNotice] = React.useState({
    message : "Change image avatar success",
    status : false,
    typeNotice : true
  })

  const history = useNavigate()

  const [avatar, setAvatar] = React.useState({
    imageFile : null,
    imagePreview : user.avatar
  })

  const handleNotice = (value)=>{
    setNotice({...notice,status: value})
  }

  const handleStatus = (value) => {
    handleModal(value);
  };

  
  // Image Preview Handler
  const handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    let image_as_files = e.target.files[0];

    setAvatar({
        imagePreview: image_as_base64,
        imageFile: image_as_files,
    })
  }

  const onSubmit = (e) => {
        e.preventDefault()
        if(avatar.imageFile !== null){
          const data = new FormData();
          data.append('avatar', avatar.imageFile);

          UserApi.updateAvatar(data)
          .then(()=>{
            setNotice({...notice,status: true,message: "Change new avatar success!"})
            setTimeout(()=>{
              history('/')
            },2000)
          })
          .catch((error)=>{
            setNotice({...notice,typeNotice: false,status: true,message: error.response.data.error})
          })
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
          <form className="projects__form " onSubmit={onSubmit}>
            <h1 className="text-3xl text-center font-bold py-2 mb-2">Change Avatar</h1>
            <div className="inputGroup mb-3">
              <input type="file" accept="image/*" placeholder="Pick up an image file" onChange={handleImagePreview}/>
            </div>
            <div className="inputGroup mb-5">
           <div className="iconBox h-40 w-40 rounded-full  mx-auto">
           <img
           className="w-full h-full rounded-full"
                src={avatar.imagePreview}
                alt={user.fullName}
              /></div>   
            </div>
           <div className="inputGroup">
           <button className="block bg-primary py-1 px-2 rounded-2xl text-white font-semibold mx-auto" type="submit">
              Change Avatar
            </button>
           </div>
          </form>
        </Box>
      </Modal>
      <Notice message={notice.message} status={notice.status} handleNotice={handleNotice} typeNotice={notice.typeNotice}/>
    </div>
  );
}
