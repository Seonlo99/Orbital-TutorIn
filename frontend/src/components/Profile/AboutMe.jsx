import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";

import defaultPic from "../../assets/images/default.png";
import stables from "../../constants/stables";
import { Service } from "./Service";

export const AboutMe = ({ viewedUser }) => {
  // console.log(viewedUser);
  const userState = useSelector((state) => state.user);
  const [bioExtend, setBioExtend] = useState(false);
  const profilePic =
    viewedUser.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + viewedUser.avatar;

  const handleBioExtend = () => {
    setBioExtend(!bioExtend);
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <img
          id="avatar"
          className="w-20 h-20 rounded-full border border-black"
          src={profilePic}
          onError={(e) => {
            e.currentTarget.src = defaultPic;
          }}
          alt="Img"
        ></img>
        <div className="flex flex-col mt-4 ml-10">
          {userState.userInfo && viewedUser._id === userState.userInfo._id && (
            <Link to="edit-profile">
              <button className="border border-black rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-white">
                Edit Profile
              </button>
            </Link>
          )}
        </div>
        {/* <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5"> */}
        {userState.userInfo && viewedUser._id !== userState.userInfo._id && (
          <section className="mb-2">
            <Service
              viewedUser={viewedUser}
              userId={userState.userInfo._id}
              userIsTutor={userState.userInfo.tutor}
              token={userState.userInfo.token}
            />
          </section>
        )}
      </div>
      <div className="mt-1 flex flex-col gap-y-2">
        <div className="flex flex-row items-center">
          <div className="font-bold mr-2">{viewedUser.name}</div>
          {viewedUser.verified ? (
            <span className="bg-blue-500 w-fit bg-opacity-20 p-1.5 rounded-full">
              <BsCheckLg className="w-3 h-3 text-blue-500" />
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="font-extralight text-sm">Bio</div>
          {viewedUser.about?
          <div className="break-words">
            {viewedUser.about.substring(0, 200)}{" "}
            {bioExtend && viewedUser.about.substring(200)}
            {viewedUser.about.length > 200 && (
              <p
                onClick={handleBioExtend}
                className="inline-block px-2 italic text-blue-500 hover:cursor-pointer hover:underline"
              >
                {bioExtend ? "Collapse" : "Expand bio"}
              </p>
            )}
          </div>
          : 
          <div className=" italic font-light text-sm">
              Empty Bio
          </div>
          }
        </div>
        <div>
          <div className="font-extralight text-sm">Role</div>
          <div className="mt-0">{viewedUser.tutor ? "Tutor" : "Student"}</div>
        </div>
        {viewedUser.tutor &&
        <div>
          <div className="font-extralight text-sm">Rate</div>
          <div className="mt-0">${viewedUser.hourlyRate}/h</div>
        </div>
        }
        <div>
          <div className="font-extralight text-sm">Email Address</div>
          <div className="mt-0">{viewedUser.email}</div>
        </div>
      </div>
    </>
  );
};
