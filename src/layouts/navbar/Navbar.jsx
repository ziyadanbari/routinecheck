import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo2.png";
import { UserContext } from "../../context/userContext";
export default function Navbar() {
  const [display, setDisplay] = React.useState(false);
  const { userData } = React.useContext(UserContext);
  return (
    <div className="relative -top-[140px] animate-navbar">
      <div className="flex justify-between sm:px-20 px-5 py-8 text-white items-center">
        <div>
          <div className="text-3xl font-bold text-blue-100">
            <img src={Logo} className="w-44" />
          </div>
        </div>
        <div className="sm:block hidden">
          <div>
            <ul className="flex  items-center space-x-5 font-semibold text-xl tracking-wide">
              {!userData.islogin ? (
                <>
                  <NavLink to={"/login"}>
                    <li>Login</li>
                  </NavLink>
                  <NavLink
                    to={"/register"}
                    className="bg-blue-500 px-4 py-2 rounded-full"
                  >
                    <li>Register</li>
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to={"/dashboard"}
                  className="bg-blue-500 px-4 py-2 rounded-full"
                >
                  <li>Dashboard</li>
                </NavLink>
              )}
            </ul>
          </div>
        </div>
        <div className="sm:hidden block">
          <div>
            <div className="relative">
              <div
                className={display ? "burger x" : "burger"}
                onClick={(e) => setDisplay((e) => !e)}
              >
                <span className="slide1"></span>
                <span className="slide2"></span>
                <span className="slide3"></span>
              </div>
              <div
                className="absolute right-2/4 top-10"
                style={{
                  display: display ? "block" : "none",
                }}
              >
                <div className=" menu bg-[rgba(255,255,255,.25)] rounded-md p-2 font-semibold tracking-wide space-y-1">
                  {!userData.islogin ? (
                    <>
                      <NavLink
                        to={"/login"}
                        className="flex items-center hover:bg-[rgba(0,0,0,.4)] w-28 px-2 py-1 rounded"
                      >
                        <div className="w-6">
                          <i className="fa-solid fa-right-to-bracket" />
                        </div>
                        <div>Login</div>
                      </NavLink>
                      <NavLink
                        to={"/register"}
                        className="flex items-center hover:bg-[rgba(0,0,0,.4)] w-28 px-2 py-1 rounded"
                      >
                        <div className="w-6">
                          <i className="fa-solid fa-door-open" />
                        </div>
                        <div>Register</div>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to={"/dashboard"}
                        className="flex items-center hover:bg-[rgba(0,0,0,.4)] w-28 pl-2 pr-32 py-1 rounded space-x-2"
                      >
                        <div className="">
                          <i className="fa-regular fa-circle-user fa-lg"></i>
                        </div>
                        <div>Dashboard</div>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
