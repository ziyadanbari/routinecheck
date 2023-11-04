/* eslint-disable no-useless-catch */
import Avatar from "@mui/material/Avatar";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Logo from "../../assets/logo2.png";
import GoogleAuth from "../../components/GoogleAuth";
import Input from "../../components/Input";
import { checkIfImage } from "../../functions/CheckIfImage";
import { FormValidation } from "../../functions/FormValidation";
import ImageUpload from "../../layouts/Register/ImageUpload";
import { instance } from "../../config/axios/Axios";
import { APIconfig } from "../../config/api/API";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading";
import Badge from "@mui/material/Badge";
import CancelIcon from "@mui/icons-material/Cancel";
import useCookie from "../../hooks/useCookie";
export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setCookie, removeCookie] = useCookie(
    "routinechecksessiontoken"
  );
  const avatarRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = { username, email, password };
      FormValidation(form);
      await registerUser(form);
    } catch (err) {
      toast.error(err, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 1500,
      });
    }
  };
  const registerUser = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);
      const response = await instance.post(APIconfig.register, formData);
      setCookie(response.data.token);
      toast.success(response.data?.message || "Welcome !!", {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
      setTimeout(() => {
        location.pathname = "/";
      }, 1500);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen register  flex justify-center items-center text-white">
      {loading && (
        <div className="absolute z-50">
          <Loading />
        </div>
      )}
      <div className="mx-5">
        <div className="container w-[340px] bg-gradient-146 p-5 from-[#ffffff26] to-[#d3cccc47] rounded-md text-center space-y-5">
          <div className="space-x-2 flex justify-center items-center">
            <div className="font-semibold text-2xl  tracking-wide flex items-center space-x-2">
              <div className="">
                <span>Register in</span>
              </div>
              <div className="h-full mt-[6px]">
                <img src={Logo} className="w-[130px] h-full" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <div>
                    <Input
                      placeholder={"Name..."}
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder={"Email..."}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder={"Password..."}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <div>
                    <div className="flex w-full items-center space-x-4">
                      <div>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            avatar && (
                              <div
                                onClick={() => {
                                  setAvatar(null);
                                  avatarRef.current.value = "";
                                }}>
                                <CancelIcon
                                  fontSize="medium"
                                  htmlColor="red"
                                  className="bg-black rounded-full cursor-pointer"
                                />
                              </div>
                            )
                          }>
                          <Avatar
                            src={previewImage}
                            sx={{ width: 64, height: 64 }}
                          />
                        </Badge>
                      </div>
                      <div className="w-full">
                        <div>
                          <ImageUpload
                            inputRef={avatarRef}
                            avatar={avatar}
                            onChange={(e) => {
                              if (e.target.files.length !== 0)
                                if (checkIfImage(e.target.files[0]))
                                  setAvatar(e.target.files[0]);
                                else
                                  toast.warn(
                                    "Ohh you can just upload an image",
                                    {
                                      theme: "dark",
                                      autoClose: 1500,
                                      hideProgressBar: true,
                                    }
                                  );
                            }}
                            setPreviewImage={setPreviewImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="w-full">
                      <div className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600">
                        Register
                      </div>
                    </button>
                    <div>
                      <span className="inline-block w-full h-px bg-gray-500"></span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div>
                      <GoogleAuth
                        operationType="register"
                        onSubmitHandler={setLoading}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="mt-3 underline text-blue-300 hover:no-underline">
                <NavLink to={"/login"}>Already Have an Account?</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
