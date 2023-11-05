import React, { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { UserContext } from "../../../../context/userContext";
import { instance } from "../../../../config/axios/Axios";
import { APIconfig } from "../../../../config/api/API";
import Input from "../../../../components/Input";
import { toast } from "react-toastify";
import Button from "../../../../components/Button";
function Option({
  title,
  onSwitchChange,
  switchValue,
  icon,
  inputValue,
  onInputChange,
  placeholderInput,
}) {
  return (
    <div>
      <div className="capitalize space-x-4 bg-[rgba(90,90,90,.3)] my-4 p-2 rounded">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10">{icon}</div>
              <div>{title}</div>
            </div>
            <div>
              <Switch
                checked={JSON.parse(switchValue)}
                onChange={onSwitchChange}
              />
            </div>
          </div>
          <div>
            <Input
              type="text"
              value={inputValue}
              onChange={onInputChange}
              placeholder={placeholderInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Notifications() {
  const { userData, setUserData } = React.useContext(UserContext);
  const [emailNotification, setEmailNotification] = useState({
    ...userData.TONS.email,
    emailNotified: userData.TONS.email.emailNotified || "-",
  });
  const [whatsappNotification, setWhatsappNotification] = useState({
    ...userData.TONS.whatsapp,
    title: "whatsapp",
    numberNotified: `+${userData.TONS.whatsapp.numberNotified || ""}`,
  });
  const changeActiveEmail = async (e) => {
    try {
      const response = await instance.post(APIconfig.traitTON, {
        options: [{ activated: e.target.checked, title: "email" }],
      });
      setUserData((e) => {
        return { ...e, TONS: { ...response.data.TONS } };
      });
    } catch (err) {
      toast.error(err.response?.data?.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  const changeActiveWhatsapp = async (e) => {
    try {
      const response = await instance.post(APIconfig.traitTON, {
        options: [
          {
            title: "whatsapp",
            activated: e.target.checked,
          },
        ],
      });
      setUserData((e) => {
        return { ...e, TONS: response.data.TONS };
      });
    } catch (err) {
      toast.error(err.response?.data?.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(APIconfig.traitTON, {
        options: [
          {
            ...emailNotification,
            title: "email",
            notified: emailNotification.emailNotified,
            emailNotified: undefined,
          },
          {
            ...whatsappNotification,
            title: "whatsapp",
            notified: whatsappNotification.numberNotified,
            numberNotified: undefined,
          },
        ],
      });
      setUserData((e) => {
        return {
          ...e,
          TONS: response
            ? { ...response.data.TONS }
            : { ...response.data.TONS },
        };
      });
      toast.info("Changed", {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message, {
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };
  /* Hooks */
  useEffect(() => {
    setEmailNotification(userData.TONS.email);
    setWhatsappNotification({
      ...userData.TONS.whatsapp,
      numberNotified: `+${userData.TONS.whatsapp.numberNotified || ""}`,
    });
  }, [userData.TONS]);
  return (
    <form>
      <div className="space-y-4">
        <div className="text-xl bg-[rgba(0,0,0,.3)] px-8 py-2 rounded">
          <div>
            <Option
              icon={<i className="fa-regular fa-envelope fa-lg"></i>}
              title={"email"}
              inputValue={emailNotification.emailNotified}
              switchValue={emailNotification.activated || false}
              onSwitchChange={changeActiveEmail}
              onInputChange={(event) =>
                setEmailNotification((e) => {
                  return { ...e, emailNotified: event.target.value };
                })
              }
            />
          </div>
          <div>
            <Option
              icon={<i className="fa-brands fa-whatsapp fa-xl"></i>}
              inputValue={whatsappNotification.numberNotified}
              title={"whatsapp"}
              switchValue={whatsappNotification.activated || false}
              onSwitchChange={changeActiveWhatsapp}
              onInputChange={(event) => {
                setWhatsappNotification((e) => {
                  return { ...e, numberNotified: event.target.value };
                });
              }}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-5">
          <div>
            <Button
              text={"cancel"}
              onClickHandler={(e) => {
                e.preventDefault();
              }}
            />
          </div>
          <div>
            <Button
              text={"save"}
              styles={"bg-green-500 text-black hover:bg-green-600"}
              onClickHandler={submitForm}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
