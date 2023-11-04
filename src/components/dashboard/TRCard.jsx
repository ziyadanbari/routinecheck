/* eslint-disable react/prop-types */
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { APIconfig } from "../../config/api/API";
import { instance } from "../../config/axios/Axios";
import EditTR from "./EditTR";
import { ToastContainer } from "react-toastify";
export default function TRCard({
  title,
  description,
  time,
  deleteHandler,
  completed,
  passed,
  completeHandler,
  id,
}) {
  const [showEditDR, setShowEditDR] = React.useState(false);
  const convertTime = (ms) => {
    const date = new Date(ms);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  time = convertTime(time);
  const removeTR = async () => {
    try {
      const response = await instance.post(APIconfig.rmTR, { _id: id });
      deleteHandler(response.data.routine);
    } catch (error) {
      ToastContainer.error(error.response.data.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  const completeTR = async (action) => {
    try {
      const response = await instance.post(APIconfig.completeTR, {
        _id: id,
        action,
      });
      completeHandler(response.data.routine);
    } catch (error) {
      ToastContainer.error(error.response.data.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  return (
    <>
      {showEditDR && (
        <EditTR
          cancelClickHandler={() => {
            setShowEditDR(false);
          }}
          defaultTitle={title}
          defaultDesc={description}
          defaultTime={time}
          id={id}
        />
      )}
      <div className="bg-[rgba(0,0,0,.4)] rounded  pr-5 pl-2 w-full py-3  mt-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex">
            <div>
              <Checkbox
                color="success"
                sx={{ color: "white", padding: "9px", marginTop: "-6px" }}
                checked={completed}
                disableRipple
                onChange={(e) => completeTR(e.target.checked)}
              />
            </div>
            <div className="">
              <div className="text-xl capitalize font-semibold tracking-wider">
                {title}
              </div>
              <div className="text-base text-gray-300">{description}</div>
            </div>
          </div>
          <div className="pl-5 space-y-2">
            <div className="flex justify-center flex-col items-end space-y-2">
              <div
                className=" text-[rgb(191,59,59)] hover:text-[rgb(165,62,62)] cursor-pointer"
                onClick={removeTR}
              >
                <DeleteForeverIcon />
              </div>
              <div
                className="cursor-pointer hover:text-gray-300"
                onClick={() => setShowEditDR(true)}
              >
                <EditRoundedIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div
            className={`px-2 ${
              passed ? "bg-red-800" : "bg-gray-600"
            } rounded inline-block py-1`}
          >
            <span>{time}</span>
          </div>
        </div>
      </div>
    </>
  );
}
