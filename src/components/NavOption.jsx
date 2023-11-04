import { NavLink } from "react-router-dom";
export default function NavOption({ icon, title, to, page = "", size = "xl" }) {
  return (
    <NavLink to={to} className="text-white ">
      <div
        className={`flex space-x-2 items-center hover:bg-[rgba(0,0,0,.4)] p-2 rounded cursor-pointer ${
          page.includes(to) ? "bg-[rgba(0,0,0,.4)]" : ""
        } text-${size}`}
      >
        <div>{icon}</div>
        <div className=" text-clip whitespace-nowrap overflow-hidden">
          {title}
        </div>
      </div>
    </NavLink>
  );
}
