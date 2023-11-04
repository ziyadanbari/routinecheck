import { Avatar } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import Input from "../../../../components/Input";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import EditOffRoundedIcon from "@mui/icons-material/EditOffRounded";
import { checkIfImage } from "../../../../functions/CheckIfImage";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../../../../components/Button";
import { APIconfig } from "../../../../config/api/API";
import { instance } from "../../../../config/axios/Axios";
function PersonalInformations() {
  const [previewImage, setPreviewImage] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const [avatar, setAvatar] = useState(userData.avatar);
  const [blurEmail, setBlurEmail] = useState(true);
  const [blurUsername, setBlurUsername] = useState(true);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const avatarRef = useRef(null);
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    else if (!checkIfImage(files[0])) {
      return toast.warn("Oh you can just upload an image !", {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
        position: "bottom-right",
      });
    }
    const preview = URL.createObjectURL(files[0]);
    setPreviewImage(preview);
    setAvatar(files[0]);
  };
  const deleteAvatar = () => {
    setAvatar(null);
    setPreviewImage("");
    avatarRef.current.value = "";
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.get(APIconfig.sendEmailVerification);
      toast.success(response.data.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  const CancelHandler = (e) => {
    e.preventDefault();
    setUsername(userData.username);
    setEmail(userData.email);
    setAvatar(userData.avatar);
  };
  const SaveHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      if (username !== userData.username) {
        formData.append("username", username);
      }
      if (email !== userData.email) {
        formData.append("email", email);
      }
      if (avatar !== userData.avatar) {
        formData.append("avatar", avatar);
      }
      const response = await instance.post(APIconfig.editUser, formData);
      setUserData((e) => {
        return { ...e, ...response.data.data };
      });
      toast.info("information changed", {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.response?.data?.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="mx-5">
      <form className="space-y-5" onSubmit={SaveHandler}>
        <div className="relative">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <div>
                <Avatar
                  src={avatar instanceof Object ? previewImage : avatar}
                  sx={{ width: 80, height: 80 }}
                />
              </div>
              <div className="w-2 h-2 p-3 bg-black rounded-full border-2 border-white flex justify-center items-center absolute top-0 right-0">
                <i
                  className={`${
                    userData.typeOfLogin === "google"
                      ? "fa-brands fa-google"
                      : "fa-solid fa-at"
                  }`}
                />
              </div>
            </div>
            <div className="lg:w-[310px] w-full space-y-2">
              <div>
                <input
                  type="file"
                  ref={avatarRef}
                  hidden
                  id="file"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  className="flex bg-black w-full p-2 rounded-full justify-center items-center  cursor-pointer">
                  <div className="w-8">
                    <ModeEditRoundedIcon />
                  </div>
                  <div>Edit Avatar</div>
                </label>
              </div>
              <div>
                <div
                  className="flex bg-red-500 w-full p-2 rounded-full justify-center items-center cursor-pointer"
                  onClick={deleteAvatar}>
                  <div className="w-8 ml-4">
                    <DeleteIcon />
                  </div>
                  <div>Delete Avatar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 w-full space-y-4 mt-3">
          <div className="relative">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              readOnly={blurUsername}
              ref={usernameRef}
            />
            <div
              className="absolute top-2/4 right-2 -translate-y-2/4 cursor-pointer hover:text-gray-300"
              onClick={() => {
                setBlurUsername((e) => !e);
                usernameRef.current.focus();
              }}>
              {blurUsername ? (
                <ModeEditRoundedIcon fontSize="large" />
              ) : (
                <EditOffRoundedIcon fontSize="large" className="text-red-500" />
              )}
            </div>
          </div>
          <div className="w-full relative">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={userData.typeOfLogin === "google" ? true : blurEmail}
              ref={emailRef}
            />
            <div
              className="absolute top-2/4 right-2 -translate-y-2/4 cursor-pointer hover:text-gray-300"
              onClick={() => {
                setBlurEmail((e) => !e);
                emailRef.current.focus();
              }}>
              {userData.typeOfLogin === "google" ? (
                <ModeEditRoundedIcon fontSize="large" />
              ) : blurEmail ? (
                <ModeEditRoundedIcon fontSize="large" />
              ) : (
                <EditOffRoundedIcon fontSize="large" className="text-red-500" />
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {!userData.isVerified && (
              <div>
                <Button
                  text={"Verify Email"}
                  styles={
                    "text-black bg-orange-500 hover:bg-orange-600 text-white"
                  }
                  onClickHandler={sendEmail}
                />
              </div>
            )}
            <div>
              <Button
                text={"Cancel"}
                styles={"text-black bg-gray-600 hover:bg-gray-700"}
                onClickHandler={CancelHandler}
              />
            </div>
            <div>
              <Button
                text={"Save"}
                styles={
                  "text-black bg-green-600 hover:bg-green-700 cursor-pointer"
                }
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformations;
