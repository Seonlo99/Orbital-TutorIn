import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { newComment } from "../../services/index/comments";

import AddComment from "./AddComment";
import {
  getComments,
  editComment,
  deleteComment,
} from "../../services/index/comments";
import { Upvote } from "../Upvote";

const Comment = ({
  singleComment,
  uuid,
  userVotes,
  setUserVotes,
  voteCount,
  setVoteCount,
  invalidate,
  setCommentCount,
}) => {
  const [showReply, setShowReply] = useState(false);
  const userState = useSelector((state) => state.user);
  const [reload, setReload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentBody, setCommentBody] = useState(singleComment.body);

  // const queryClient = useQueryClient()

  const replyHandler = () => {
    setShowReply((cur) => {
      return !cur;
    });
    // console.log(showReply)
  };

  const editHandler = () => {
    console.log();
    setShowEdit((cur) => {
      return !cur;
    });
    // console.log(showReply)
  };

  const cancelHandler = () => {
    setShowEdit((cur) => {
      return false;
    });
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getComments(uuid, singleComment._id),
    queryKey: ["comments", uuid, singleComment, reload],
    onSuccess: (data) => {
      // setComments(data)
      // console.log(data)
      if (data.comments) {
        data.comments.forEach((comment) => {
          voteCount[comment._id] = comment.voteCount;
        });
        setVoteCount(voteCount);
        // setReload((cur)=>!cur)
      }
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });

  const { mutate: mutateNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyUser }) => {
        return newComment({ token, desc, slug, parent, replyUser });
      },
      onSuccess: () => {
        toast.success("Comment Added!");
        setCommentCount((cur) => {
          return cur + 1;
        });
        setShowReply(false);
        setReload((cur) => !cur);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const addCommentHandler = (text, parent = null, replyUser = null) => {
    if (!userState.userInfo) {
      toast.error("Login to comment!");
      return;
    }

    mutateNewComment({
      desc: text,
      parent: singleComment._id,
      replyUser: singleComment.userId,
      token: userState.userInfo.token,
      slug: uuid,
    });
    // setAffectedComment(null);
    // console.log(text);
  };

  const { mutate: mutateEditComment } =
    useMutation({
      mutationFn: ({ token, desc, id }) => {
        return editComment({ token, desc, id });
      },
      onSuccess: () => {
        toast.success("Comment Edited!");
        setShowEdit(false);
        // setReload((cur)=>!cur)
        // queryClient.invalidateQueries({queryKey:['comments']})
        invalidate();
        // setcommentBody(desc)
        // setReload((cur)=>!cur)
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const editCommentHandler = (text) => {
    if (!userState.userInfo) {
      toast.error("Login to edit comment!");
      return;
    }
    setCommentBody(text);
    mutateEditComment({
      desc: text,
      id: singleComment._id,
      token: userState.userInfo.token,
    });
  };

  const { mutate: mutateDeleteComment } =
    useMutation({
      mutationFn: ({ token, id }) => {
        return deleteComment({ token, id });
      },
      onSuccess: () => {
        toast.success("Comment Deleted!");
        setShowEdit(false);
        // setReload((cur)=>!cur)
        invalidate();
        // setReload((cur)=>!cur)
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const deleteCommentHandler = () => {
    if (!userState.userInfo) {
      toast.error("Login to edit comment!");
      return;
    }

    mutateDeleteComment({
      id: singleComment._id,
      token: userState.userInfo.token,
    });
  };

  const navigate = useNavigate();
  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };

  // console.log(commentBody)

  return (
    <div className="bg-gray-50 rounded-md px-3 py-2 mt-3 border-l">
      <div className="text-xs">
        <button
          onClick={() => handleUserClick(singleComment.userId._id)}
          className="hover:underline
                        hover:cursor-pointer"
        >
          {singleComment.userId.username}
        </button>{" "}
        • {moment(singleComment.createdAt).format("DD/MM/yyyy")}{" "}
        {moment(singleComment.createdAt).format("HH:mm")}
      </div>

      {singleComment.isDeleted ? (
        <div className="text-sm italic font-light">Deleted Message</div>
      ) : (
        <>
          <div
            hidden={showEdit}
            className="mt-2 overflow-x-auto"
          >
            {singleComment.body}
          </div>

          <div
            hidden={!showEdit}
            className="my-2"
          >
            <AddComment
              initialText={commentBody}
              label="Edit"
              formHandler={(text) => {
                editCommentHandler(text);
              }}
              cancelHandler={() => cancelHandler()}
            />
          </div>

          <div className="font-light text-sm flex flex-row gap-x-5 mt-3">
            <div className="bg-gray-300 rounded-2xl px-2 py-1 flex flex-row items-center gap-x-1">
              <Upvote
                userVotes={userVotes}
                setUserVotes={(userVotes) => setUserVotes(userVotes)}
                id={singleComment._id}
                postSlug={uuid}
                commentSlug={singleComment.commentSlug}
                voteCount={voteCount}
                setVoteCount={(count) => setVoteCount(count)}
              />
            </div>
            <button onClick={replyHandler}>Reply</button>
            {userState.userInfo?._id === singleComment.userId._id && (
              <>
                <button onClick={editHandler}>Edit</button>
                <button onClick={deleteCommentHandler}>Delete</button>
              </>
            )}
          </div>

          <div
            hidden={!showReply}
            className="mt-3"
          >
            <AddComment
              label="Comment"
              formHandler={(text) => addCommentHandler(text)}
              loading={false}
            />
          </div>
        </>
      )}

      {!isLoading &&
        !isError &&
        data.comments.map((comment) => {
          return (
            <Comment
              invalidate={() => invalidate()}
              key={comment._id}
              uuid={uuid}
              singleComment={comment}
              userVotes={userVotes}
              setUserVotes={(userVotes) => setUserVotes(userVotes)}
              voteCount={voteCount}
              setVoteCount={(count) => setVoteCount(count)}
              setCommentCount={setCommentCount}
            />
          );
        })}
    </div>
  );
};

export default Comment;
