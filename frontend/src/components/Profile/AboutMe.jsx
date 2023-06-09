import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import defaultPic from "../../assets/images/default.png";
import stables from "../../constants/stables";

export const AboutMe = () => {
  const userState = useSelector((state) => state.user);
  const profilePic =
    userState.userInfo.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar;
  return (
    <>
      <img
        id="avatar"
        className=" w-20 h-20 rounded-full border border-black"
        src={profilePic}
        alt="Img"
      ></img>
      <Link to="edit-profile">
        <button>Edit Profile</button>
      </Link>
      <div className="mt-3 flex flex-col gap-y-2">
        <div className="font-bold">Choon Siang</div>
        <div>
          <div className="font-extralight text-sm">Role</div>
          <div className="mt-0">Tutor</div>
        </div>
        <div>
          <div className="font-extralight text-sm">Year of study</div>
          <div className="mt-0">First</div>
        </div>
        <div>
          <div className="font-extralight text-sm">Email Address</div>
          <div className="mt-0">choonsiang@email.com</div>
        </div>
      </div>
    </>
  );
};
