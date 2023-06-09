import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";

import stables from "../../constants/stables";
import CropEasy from "../crop/CropEasy";

export const ProfilePictureForUpload = (avatar) => {
  const isAvatar = avatar.avatar !== "";
  const [photo, setPhoto] = useState(null);

  const [openCrop, setOpenCrop] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto({ url: URL.createObjectURL(file), file });
      setOpenCrop(true);
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy
            photo={photo}
            setOpenCrop={setOpenCrop}
          />,
          document.getElementById("portal")
        )}
      <div className="pt-5 w-full flex justify-center items-center gap-x-4">
        <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 overflow-hidden">
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {isAvatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar.avatar}
                alt="Profile Picture"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="avatar"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="button"
          className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
};
