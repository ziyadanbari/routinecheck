import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import NavOption from "../../../components/NavOption";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
export default function SideBar({ page }) {
  return (
    <div>
      <div className="bg-[rgba(105,105,105,0.24)] p-2 rounded-md border-[1px] border-[rgba(50,50,50,0.53)] inline-block mdlg:w-auto w-full">
        <div className="flex flex-col space-y-4">
          <div className="mdlg:inline-block block">
            <NavOption
              title={"Personal Informations"}
              icon={<ManageAccountsOutlinedIcon fontSize="large" />}
              size="lg"
              page={page}
              to={"personalinformations"}
            />
          </div>
          <div className="inline-block">
            <NavOption
              title={"Password Management"}
              icon={<AdminPanelSettingsOutlinedIcon fontSize="large" />}
              size="lg"
              page={page}
              to={"passwordmanagement"}
            />
          </div>
          <div className="inline-block">
            <NavOption
              title={"Notifications"}
              icon={<ManageAccountsOutlinedIcon fontSize="large" />}
              size="lg"
              page={page}
              to={"notifications"}
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
