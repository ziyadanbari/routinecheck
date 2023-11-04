import React, { useState } from "react";
import Input from "../../components/Input";
import Logo from "../../assets/logo2.png";
import { toast } from "react-toastify";
import { instance } from "../../config/axios/Axios";
import { APIconfig } from "../../config/api/API";
export default function SendPasswordResetToken() {
  const [email, setEmail] = useState("");
  const sendPasswordResetToken = async () => {
    try {
      if (!email) throw "Please enter your email";
      const response = await instance.post(APIconfig.sendPasswordResetToken, {
        email,
      });
      console.log(response);
      toast.success(response.data?.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    } catch (error) {
      error instanceof Object && console.log(error);
      toast.error(
        error.response?.data.message || error || "Internal server error",
        {
          theme: "dark",
          autoClose: 1500,
          hideProgressBar: true,
        }
      );
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#5252699c] rounded md:px-10 px-2 py-5 w-[420px] mx-3 flex flex-col justify-center items-center space-y-2">
        <div>
          <img src={Logo} className="w-44" />
        </div>
        <div className="text-lg text-white text-center font-semibold tracking-wide">
          <span>
            Enter your email or username to send you an email containe the reset
            token
          </span>
        </div>
        <div className="w-full">
          <Input
            placeholder={"Enter account email or username"}
            styles={"w-full"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full text-white font-semibold text-lg">
          <button className="w-full" onClick={sendPasswordResetToken}>
            <div className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600">
              Send Email
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
