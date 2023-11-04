import React, { useState } from "react";
import PropTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { instance } from "../../config/axios/Axios";
import { APIconfig } from "../../config/api/API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useCookie from "../../hooks/useCookie";
import Loading from "../Loading";
function Option({ Icon, styles, title, onClick }) {
  return (
    <div
      className={`bg-[#eee] rounded-full py-1 font-semibold text-lg ${styles} hover:bg-[#dbdbdb]`}
      onClick={onClick}>
      <button className="w-full flex justify-center items-center space-x-2 transition-all duration-200">
        <div>{Icon}</div>
        <div>{title}</div>
      </button>
    </div>
  );
}

export default function PorfileCard({ user }) {
  const navigate = useNavigate();
  const [value, setCookie, removeCookie] = useCookie(
    "routinechecksessiontoken"
  );
  const LogoutHandling = async () => {
    try {
      toast.loading("log out!", {
        theme: "dark",
        hideProgressBar: true,
        position: "bottom-right",
      });
      const response = await instance.post(APIconfig.logout);
      toast.success(response.data?.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
        position: "bottom-right",
      });
      removeCookie();
      setTimeout(() => {
        location.pathname = "/";
      }, 1600);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  return (
    <div className="card">
      <div className="top-section">
        <div className="border" />
        <div className="icons">
          <div className="social-media">
            {user.typeOfLogin === "google" ? (
              <i className="fa-brands fa-google"></i>
            ) : (
              <i className="fa-solid fa-at"></i>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center h-full rounded flex-col">
          <div>
            <Avatar src={user.avatar} sx={{ width: 90, height: 90 }} />
          </div>
          <div className="text-lg font-semibold tracking-wider capitalize">
            @{user.username}
          </div>
        </div>
      </div>
      <div className="bottom-section space-y-2">
        <span className="title">{user.email}</span>
        <div className="space-y-2">
          <Option
            Icon={<i className="fa-sharp fa-solid fa-gear"></i>}
            title={"Settings"}
            onClick={() => navigate("settings")}
          />
          <Option
            Icon={<LogoutIcon />}
            title={"Logout"}
            styles={"text-red-600"}
            onClick={LogoutHandling}
          />
        </div>
      </div>
    </div>
  );
}

PorfileCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    typeOfLogin: PropTypes.string.isRequired,
  }).isRequired,
};
