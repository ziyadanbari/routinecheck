import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import Navbar from "../../layouts/Dashboard/Navbar";
import Sidebar from "../../layouts/Dashboard/Sidebar";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { instance } from "../../config/axios/Axios";
import { toast } from "react-toastify";
import { APIconfig } from "../../config/api/API";

export default function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);
  const user = useOutletContext();
  const navigate = useNavigate();
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      console.log("hi");
      const response = await instance.get(APIconfig.sendEmailVerification);
      toast.success(response.data.message, {
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
  useEffect(() => {
    if (
      window.location.pathname === "/dashboard" ||
      window.location.pathname === "/dashboard/"
    ) {
      navigate("dailyroutine");
    }
  }, [navigate]);
  return (
    <div className="dashboard">
      {!user.isVerified && showAlert && (
        <div className=" bg-orange-500 text-white w-full z-50 relative top-0 left-0 h-[36px] flex items-center justify-center">
          <div className="fixed font-semibold capitalize space-x-5 md:text-base text-sm">
            <span>Verify your email to enable email notifications. </span>
            <span className="inline-flex justify-center items-center">
              <button
                className="px-2 rounded-md border-2 border-white hover:bg-[#6f6f6f66]"
                onClick={sendEmail}>
                Verify email
              </button>
            </span>
          </div>
          <div
            className=" cursor-pointer hover:bg-[rgba(0,0,0,.2)] rounded-full flex justify-center items-center p-1 text-white absolute right-0 mx-5"
            onClick={() => setShowAlert(false)}>
            <CloseIcon />
          </div>
        </div>
      )}
      <div className=" flex">
        <div className="md:h-full md:mr-44 h-10">
          <Sidebar page={location.pathname.split("/")} />
        </div>
        <div className="flex w-full flex-col  items-center">
          <div className="w-full">
            <Navbar user={user} />
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
