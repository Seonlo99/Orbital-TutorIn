import React from "react";
import { BsCheckLg } from "react-icons/bs";

import defaultPic from "../assets/images/default.png";
import stables from "../constants/stables";
import ProfilePage from "../pages/ProfilePage";

const TutorCard = ({ tutor, className }) => {
  console.log(tutor);
  const profilePic =
    tutor?.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + tutor?.avatar;
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <img
        src={profilePic}
        alt="Tutor Image"
        className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
      />
      <div className="p-5">
        <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
          {tutor?.name}
        </h2>
        <p className="text-dark-light mt-3 text-sm md:text-lg">Tutor About</p>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex item-center gap-x-2 md:gap-x-2.5">
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                Viola Manisa
              </h4>
              <div className="flex item-center gap-x-2">
                <span className="bg-[#36B37E] w-fit bg-opacity-20 p-1.5 rounded-full">
                  <BsCheckLg className="w-1.5 h-1.5 text-[#36B37E]" />
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  Verified tutor
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
            RATING
          </span>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
