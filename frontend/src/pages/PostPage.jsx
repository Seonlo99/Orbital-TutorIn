import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { generateHTML } from "@tiptap/html";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";

import MainLayout from "../components/MainLayout";
import { getSinglePost, deletePost } from "../services/index/posts";
import AddComment from "../components/Comment/AddComment";
import { newComment } from "../services/index/comments";
import AllComments from "../components/Comment/AllComments";
import { Upvote } from "../components/Upvote";

const PostPage = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const { uuid } = useParams();
  const [reload, setReload] = useState(false);
  const [votes, setVotes] = useState({});
  const [voteCount, setVoteCount] = useState({});
  const [commentCount, setCommentCount] = useState(0);
  // const [comments, setComments] = useState({})
  const userState = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getSinglePost(uuid, userState.userInfo ? userState.userInfo._id : null),
    queryKey: ["post"],
    onSuccess: (data) => {
      setVotes(() => {
        return data.votes;
      });
      voteCount[data.post._id] = data.voteCount;
      setVoteCount(voteCount);
      setCommentCount(data.commentCount);
      setBody(() => {
        return generateHTML(data.post.contents, [
          //   Document,
          //   Paragraph,
          //   Text,
          //   Bold,
          Underline,
          TextStyle,
          Color,
          //   ListItem,
          StarterKit,
          // other extensions …
        ]);
      }, [data.post.contents]);
      // console.log(parse(body))
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });

  // !isLoading && console.log(data)

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyUser }) => {
        return newComment({ token, desc, slug, parent, replyUser });
      },
      onSuccess: () => {
        toast.success("Comment Added!");
        setCommentCount((cur) => {
          return cur + 1;
        });
        setReload((cur) => {
          return !cur;
        });
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
      parent,
      replyUser,
      token: userState.userInfo.token,
      slug: data.post.slug,
    });
    // setAffectedComment(null);
    // console.log(text);
  };

  const { mutate: mutateDeletePost } = useMutation({
    mutationFn: () => {
      return deletePost({
        token: userState.userInfo.token,
        slug: data.post.slug,
      });
    },
    onSuccess: () => {
      toast.success("Post Deleted!");
      navigate("/discuss");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const deleteHandler = () => {
    mutateDeletePost();
  };

  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };

  // useEffect(() => {

  // }, [postVoteCount,votes])

  // console.log(votes)
  return (
    <MainLayout>
      {!isLoading && !isError && body && (
        <div className="container mx-auto max-w-4xl mt-10 px-5 py-5">
          <div className="flex flex-col divide-y bg-gray-50 rounded-lg p-5">
            <div className="mb-3">
              <div className="font-semibold text-2xl">{data.post.title}</div>
              <div className="font-light text-sm">
                by{" "}
                <button
                  onClick={() => handleUserClick(data.post.userId._id)}
                  className="hover:underline
                        hover:cursor-pointer"
                >
                  {data.post.userId.username}
                </button>
                , {moment(data.post.createdAt).format("DD/MM/yyyy")} |{" "}
                {moment(data.post.createdAt).format("HH:mm")}
              </div>
            </div>

            <div className="font-semibold text-2xl pt-5 mb-5">
              <div className="prose lg:prose-xl prose-p:leading-none prose-p:my-0 prose-p:text-md font-normal">
                {parse(body)}
              </div>
            </div>
            <div className="pt-3 justify-between flex flex-row">
              <div className="bg-gray-300 rounded-2xl px-2 py-1 flex flex-row items-center gap-x-1">
                <Upvote
                  userVotes={votes}
                  setUserVotes={(userVotes) => setVotes(userVotes)}
                  id={data.post._id}
                  postSlug={data.post.slug}
                  voteCount={voteCount}
                  setVoteCount={(count) => setVoteCount(count)}
                />
              </div>
              {userState.userInfo &&
                data.post.userId._id === userState.userInfo._id && (
                  <div className="flex flex-row gap-x-5">
                    <button
                      onClick={() => {
                        return navigate(`/editPost/${data.post.slug}`);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={deleteHandler}>Delete</button>
                  </div>
                )}
            </div>
          </div>

          <div className="mt-10">
            <AddComment
              label="Comment"
              formHandler={(text) => addCommentHandler(text)}
              loading={false}
            />
          </div>

          <div className="mt-10">
            <div className="Font-semi text-xl mb-5">
              Comments ({commentCount}):
            </div>
            <AllComments
              reload={reload}
              uuid={data.post.slug}
              userVotes={votes}
              setUserVotes={(userVotes) => setVotes(userVotes)}
              voteCount={voteCount}
              setVoteCount={(count) => setVoteCount(count)}
              setCommentCount={setCommentCount}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default PostPage;
