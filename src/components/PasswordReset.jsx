import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../config/axios/Axios";
import { APIconfig } from "../config/api/API";
import { toast } from "react-toastify";

export default function PasswordReset({ text, styles, email }) {
  const navigate = useNavigate();
  const sendPasswordResetToken = async () => {
    try {
      const response = await instance.post(APIconfig.sendPasswordResetToken, {
        email,
      });
      console.log(response);
      toast.success(response.data?.message, {
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.message || "Internal server error", {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  return (
    <div>
      <div
        className={`text-blue-400 font-semibold underline hover:no-underline cursor-pointer ${styles}`}
        onClick={() =>
          !email
            ? navigate("/sendpasswordresettoken")
            : sendPasswordResetToken()
        }>
        <span>{text}</span>
      </div>
    </div>
  );
}
