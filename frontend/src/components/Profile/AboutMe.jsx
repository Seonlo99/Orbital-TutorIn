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
      <div className="flex flex-row">
        <img
          id="avatar"
          className=" w-20 h-20 rounded-full border border-black"
          src={profilePic}
          alt="Img"
        ></img>
        <div className=" mt-5 ml-10">
          <Link to="edit-profile">
            <button className="border border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-y-2">
        <div className="font-bold">{userState.userInfo.name}</div>
        <div>
          <div className="font-extralight text-sm">Role</div>
          <div className="mt-0">
            {userState.userInfo.tutor ? "Tutor" : "Student"}
          </div>
        </div>
        <div>
          <div className="font-extralight text-sm">Year of study</div>
          <div className="mt-0">First</div>
        </div>
        <div>
          <div className="font-extralight text-sm">Email Address</div>
          <div className="mt-0">{userState.userInfo.email}</div>
        </div>
      </div>
    </>
  );
};
