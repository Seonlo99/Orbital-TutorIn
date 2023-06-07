import React from "react";
import defaultPic from "../../assets/images/default.png";
import { Link } from "react-router-dom";

export const AboutMe = () => {
  return (
    <>
      <img
        id="avatar"
        className=" w-20 h-20 rounded-full border border-black"
        src={defaultPic}
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
