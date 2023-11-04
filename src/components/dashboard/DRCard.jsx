/* eslint-disable react/prop-types */
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { instance } from "../../config/axios/Axios";
import { APIconfig } from "../../config/api/API";
import EditDR from "./EditDR";
import { toast } from "react-toastify";
export default function DRCard({
  title,
  description,
  time,
  deleteHandler,
  completed,
  passed,
  completeHandler,
}) {
  const [showEditDR, setShowEditDR] = React.useState(false);
  const convertTime = (ms) => {
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}:${minutes === 0 ? "00" : minutes}`;
  };
  const removeDR = async () => {
    try {
      const response = await instance.post(APIconfig.rmDR, { title });
      deleteHandler(response.data.routine);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  const completeDR = async (action) => {
    try {
      const response = await instance.post(APIconfig.completeDR, {
        title,
        action,
      });
      completeHandler(response.data.routine);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  time = convertTime(time);
  return (
    <>
      {showEditDR && (
        <EditDR
          cancelClickHandler={() => {
            setShowEditDR(false);
          }}
          defaultTitle={title}
          defaultDesc={description}
          defaultTime={time}
        />
      )}
      <div className="bg-[rgba(0,0,0,.4)] rounded  pr-5 pl-2 w-full py-3 mt-4">
        <div className="flex  items-start justify-between mb-4">
          <div className="flex">
            <div>
              <Checkbox
                color="success"
                sx={{ color: "white", padding: "9px", marginTop: "-6px" }}
                checked={completed}
                disableRipple
                onChange={(e) => completeDR(e.target.checked)}
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
                onClick={removeDR}
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
            } rounded inline-block`}
          >
            <span>{time}</span>
          </div>
        </div>
      </div>
    </>
  );
}
