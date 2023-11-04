/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function CheckIfNotGoogle({ CustomComponent }) {
  const { userData, SetUserData } = useContext(UserContext);
  const [component, setComponent] = useState(null);
  useEffect(() => {
    if (userData.islogin && userData.typeOfLogin === "google") {
      setComponent(CustomComponent);
    } else {
      setComponent(<Outlet />);
    }
  }, [SetUserData, userData, setComponent]);
  return component;
}
