import React from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import Button from "../Button";
import CloseIcon from "@mui/icons-material/Close";
import { instance } from "../../config/axios/Axios";
import { toast } from "react-toastify";
import { APIconfig } from "../../config/api/API";
import { DRContext } from "../../context/DRContext";

export default function AddDR({ cancelClickHandler }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [time, setTime] = React.useState("");
  const { routines, setRoutines } = React.useContext(DRContext);
  const timeRef = React.useRef(null);
  const formHandling = async () => {
    try {
      if (!title) throw "Please enter a title for your routine";
      else if (!time) throw "Please pick a time for your routine";
      else {
        addDr();
      }
    } catch (message) {
      toast.error(message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  const addDr = async () => {
    const [hours, minutes] = time.split(":").map((num) => parseInt(num, 10));
    const today = new Date();
    const processedTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes
    ).toLocaleString();
    try {
      const routine = {
        title,
        desc: description,
        time: processedTime,
      };
      const response = await instance.post(APIconfig.addDR, {
        routine,
      });
      setRoutines(response.data.routine);
      cancelClickHandler();
      toast.success("Routine Added", {
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
    <div className="absolute w-screen h-screen bg-[rgba(0,0,0,.3)] left-0 flex justify-center items-center backdrop-blur-sm top-0 z-50">
      <div className="bg-[rgba(90,90,90,.4)] sm:px-10 w-[500px] px-4 py-5 rounded space-y-2 m-5">
        <div className="flex justify-end">
          <div
            onClick={cancelClickHandler}
            className=" cursor-pointer hover:bg-gray-700 rounded-full flex justify-center items-center p-1 text-white"
          >
            <CloseIcon />
          </div>
        </div>
        <div className="space-y-2">
          <form onSubmit={formHandling}>
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
                  onClickHandler={formHandling}
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
