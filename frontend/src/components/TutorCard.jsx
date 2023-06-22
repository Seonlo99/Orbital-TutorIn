import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";

import defaultPic from "../assets/images/default.png";
import stables from "../constants/stables";

const TutorCard = ({ tutor, className }) => {
  const profilePic =
    tutor?.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + tutor?.avatar;
  const navigate = useNavigate();
  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <button
        onClick={() => handleUserClick(`${tutor._id}`)}
        className="hover:underline hover:cursor-pointer"
      >
        <img
          src={profilePic}
          onError={(e) => {
            e.currentTarget.src = defaultPic;
          }}
          alt="Tutor Image"
          className="w-full object-cover object-center h-auto sm:h-40 md:h-44 lg:h-48 xl:h-52"
        />
      </button>
      <div className="p-5">
        <h2 className="font-roboto font-bold text-base text-dark-soft md:text-lg lg:text-xl">
          <button
            onClick={() => handleUserClick(`${tutor._id}`)}
            className="hover:underline hover:cursor-pointer"
          >
            {tutor.name}
          </button>
        </h2>
        <p className="text-dark-light mt-3 text-sm md:text-base">Tutor About</p>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex flex-col item-center gap-x-2 md:gap-x-2.5">
            <div className="flex flex-row justify-between overflow-y-auto">
              <div className="mr-2">
                <Rating
                  readonly
                  initialRating={tutor.rating}
                  emptySymbol={<BsStar />}
                  fullSymbol={<BsStarFill />}
                  className="text-blue-500 text-xs md:text-sm lg:text-base"
                />
              </div>
              <div className="text-blue-500 font-bold text-xs md:text-sm lg:text-base">
                {`${Math.round(tutor.rating * 100) / 100} (${
                  tutor.tutoringCount
                })`}
              </div>
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
