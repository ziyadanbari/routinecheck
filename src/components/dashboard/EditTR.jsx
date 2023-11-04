/* eslint-disable react/prop-types */
import React from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import Button from "../Button";
import CloseIcon from "@mui/icons-material/Close";
import { instance } from "../../config/axios/Axios";
import { toast } from "react-toastify";
import { APIconfig } from "../../config/api/API";
import { DRContext } from "../../context/DRContext";
import { TRContext } from "../../context/TRContext";

export default function EditTR({
  cancelClickHandler,
  defaultTitle,
  defaultDesc,
  defaultTime,
  id,
}) {
  const { routines, setRoutines } = React.useContext(TRContext);
  const [title, setTitle] = React.useState(defaultTitle);
  const [description, setDescription] = React.useState(
    defaultDesc.toLowerCase() !== "no description" ? defaultDesc : ""
  );
  const [date, setDate] = React.useState(defaultTime.split(" ")[0]);
  const [time, setTime] = React.useState(defaultTime.split(" ")[1]);
  const timeRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const editDr = async () => {
    const processedTime = new Date(date);
    const [hours, minutes] = time.split(":");
    processedTime.setHours(parseInt(hours));
    processedTime.setMinutes(parseInt(minutes));
    try {
      const routine = {
        _id: id,
        newTitle: title,
        newDesc: description,
        newTime: processedTime,
      };
      const response = await instance.post(APIconfig.editTR, {
        ...routine,
      });
      setRoutines(response.data.routine);
      cancelClickHandler();
      toast.success("Routine Changed", {
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

  return (
    <div className="absolute w-screen h-screen bg-[rgba(0,0,0,.3)] left-0 flex justify-center items-center backdrop-blur-sm -top-0 z-50">
      <div className="bg-[rgba(90,90,90,.4)] sm:px-10 w-[500px] px-4 py-5 rounded space-y-2 m-5">
        <div className="flex justify-end">
          <div
            onClick={cancelClickHandler}
            className=" cursor-pointer hover:bg-gray-700 rounded-full flex justify-center items-center p-1 text-white">
            <CloseIcon />
          </div>
        </div>
        <div className="space-y-2">
          <form onSubmit={editDr}>
            <div className="space-y-2">
              <div>
                <Input
                  placeholder={"Title..."}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder={"Description..."}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  onClick={() => dateRef.current.showPicker()}
                  ref={dateRef}
                  value={date.replaceAll("/", "-")}
                />
              </div>
              <div>
                <Input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  onClick={() => timeRef.current.showPicker()}
                  ref={timeRef}
                  value={time}
                />
              </div>
            </div>
          </form>
          <div className="flex justify-end">
            <div className="flex space-x-3">
              <div>
                <Button
                  text={"Cancel"}
                  onClickHandler={cancelClickHandler}
                  styles={" hover:bg-gray-600 text-white"}
                />
              </div>
              <div>
                <Button
                  text={"Save"}
                  onClickHandler={editDr}
                  styles={"text-black bg-green-600 hover:bg-green-700"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
