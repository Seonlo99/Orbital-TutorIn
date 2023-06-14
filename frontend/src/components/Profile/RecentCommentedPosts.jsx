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
  console.log(recentCommentedPostsData);
  const recentCommentedPosts = recentCommentedPostsData?.recentPosts;

  return (
    <>
      <div className="font-bold text-xl">My Comments</div>
      {recentCommentedPosts ? (
        <div className="ml-5 font-extralight text-m">
          <ul className="list-disc">
            {recentCommentedPosts.map((post) => (
              <Link
                to={`/post/${post.slug}`}
                className="hover:underline"
              >
                <li>{post.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div>"No recent post available!"</div>
      )}
    </>
  );
};
