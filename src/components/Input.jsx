/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
const Input = React.forwardRef(
  (
    {
      type = "text",
      styles,
      value = "",
      onChange,
      placeholder,
      onClick,
      onFocus,
      readOnly,
    },
    ref
  ) => {
    if (type === "password") {
      var [show, setShow] = React.useState(false);
    }
    return (
      <div className="relative">
        <input
          disabled={readOnly}
          onFocus={onFocus}
          ref={ref}
          type={type === "password" ? (show ? "text" : type) : type}
          onClick={onClick}
          className={`w-full rounded outline-none p-2 transform border-[1.8px] border-solid border-opacity-25 border-gray-200 text-[18px] font-semibold tracking-wide text-white ${styles} text-xl`}
          style={{
            background: "linear-gradient(136deg, #0000004d, #322e2e24)",
          }}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {type === "password" && (
          <div className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer">
            <div onClick={() => setShow((e) => !e)}>
              {show ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Input;
