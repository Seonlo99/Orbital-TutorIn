import React from "react";
import { useNavigate } from "react-router-dom";

export const RecentCommentedPosts = ({ recentCommentedPostsData }) => {
  const recentPostsAndComments =
    recentCommentedPostsData == 0 ? null : recentCommentedPostsData;
  const navigate = useNavigate();
  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);
  };
  // console.log(recentCommentedPostsData);
  return (
    <>
      <div className="font-bold text-xl">My Comments</div>
      {recentPostsAndComments ? (
        recentPostsAndComments.map((curr) => (
          <div className="border rounded-lg border-black my-2 px-3 hover:text-white hover:bg-black">
            <button
              onClick={() => handlePostClick(`${curr.postId.slug}`)}
              className="hover:cursor-pointer text-left"
            >
              <div className="font-semibold underline">
                {curr.postId.title.substring(0, 50)}
                {curr.postId.title.length > 50 && " ..."}
              </div>
              <div className="">
                {curr.body.substring(0, 50)}
                {curr.body.length > 50 && " ..."}
              </div>
            </button>
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
