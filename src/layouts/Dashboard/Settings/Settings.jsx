import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useEffect } from "react";

export default function Settings() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      location.pathname === "/dashboard/settings" ||
      location.pathname === "/dashboard/settings/"
    ) {
      navigate("personalinformations");
    }
  }, [navigate]);
  return (
    <div className="text-white font-semibold flex mdlg:ml-20 md:ml-32 mx-5 mdlg:my-10 mdlg:space-x-4 space-y-2 mdlg:flex-row flex-col">
      <div className="">
        <SideBar page={location.pathname.split("/").slice(-1).join("")} />
      </div>
      <div className="mdlg:w-[2px] mdlg:h-auto w-full h-[2px] bg-[rgba(255,255,255,.3)]"></div>
      <div className="w-full mr-5">
        <Outlet />
      </div>
    </div>
  );
}
