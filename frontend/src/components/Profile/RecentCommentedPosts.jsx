import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getRecentCommentedPosts } from "../../services/index/users";

export const RecentCommentedPosts = () => {
  const userState = useSelector((state) => state.user);

  const { data: recentCommentedPostsData } = useQuery({
    queryKey: "recentCommentedPosts",
    queryFn: () => getRecentCommentedPosts({ _id: userState.userInfo._id }),
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });
  const recentPostsAndComments =
    recentCommentedPostsData?.recentPostsAndComments;

  return (
    <>
      <div className="font-bold text-xl">My Comments</div>
      {recentPostsAndComments ? (
        recentPostsAndComments.map((curr) => (
          <Link to={`/post/${curr.posts.slug}`}>
            <div className="border rounded-lg border-black my-2 px-2 hover:text-white hover:bg-black">
              <div className="font-semibold ">
                {`${curr.posts.title.substring(0, 50)} ${
                  curr.posts.title.length > 50 && "..."
                }`}
              </div>
              <div className="">
                {`${curr.comments.body.substring(0, 50)} ${
                  curr.comments.body.length > 50 && "..."
                }`}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>"You have yet to leave any comments"</div>
      )}
    </>
  );
};
