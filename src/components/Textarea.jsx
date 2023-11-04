import React from "react";

export default function Textarea({ placeholder, onChange, value, styles }) {
  return (
    <div>
      <textarea
        maxLength={40}
        rows={5}
        className={`w-full rounded outline-none p-2 transform border-[1.8px] border-solid border-opacity-25 border-gray-200 text-[18px] font-semibold tracking-wide resize-none text-white ${styles}`}
        style={{
          background: "linear-gradient(136deg, #0000004d, #322e2e24)",
        }}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
