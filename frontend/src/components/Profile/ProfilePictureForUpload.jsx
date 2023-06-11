import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import stables from "../../constants/stables";
import CropEasy from "../crop/CropEasy";
import { UpdateProfilePicture } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";

export const ProfilePictureForUpload = (avatar) => {
  const isAvatar = avatar.avatar !== "";
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [openCrop, setOpenCrop] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ formData }) => {
      return UpdateProfilePicture({
        formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("Profile Picture is removed");
      // console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error);
    },
  });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto({ url: URL.createObjectURL(file), file });
      setOpenCrop(true);
    }
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your profile picture?")) {
      try {
        const formData = new FormData();
        formData.append("avatar", undefined);
        formData.append("_id", userState.userInfo._id);
        mutate({ formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  console.log(stables.UPLOAD_FOLDER_BASE_URL + avatar.avatar);
  console.log(stables.UPLOAD_FOLDER_BASE_URL);
  console.log(avatar.avatar);

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
          onClick={handleDeleteImage}
          type="button"
          className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
};
