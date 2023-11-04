/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RedirectIfNotLogin from "./Auth/RedirectIfNotLogin";
import CheckAuth from "./Auth/CheckAuth";
import RedirectIfLogin from "./Auth/RedirectIfLogin";
import Dailyroutine from "./layouts/Dashboard/Dailyroutine";
import Settings from "./layouts/Dashboard/Settings/Settings";
import TimedRoutine from "./layouts/Dashboard/TimedRoutine";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/errors/404";
import PasswordManagement from "./layouts/Dashboard/Settings/layouts/PasswordManagement";
import CheckIfNotGoogle from "./Auth/CheckIfNotGoogle";
import PersonalInformations from "./layouts/Dashboard/Settings/layouts/PersonalInformations";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import Notifications from "./layouts/Dashboard/Settings/layouts/Notifications";
import SendPasswordResetToken from "./pages/PasswordReset/SendPasswordResetToken";
import ResetPassword from "./pages/PasswordReset/ResetPassword";
function App() {
  return (
    <Routes>
      <Route element={<CheckAuth />}>
        <Route element={<RedirectIfLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RedirectIfNotLogin />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index path="dailyroutine" element={<Dailyroutine />} />
            <Route path="timedroutine" element={<TimedRoutine />} />
            <Route path="settings" element={<Settings />}>
              <Route
                path="personalinformations"
                element={<PersonalInformations />}
              />
              <Route
                element={
                  <CheckIfNotGoogle
                    CustomComponent={
                      <div>
                        You are registered with google <br /> Soo! maybe You
                        can't change your password &#128578;
                      </div>
                    }
                  />
                }>
                <Route
                  path="passwordmanagement"
                  element={<PasswordManagement />}
                />
              </Route>
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>
          <Route path="verifyemail/:token" element={<VerifyEmail />} />
        </Route>
        <Route
          element={
            <CheckIfNotGoogle CustomComponent={<Navigate to={"/"} />} />
          }>
          <Route
            path="/sendpasswordresettoken"
            element={<SendPasswordResetToken />}
          />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
