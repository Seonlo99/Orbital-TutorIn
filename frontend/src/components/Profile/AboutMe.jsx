import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
import { useParams } from "react-router-dom";

import defaultPic from "../../assets/images/default.png";
import stables from "../../constants/stables";

export const AboutMe = ({ viewedUser }) => {
  const userState = useSelector((state) => state.user);
  const profilePic =
    viewedUser.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + viewedUser.avatar;

  return (
    <>
      <div className="flex flex-row">
        <img
          id="avatar"
          className="w-20 h-20 rounded-full border border-black"
          src={profilePic}
          onError={(e) => {
            e.currentTarget.src = defaultPic;
          }}
          alt="Img"
        ></img>
        <div className=" flex flex-col mt-5 ml-10">
          {userState.userInfo && viewedUser._id === userState.userInfo._id ? (
            <>
              <Link to="edit-profile">
                <button className="border border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white">
                  Edit Profile
                </button>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-y-2">
        <div className="flex flex-row items-center">
          <div className="font-bold mr-2">{viewedUser.name}</div>
          <span className="bg-blue-500 w-fit bg-opacity-20 p-1.5 rounded-full">
            <BsCheckLg className="w-2 h-2 text-blue-500" />
          </span>
        </div>
        <div className="break-words">{viewedUser.about}</div>
        <div>
          <div className="font-extralight text-sm">Role</div>
          <div className="mt-0">{viewedUser.tutor ? "Tutor" : "Student"}</div>
        </div>
        <div>
          <div className="font-extralight text-sm">Year of study</div>
          <div className="mt-0">First</div>
        </div>
        <div>
          <div className="font-extralight text-sm">Email Address</div>
          <div className="mt-0">{viewedUser.email}</div>
        </div>
      </div>
    </>
  );
};
