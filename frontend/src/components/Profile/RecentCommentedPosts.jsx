import React from "react";
import { Link } from "react-router-dom";

export const RecentCommentedPosts = ({ recentCommentedPostsData }) => {
  const recentPostsAndComments =
    recentCommentedPostsData == 0 ? null : recentCommentedPostsData;

  // console.log(recentCommentedPostsData);
  return (
    <>
      <div className="font-bold text-xl">My Comments</div>
      {recentPostsAndComments ? (
        recentPostsAndComments.map((curr) => (
          <Link to={`/post/${curr.postId.slug}`}>
            <div className="border rounded-lg border-black my-2 px-2 hover:text-white hover:bg-black">
              <div className="font-semibold ">
                {curr.postId.title.substring(0, 50)}
                {curr.postId.title.length > 50 && " ..."}
              </div>
              <div className="">
                {curr.body.substring(0, 50)}
                {curr.body.length > 50 && " ..."}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="italic font-light">
          You have yet to leave any comments
        </div>
      )}
    </>
  );
};
