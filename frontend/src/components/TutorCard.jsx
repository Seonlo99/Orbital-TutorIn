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
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className} `}
    >
      <div
        onClick={() => handleUserClick(`${tutor._id}`)}
        className="flex flex-row items-center justify-center mt-2 hover:cursor-pointer"
      >
        <img
          src={profilePic}
          onError={(e) => {
            e.currentTarget.src = defaultPic;
          }}
          alt="Tutor"
          className="object-cover object-center rounded-full w-40 h-40 lg:w-48 lg:h-44 xl:w-52 xl:h-52"
        />
      </div>

      <div className="flex flex-col p-5 justify-between">
        <div className="flex flex-row font-roboto font-bold text-dark-soft text-base items-center md:text-lg lg:text-xl">
          <div
            onClick={() => handleUserClick(`${tutor._id}`)}
            className="hover:underline hover:cursor-pointer mr-2 break-words"
          >
            {tutor.name}
          </div>
          {tutor.verified ? (
            <span className="bg-blue-500 w-fit bg-opacity-20 p-1.5 rounded-full">
              <BsCheckLg className="w-2 h-2 text-blue-500" />
            </span>
          ) : (
            ""
          )}
        </div>
        <p className="text-dark-light mt-3 text-sm md:text-base break-words">
          {tutor.about.substring(0, 80) ||
            "This fellow did not leave anything behind"}
          {tutor.about.length > 80 && (
            <p
              onClick={() => handleUserClick(`${tutor._id}`)}
              className="inline-block px-2 text-blue-500 font-bold hover:cursor-pointer hover:underline"
            >
              . . .
            </p>
          )}
        </p>
        <p className="text-dark-light mt-3 text-sm md:text-base italic">
          Teach {tutor.tutoringCount}{" "}
          {tutor.tutoringCount > 1 ? "times" : "time"}
        </p>
        <div className="flex flex-row gap-x-1 items-center overflow-x-auto">
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
            {`${Math.round(tutor.rating * 100) / 100} (${tutor.ratingCount})`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
