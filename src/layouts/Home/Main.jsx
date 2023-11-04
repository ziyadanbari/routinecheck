import React from "react";
import { NavLink } from "react-router-dom";

export default function Main() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-140px)] text-center w-screen">
      <div className="space-y-3">
        <div className=" overflow-hidden">
          <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300 font-bold tracking-wide relative top-[42px] animate-texthome">
            <div>MANAGE YOUR TIME</div>
          </div>
        </div>
        <div className="inline-block overflow-hidden">
          <div className="right-[80%] relative inline-block animate-smalltxt">
            <div className="text-xl capitalize tracking-wider">
              <div>
                with <b>ROCHECK</b>
              </div>
            </div>
          </div>
          <div className="relative top-28 animate-desc space-y-2">
            <div className=" capitalize font-semibold text-lg tracking-wider">
              <div>get daily, monthly, timed routine</div>
            </div>
            <div>
              <div className="">
                <NavLink
                  to={"/register"}
                  className={
                    " bg-blue-600 text-center inline-block w-full py-2 rounded-full text-lg font-semibold tracking-wider hover:bg-blue-700"
                  }>
                  <button className="capitalize">get started</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
