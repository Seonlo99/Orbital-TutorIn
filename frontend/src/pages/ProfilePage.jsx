import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "react-rating";

import MainLayout from "../components/MainLayout";
import { CommunityStats } from "../components/Profile/CommunityStats";
import { AboutMe } from "../components/Profile/AboutMe";
import { RecentCreatedPosts } from "../components/Profile/RecentCreatedPosts";
import { RecentCommentedPosts } from "../components/Profile/RecentCommentedPosts";
import Review from "../components/Profile/Review";
import { getUserProfile } from "../services/index/users";
import { Service } from "../components/Profile/Service";
import { AboutTutor } from "../components/Profile/Tutor/AboutTutor";

const ProfilePage = () => {
  const userState = useSelector((state) => state.user);
  const { id } = useParams();

  // useEffect(() => {
  //   if (!userState.userInfo) {
  //     //navigate user to login if user has not login
  //     navigate("/login");
  //   }
  // }, [navigate, userState.userInfo]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userInfo", id],
    queryFn: () => getUserProfile({ _id: id }),
    onSuccess: (data) => {
      // console.log(data)
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });
  console.log(data);

  return (
    <MainLayout>
      {!isLoading && !isError && (
        <div className="container mx-auto max-w-4xl mt-5 p-3">
          <div className="flex flex-col lg:flex-row gap-x-5">
            <div className="flex flex-col lg:w-[40%] gap-y-5 ">
              <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
                <AboutMe viewedUser={data.user} />
              </section>
              <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
                <CommunityStats
                  postCount={data.postCount}
                  commentCount={data.commentCount}
                  VoteCount={data.VoteCount}
                />
              </section>
              {data.user?.tutor ? (
                <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
                  <AboutTutor
                    profileId={data.user._id}
                    userId={userState?.userInfo ? userState.userInfo._id : null}
                    modulesOffer={data.modulesOffer}
                  />
                </section>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col lg:w-[60%] mt-5 lg:mt-0 gap-y-5">
              {/* <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5"> */}
              {userState.userInfo &&
                data.user._id !== userState.userInfo._id && (
                  <section className="px-7">
                    <Service
                      viewedUser={data.user}
                      userId={userState.userInfo._id}
                      token={userState.userInfo.token}
                    />
                  </section>
                )}
              <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
                <RecentCreatedPosts recentPosts={data.recentPosts} />
              </section>
              <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
                <RecentCommentedPosts
                  recentCommentedPostsData={data.recentComments}
                />
              </section>
              <section className="flex flex-col rounded-md border shadow-md bg-gray-100 px-7 py-5">
                <div className="flex flex-row ">
                  <div className="font-bold text-xl">Reviews</div>
                  <div className="ml-5 mt-1 flex flex-row items-center">
                    <div className="">
                      <Rating
                        readonly
                        initialRating={data.user.rating}
                        emptySymbol={<BsStar />}
                        fullSymbol={<BsStarFill />}
                        className="text-blue-500"
                      />
                    </div>
                    <div className="ml-2 text-blue-500 font-bold">
                      {`${Math.round(data.user.rating * 100) / 100} (${
                        data.user.ratingCount
                      })`}
                    </div>
                  </div>
                </div>
                {data.recentReviews.length > 0 ? (
                  <Review reviews={data.recentReviews} />
                ) : (
                  "No review to display"
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProfilePage;
