import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import useCatchUser from "../hooks/useCatchUser";
export default function CheckAuth() {
  const loading = useCatchUser();
  return loading ? <Loading /> : <Outlet />;
}
