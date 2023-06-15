import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const CommunityStats = ({postCount,commentCount,VoteCount}) => {
  const userState = useSelector((state) => state.user);
 
  return (
    <>
      <div className="font-bold text-xl">Community Stats</div>
      <div className="mt-3 flex flex-col gap-y-2">
        <div>
          <div className="font-extralight text-sm">Post Count:</div>
          <div className="mt-0">{postCount}</div>
        </div>
        <div>
          <div className="font-extralight text-sm">Comment Count:</div>
          <div className="mt-0">{commentCount}</div>
        </div>
        <div>
          <div className="font-extralight text-sm">Upvote Count:</div>
          <div className="mt-0">{VoteCount}</div>
        </div>
      </div>
    </>
  );
};
