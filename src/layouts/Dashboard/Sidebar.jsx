import AccessAlarmsSharpIcon from "@mui/icons-material/AccessAlarmsSharp";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import Logo from "../../assets/logo2.png";
import NavOption from "../../components/NavOption";
import React from "react";

export default function Sidebar({ page }) {
  const [display, setDisplay] = React.useState(false);
  return (
    <div>
      <div className="h-screen z-50  md:block hidden">
        <div className="bg-[rgba(255,255,255,.14)] pr-5 pl-2 h-full py-10 w-62 fixed">
          <div className="py-5 px-2">
            <img src={Logo} className="w-44" />
          </div>
          <div className="py-10">
            <div className="space-y-4">
              <div>
                <NavOption
                  to={"dailyroutine"}
                  icon={<AddAlarmIcon fontSize="large" />}
                  title={"Daily Routine"}
                  page={page}
                  fontSize="large"
                />
              </div>
              <div>
                <NavOption
                  to={"timedroutine"}
                  icon={<AccessAlarmsSharpIcon fontSize="large" />}
                  title={"Timed Routine"}
                  page={page}
                  fontSize="large"
                />
              </div>
              <div>
                <NavOption
                  to={"settings"}
                  icon={<SettingsSharpIcon fontSize="large" />}
                  title={"Settings"}
                  page={page}
                  fontSize="large"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative md:hidden block">
        <div className="absolute top-5 left-5 z-50">
          <div>
            <div
              className={display ? "burger x" : "burger"}
              onClick={() => setDisplay((e) => !e)}
            >
              <span className="slide1"></span>
              <span className="slide2"></span>
              <span className="slide3"></span>
            </div>
          </div>
        </div>
        <div className="absolute  z-40">
          <div
            className="h-screen bg-[rgba(0,0,0,.4)] fixed backdrop-blur transition-all duration-150 pt-20 text-xl overflow-hidden font-semibold space-y-5"
            style={{
              width: display ? "240px" : "0px",
              padding: display ? "80px 20px" : "80px 0px",
            }}
          >
            <div>
              <NavOption
                to={"dailyroutine"}
                icon={<AddAlarmIcon fontSize="large" />}
                title={"Daily Routine"}
                page={page}
              />
            </div>
            <div>
              <NavOption
                to={"timedroutine"}
                icon={<AccessAlarmsSharpIcon fontSize="large" />}
                title={"Timed Routine"}
                page={page}
              />
            </div>
            <div>
              <NavOption
                to={"settings"}
                icon={<SettingsSharpIcon fontSize="large" />}
                title={"Settings"}
                page={page}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
