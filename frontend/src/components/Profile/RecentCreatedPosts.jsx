import React from "react";
import { useNavigate } from "react-router-dom";

export const RecentCreatedPosts = ({ recentPosts }) => {
  const recentCreatedPosts = recentPosts.length == 0 ? null : recentPosts;
  const navigate = useNavigate();
  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);
  };
  return (
    <>
      <div className="font-bold text-xl">Recent Posts</div>
      {recentCreatedPosts ? (
        <div className="ml-5 font-extralight text-m">
          <ul className="list-disc">
            {recentCreatedPosts.map((post) => (
              <li>
                <button
                  onClick={() => handlePostClick(`${post.slug}`)}
                  className="hover:underline hover:cursor-pointer"
                >
                  {post.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="italic font-light">No recent post available!</div>
      )}
    </>
  );
};
