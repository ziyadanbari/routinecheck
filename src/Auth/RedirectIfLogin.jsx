/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { instance } from "../config/axios/Axios";
import { APIconfig } from "../config/api/API";
import Loading from "../components/Loading";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
export default function RedirectIfLogin() {
  const [loading, setLoading] = React.useState(true);
  const [redirect, setRedirect] = React.useState(false);
  const { userData } = React.useContext(UserContext);
  useEffect(() => {
    async function checkAuthorization() {
      if (userData.islogin) setRedirect(true);
      setLoading(false);
    }
    checkAuthorization();
  }, [userData]);
  return loading ? (
    <Loading />
  ) : redirect ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Outlet />
  );
}
