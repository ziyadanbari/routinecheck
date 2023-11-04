import React from "react";

export default function Button({ text, styles, onClickHandler, disable }) {
  return (
    <button
      disabled={disable}
      className={` bg-gray-500 px-5 py-[6px] rounded  font-semibold ${styles}`}
      onClick={onClickHandler}
    >
      <div className="">{text}</div>
    </button>
  );
}
