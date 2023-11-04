import React, { useEffect } from "react";
import Main from "../../layouts/Home/Main";
import Navbar from "../../layouts/navbar/Navbar";

export default function Home() {
  return (
    <div className="text-white home">
      <Navbar />
      <Main />
    </div>
  );
}
