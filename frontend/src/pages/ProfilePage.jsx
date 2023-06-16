import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";


import MainLayout from "../components/MainLayout";
import { CommunityStats } from "../components/Profile/CommunityStats";
import { AboutMe } from "../components/Profile/AboutMe";
import { RecentCreatedPosts } from "../components/Profile/RecentCreatedPosts";
import { RecentCommentedPosts } from "../components/Profile/RecentCommentedPosts";
import Review from "../components/Profile/Review";
import { getUserProfile } from "../services/index/users";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const {id} = useParams()
  
  // useEffect(() => {
  //   if (!userState.userInfo) {
  //     //navigate user to login if user has not login
  //     navigate("/login");
  //   }
  // }, [navigate, userState.userInfo]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserProfile({ _id: id }),
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });
  console.log(data)
  

  return (
    <MainLayout>
      {!isLoading && !isError &&
      <div className="container mx-auto max-w-4xl mt-5 p-3">
        <div className="flex flex-col lg:flex-row gap-x-5">
          <div className="flex flex-col lg:w-[40%] gap-y-5 ">
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <AboutMe viewedUser={data.user}/>
            </section>
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <CommunityStats postCount={data.postCount} commentCount={data.commentCount} VoteCount={data.VoteCount}/>
            </section>
            {data.user.tutor ? (
              <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
                <div className="font-bold text-xl">Tutor Only Section</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
              </section>
            ) : (
              <></>
            )}
          </div>

          <div className="flex flex-col lg:w-[60%] mt-5 lg:mt-0 gap-y-5">
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <RecentCreatedPosts recentPosts={data.recentPosts}/>
            </section>
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <RecentCommentedPosts recentCommentedPostsData={data.recentPostsAndComments}/>
            </section>
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <div className="font-bold text-xl">Reviews</div>
              <Review />
            </section>
          </div>
        </div>
      </div>
    }
    </MainLayout>
  );
};

export default ProfilePage;
