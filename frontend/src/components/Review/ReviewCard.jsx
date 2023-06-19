import React from "react";
import moment from "moment";

import defaultPic from "../../assets/images/default.png";
import stables from "../../constants/stables";

const ReviewCard = ({ review, activeItem, displayArray }) => {
  const profilePic =
    review.reviewerAvatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + review.reviewerAvatar;
  return (
    <div
      className={
        review._id === displayArray[activeItem]._id ? "block" : "hidden"
      }
    >
      <div className={`py-3 items-center flex flex-row`}>
        <div className="h-16 w-16">
          <img
            src={profilePic}
            onError={(e) => {
              e.currentTarget.src = defaultPic;
            }}
            alt="Reviewee Profile Picture"
            className="h-16 w-16 transition-all duration-300 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-between ml-6 h-full">
          <div className="w-full font-semibold">{review.reviewComment}</div>
          <div className="w-full font-light text-sm">
            {`Reviewed on: `}
            {moment(review.updatedAt).format("DD/MM/yyyy")} |{" "}
            {moment(review.updatedAt).format("HH:mm")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
