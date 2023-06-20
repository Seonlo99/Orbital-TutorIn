import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const RecentCreatedPosts = ({ recentPosts }) => {
  const userState = useSelector((state) => state.user);

  const recentCreatedPosts = recentPosts.length == 0 ? null : recentPosts;
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
        <div className="italic font-light">No recent post available!</div>
      )}
    </>
  );
};
