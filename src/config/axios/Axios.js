import axios from "axios";
import { APIconfig } from "../api/API";
import Cookies from "universal-cookie";

const token = new Cookies().get("routinechecksessiontoken");
const instance = axios.create({
  baseURL: APIconfig.baseURL,
  headers: {
    Authorization: token,
  },
});
export { instance };
