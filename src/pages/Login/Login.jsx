/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-useless-catch */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/logo2.png";
import GoogleAuth from "../../components/GoogleAuth";
import Input from "../../components/Input";
import { APIconfig } from "../../config/api/API";
import { instance } from "../../config/axios/Axios";
import { FormValidation } from "../../functions/FormValidation";
import Loading from "../../components/Loading";
import useCookie from "../../hooks/useCookie";
import PasswordReset from "../../components/PasswordReset";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [value, setCookie, removeCookie] = useCookie(
    "routinechecksessiontoken"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = { email, password };
      FormValidation(form, false, false);
      await loginUser(form);
    } catch (err) {
      toast.error(err, {
        theme: "dark",
        hideProgressBar: true,
        autoClose: 1500,
      });
    }
  };
  const loginUser = async ({ email, password }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await instance.post(APIconfig.login, formData);
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
        autoClose: 1500,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen login flex justify-center items-center text-white">
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
                <span>Login in</span>
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
                      placeholder={"Email or Username..."}
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
                    <div className="space-y-2">
                      <button className="w-full">
                        <div className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600">
                          Login
                        </div>
                      </button>
                      <div className="flex">
                        <PasswordReset text={"Forgot your password ?"} />
                      </div>
                    </div>
                    <div>
                      <span className="inline-block w-full h-px bg-gray-500"></span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div>
                      <GoogleAuth
                        operationType="loginose"
                        onSubmitHandler={setLoading}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="mt-3 underline text-blue-300 hover:no-underline">
                <NavLink to={"/register"}>Don't Have an Account?</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
