import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "react-rating";
import { Link } from "react-router-dom";

import defaultPic from "../assets/images/default.png";
import stables from "../constants/stables";
import ProfilePage from "../pages/ProfilePage";

const TutorCard = ({ tutor, className }) => {
  const profilePic =
    tutor?.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + tutor?.avatar;
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <Link to={`/profile/${tutor._id}`}>
        <img
          src={profilePic}
          alt="Tutor Image"
          className="w-full object-cover object-center h-auto sm:h-40 md:h-44 lg:h-48 xl:h-52"
        />
      </Link>
      <div className="p-5">
        <Link to={`/profile/${tutor._id}`}>
          <h2 className="font-roboto font-bold text-base text-dark-soft md:text-lg lg:text-xl">
            {tutor?.name}
          </h2>
        </Link>
        <p className="text-dark-light mt-3 text-sm md:text-base">Tutor About</p>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex flex-col item-center gap-x-2 md:gap-x-2.5">
            <div className="flex flex-row">
              <div className="">
                <Rating
                  readonly
                  initialRating={tutor.rating}
                  emptySymbol={<BsStar />}
                  fullSymbol={<BsStarFill />}
                  className="text-blue-500 text-xs md:text-sm lg:text-base"
                />
              </div>
              <div className="ml-2 text-blue-500 font-bold text-xs md:text-sm lg:text-base">{`${
                Math.round(tutor.rating * 100) / 100
              } (${tutor.tutoringCount})`}</div>
            </div>
            <div className="flex item-center gap-x-2 mt-2">
              <span className="bg-blue-500 w-fit bg-opacity-20 p-1.5 rounded-full">
                <BsCheckLg className="w-2 h-2 text-blue-500" />
              </span>
              <span className="italic text-dark-light text-xs md:text-sm">
                Verified tutor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
