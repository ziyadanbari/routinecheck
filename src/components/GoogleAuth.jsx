import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authentication } from "../config/firebase/config";
import CryptoJS from "crypto-js";
import { instance } from "../config/axios/Axios";
import { APIconfig } from "../config/api/API";
import { toast } from "react-toastify";
import useCookie from "../hooks/useCookie";
export default function GoogleAuth({ operationType, onSubmitHandler }) {
  const [type, setType] = useState("");
  const [value, setCookie, removeCookie] = useCookie(
    "routinechecksessiontoken"
  );
  useEffect(() => {
    function getType() {
      if (operationType === "register") {
        const randomBytes = CryptoJS.lib.WordArray.random(30);
        return btoa(`${randomBytes.toString(CryptoJS.enc.Hex)}register`);
      } else if (operationType === "loginose") {
        const randomBytes = CryptoJS.lib.WordArray.random(30);
        return btoa(`${randomBytes.toString(CryptoJS.enc.Hex)}loginose`);
      }
    }
    setType(getType());
  }, [operationType]);

  const googleLogin = async (userData) => {
    const {
      displayName: username,
      email,
      photoUrl: avatar,
      idToken: token,
    } = userData._tokenResponse;
    try {
      onSubmitHandler(true);
      const response = await instance.post(APIconfig.googleAuth, {
        username,
        email,
        avatar,
        token,
        type,
      });
      setCookie(response.data.token);
      toast.success(response.data.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
      setTimeout(() => {
        location.pathname = "/";
      }, 1500);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    } finally {
      onSubmitHandler(false);
    }
  };

  const googlePopup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(authentication, provider);
      googleLogin(result);
    } catch (err) {
      toast.error(
        String(err).includes("auth/popup-blocked")
          ? "Please Enable popup in your browser"
          : "Something went wrong !",
        {
          theme: "dark",
          autoClose: 1500,
          hideProgressBar: true,
        }
      );
    }
  };

  return (
    <div>
      <div
        className="bg-[rgba(255,255,255)] flex justify-center items-center cursor-pointer px-2 py-1 space-x-2 rounded-sm shadow-[3px_3px_0_0_#1e1e1e] transition-all duration-300 text-black font-semibold border-2 border-[#1e1e1e] oauth"
        onClick={googlePopup}>
        <div>
          <svg
            className="icon"
            viewBox="0 0 24 24"
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"></path>
            <path d="M1 1h22v22H1z" fill="none"></path>
          </svg>
        </div>
        <div>
          <span>Continue With Google</span>
        </div>
      </div>
    </div>
  );
}
