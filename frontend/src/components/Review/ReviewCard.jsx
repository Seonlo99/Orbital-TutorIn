import React from "react";
import moment from "moment";
import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "react-rating";

import defaultPic from "../../assets/images/default.png";
import stables from "../../constants/stables";

const ReviewCard = ({ review, activeItem, displayArray }) => {
  const profilePic =
    review.reviewerId.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + review.reviewerId.avatar;

  return (
    <div
      className={
        review._id === displayArray[activeItem]._id ? "block" : "hidden"
      }
    >
      <div className="flex flex-col bg-white rounded-lg">
        <div className="items-center flex flex-row h-10 px-2 ">
          <div className="">
            <img
              src={profilePic}
              onError={(e) => {
                e.currentTarget.src = defaultPic;
              }}
              alt="Reviewer Profile Picture"
              className="mr-3 h-8 w-8 transition-all duration-300 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-sm">{review.reviewerId.name}</div>
            <div className="">
              <Rating
                readonly
                initialRating={review.stars}
                emptySymbol={<BsStar />}
                fullSymbol={<BsStarFill />}
                className="text-blue-500 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="mt-2 px-2">
          <div className="px-2 py-2 w-full font-light text-sm text-justify overflow-y:auto">
            {review.reviewComment}
          </div>
          <div className="absolute bottom-0 right-12 font-light text-xs">
            {moment(review.updatedAt).format("DD/MM/yyyy")} |{" "}
            {moment(review.updatedAt).format("HH:mm")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
