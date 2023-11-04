import React, { useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { instance } from "../config/axios/Axios";
import { APIconfig } from "../config/api/API";

export default function useCatchUser() {
  const [loading, setLoading] = useState(true);
  const { setUserData } = React.useContext(UserContext);
  useEffect(() => {
    async function getAuth() {
      try {
        const {
          data: { data },
        } = await instance.get(APIconfig.getme);
        setUserData({ ...data, islogin: true });
      } catch (err) {
        setUserData((e) => {
          return { ...e, islogin: false };
        });
      } finally {
        setLoading(false);
      }
    }
    getAuth();
  }, [setUserData]);
  return loading;
}