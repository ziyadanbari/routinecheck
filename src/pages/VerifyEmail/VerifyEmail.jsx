import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { instance } from "../../config/axios/Axios";
import { APIconfig } from "../../config/api/API";
import Loading from "../../components/Loading";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(UserContext);
  const { token } = useParams();
  useEffect(() => {
    if (userData.isVerified) setLoading(false);
    async function submitToken() {
      try {
        const response = await instance.post(APIconfig.TokenEmailVerification, {
          token,
        });
        toast.success(response.data.message, {
          theme: "dark",
          autoClose: 1500,
          hideProgressBar: true,
        });
      } catch (err) {
        toast.error(err.response.data.message, {
          theme: "dark",
          autoClose: 1500,
          hideProgressBar: true,
        });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1300);
      }
    }
    submitToken();
  }, [token, userData]);
  return loading ? <Loading /> : (location.pathname = "/dashboard");
}
