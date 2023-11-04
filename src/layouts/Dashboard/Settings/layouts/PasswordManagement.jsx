import { useContext, useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { toast } from "react-toastify";
import { instance } from "../../../../config/axios/Axios";
import { APIconfig } from "../../../../config/api/API";
import { useNavigate } from "react-router-dom";
import PasswordReset from "../../../../components/PasswordReset";
import { UserContext } from "../../../../context/userContext";
export default function PasswordManagement() {
  const { userData } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const FormCheck = () => {
    if (!password || !newPassword || !passwordConfirm) throw "Fields Required";
    else if (newPassword < 8)
      throw "The password must be at least 8 charachteres";
    else if (newPassword !== passwordConfirm)
      throw "The password doesn't match";
    return true;
  };
  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      const formValidation = FormCheck();
      if (!formValidation) throw "Something in form is invalid !";
      const response = await instance.post(APIconfig.passwordchange, {
        password,
        newPassword,
        passwordConfirm,
      });
      toast.success(response.data.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || error || "Something went wrong",
        {
          theme: "dark",
          autoClose: 1500,
          hideProgressBar: true,
        }
      );
    }
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/dashboard/settings");
  };
  return (
    <div>
      <div className="space-y-3">
        <div className="md:text-lg capitalize tracking-wide text-sm">
          You can change your password or reset it
        </div>
        <div>
          <form className="space-y-2" onSubmit={saveHandler}>
            <div>
              <Input
                type="password"
                placeholder="Enter The Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Enter A New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Repeat The Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="text-lg tracking-wide">
                  <PasswordReset
                    text={"Forgot Password ?"}
                    email={userData.email}
                  />
                </div>
                <div className="flex space-x-2">
                  <div>
                    <Button
                      text={"Cancel"}
                      styles={"text-black bg-gray-600 hover:bg-gray-700"}
                      onClickHandler={cancelHandler}
                    />
                  </div>
                  <div>
                    <Button
                      text={"Save"}
                      styles={
                        "text-black bg-green-600 hover:bg-green-700 cursor-pointer"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
