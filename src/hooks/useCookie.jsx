import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useCookie = (name, initialValue) => {
  const cookie = new Cookies();
  const [value, setValue] = useState(initialValue || cookie.get(name) || "");

  useEffect(() => {
    if (!value) {
      cookie.remove(name);
      return;
    }
    cookie.set(name, value, { secure: true, sameSite: "none" });
  }, [initialValue, value]);

  const setCookie = (value) => {
    setValue(value);
    return value;
  };
  const deleteCookie = () => {
    setValue(undefined);
    return true;
  };
  return [value, setCookie, deleteCookie];
};

export default useCookie;
