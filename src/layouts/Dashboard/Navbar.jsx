import React from "react";
import Avatar from "@mui/material/Avatar";
import PorfileCard from "../../components/dashboard/PorfileCard";

export default function Navbar({ user }) {
  const [showProfile, setShowProfile] = React.useState(false);
  return (
    <div className="flex justify-end px-10 py-5 right-0">
      <div className="inline-block">
        <div className=" space-y-3">
          <div
            className="cursor-pointer"
            onClick={() => setShowProfile((e) => !e)}>
            <Avatar src={user.avatar || ""} sx={{ width: 58, height: 58 }} />
          </div>
          {showProfile && (
            <div className="absolute -translate-x-2/3 z-50">
              <PorfileCard user={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
