import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../config/axios/Axios";
import { APIconfig } from "../../config/api/API";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Logo from "../../assets/logo2.png";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await instance.post(APIconfig.resetPassword, {
          token,
        });
        toast.info(response.data.message, {
          theme: "dark",
          autoClose: 1500,
          hideProgressBar: true,
        });
      } catch (error) {
        toast.error(error.response?.data.message, {
          theme: "dark",
          autoClose: 1500,
          hideProgressBar: true,
        });
        setTimeout(() => {
          location.pathname = "/";
        }, 1500);
      }
    };
    validateToken();
  }, [token]);

  const handleForm = () => {
    if (!newPassword) throw "please enter a password";
    else if (!confirmPassword) throw "please confirm your password";
    else if (newPassword.length < 8)
      throw "the password must be at least 8 charachters";
    else if (newPassword !== confirmPassword)
      throw "the password doesn't matched";
    return true;
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      handleForm();
      const response = await instance.post(APIconfig.resetPassword, {
        token,
        newPassword,
        confirmPassword,
      });
      toast.success(response.data?.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
      setTimeout(() => {
        location.pathname = "/login";
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || error, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={resetPassword}
        className="bg-[#5252699c] rounded md:px-10 px-2 py-5 w-[420px] mx-3 flex flex-col justify-center items-center space-y-2">
        <div>
          <img src={Logo} className="w-44" />
        </div>
        <div className="text-lg text-white text-center font-semibold tracking-wide">
          <span>Whoopy! You can now change your password.</span>
        </div>
        <div className="w-full space-y-2 text-white">
          <div className="w-full">
            <Input
              placeholder={"Enter a new password"}
              type={"password"}
              styles={"w-full"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Input
              placeholder={"Confirm the new password"}
              styles={"w-full"}
              type={"password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full text-white font-semibold text-lg">
          <button className="w-full">
            <div className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600">
              Change Password
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
