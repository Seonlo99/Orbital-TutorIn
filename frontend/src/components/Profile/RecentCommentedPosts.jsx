import React from "react";
import { useNavigate } from "react-router-dom";

export const RecentCommentedPosts = ({ recentCommentedPostsData }) => {
  const recentPostsAndComments =
    recentCommentedPostsData === 0 ? null : recentCommentedPostsData;
  const navigate = useNavigate();
  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);
  };
  // console.log(recentCommentedPostsData);
  return (
    <>
      <div className="font-bold text-xl">Recent Comments</div>
      {recentPostsAndComments ? (
        recentPostsAndComments.map((curr) => (
          <div
            onClick={() => handlePostClick(`${curr.postId.slug}`)}
            className="border rounded-lg border-black my-2 px-3 hover:cursor-pointer"
          >
            <div className="font-semibold text-xl">
              {curr.postId.title.substring(0, 50)}
              {curr.postId.title.length > 50 && " ..."}
            </div>
            <div className="">
              {curr.body.substring(0, 50)}
              {curr.body.length > 50 && " ..."}
            </div>
          </div>
        ))
      ) : (
        <div className="italic font-light">
          You have yet to leave any comments
        </div>
      )}
    </>
  );
};
