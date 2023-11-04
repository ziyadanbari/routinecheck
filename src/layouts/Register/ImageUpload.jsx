import React, { useEffect, useState } from "react";

export default function ImageUpload({
  avatar,
  onChange,
  setPreviewImage,
  inputRef,
}) {
  useEffect(() => {
    if (avatar) {
      const url = URL.createObjectURL(avatar);
      setPreviewImage(url);
    } else {
      setPreviewImage("");
    }
  }, [avatar]);
  return (
    <div>
      <div>
        <input
          type="file"
          id="input-upload"
          hidden
          onChange={onChange}
          ref={inputRef}
        />
      </div>
      <div>
        <label
          className="bg-[#0466c8] block w-full rounded-full py-2 cursor-pointer hover:bg-blue-600"
          htmlFor="input-upload">
          Choose Image
        </label>
      </div>
    </div>
  );
}
