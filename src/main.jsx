/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "@emotion/styled";
import MyUserContext from "./context/userContext.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./css/index.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { MyDRContext } from "./context/DRContext.jsx";
import { MyTRContext } from "./context/TRContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <MyUserContext>
      <MyDRContext>
        <MyTRContext>
          <App />
          <ToastContainer />
        </MyTRContext>
      </MyDRContext>
    </MyUserContext>
  </BrowserRouter>
);
