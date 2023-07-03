import React from "react";
import moment from "moment";
import { BiUpvote } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";

import defaultPic from "../../assets/images/default.png";
import stables from "../../constants/stables";

const DisplayPost = ({ post }) => {
  const navigate = useNavigate();

  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);
  };
  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div
      key={post._id}
      className="flex flex-row px-5 py-5 justify-between"
    >
      <div className="flex flex-row">
        <div className="text-3xl ">
          <img
            src={
              post.avatar === ""
                ? defaultPic
                : stables.UPLOAD_FOLDER_BASE_URL + post.avatar
            }
            onError={(e) => {
              e.currentTarget.src = defaultPic;
            }}
            alt="Author Profile Picture"
            className="h-10 w-10 transition-all duration-300 rounded-full"
          />
        </div>
        <div className="ml-6">
          <div className="font-semibold">
            <button
              onClick={() => handlePostClick(post.slug)}
              className="hover:underline
            hover:cursor-pointer"
            >
              {post.title.substring(0, 50)} {post.title.length > 50 && "..."}
            </button>
            {post.tags &&
              post.tags.slice(0, 2).map((tag) => (
                <div
                  key={tag}
                  className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-gray-300 text-gray-700 border"
                >
                  {tag}
                </div>
              ))}{" "}
            {post.tags.length > 2 && "..."}
          </div>
          <div className="font-light text-sm">
            Created by:{" "}
            <button
              onClick={() => handleUserClick(post.user._id)}
              className="hover:underline
            hover:cursor-pointer"
            >
              {post.user.username}
            </button>
            , {moment(post.createdAt).format("DD/MM/yyyy")} |{" "}
            {moment(post.createdAt).format("HH:mm")}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-3 items-center">
        <div className="flex flex-row">
          <BiUpvote size={24} />
          <div data-testid="voteCount">{post.voteCount}</div>
        </div>
        <div className="flex flex-row">
          <AiOutlineComment size={24} />
          <div data-testid="commentCount">{post.commentCount}</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPost;
