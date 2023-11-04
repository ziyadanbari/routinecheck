import React from "react";

export default function Loading() {
  return (
    <div className="loading-container w-screen h-screen flex justify-center items-center">
      <div className="absolute left-0 top-0 bg-[rgba(0,0,0,.4)] w-screen h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    </div>
  );
}
