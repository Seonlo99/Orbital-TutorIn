import React from "react";
import moment from "moment";

import defaultPic from "../../assets/images/default.png";
import stables from "../../constants/stables";

const ReviewCard = (reviewee) => {
  const profilePic =
    reviewee?.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + reviewee?.avatar;

  return (
    <div className={`py-3 items-center flex flex-row`}>
      <div className="">
        <img
          src={profilePic}
          onError={(e) => {
            e.currentTarget.src = defaultPic;
          }}
          alt="Reviewee Profile Picture"
          className="h-20 w-20 transition-all duration-300 rounded-full"
        />
      </div>
      <div className="flex flex-col justify-between ml-6 h-full">
        <div className="w-full font-semibold">Review String goes here</div>
        <div className="w-full font-light text-sm">
          Reviewed on: {reviewee.username},{" "}
          {moment(reviewee.createdAt).format("DD/MM/yyyy")} |{" "}
          {moment(reviewee.createdAt).format("HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
