import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getRecentCreatedPosts } from "../../services/index/users";

export const RecentCreatedPosts = () => {
  const userState = useSelector((state) => state.user);
  const { data: recentCreatedPostsData } = useQuery({
    queryKey: "recentCreatedPosts",
    queryFn: () => getRecentCreatedPosts({ _id: userState.userInfo._id }),
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });
  const recentCreatedPosts = recentCreatedPostsData?.recentPosts;

  return (
    <>
      <div className="font-bold text-xl">My Posts</div>
      {recentCreatedPosts ? (
        <div className="ml-5 font-extralight text-m">
          <ul className="list-disc">
            {recentCreatedPosts.map((post) => (
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
