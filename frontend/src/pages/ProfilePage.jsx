import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { CommunityStats } from "../components/Profile/CommunityStats";
import { AboutMe } from "../components/Profile/AboutMe";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  useEffect(() => {
    if (!userState.userInfo) {
      //navigate user to login if user has not login
      navigate("/login");
    }
  }, [navigate, userState.userInfo]);

  return (
    <MainLayout>
      <div className="container mx-auto max-w-4xl mt-5 p-3">
        <div className="flex flex-col lg:flex-row gap-x-5">
          <div className="flex flex-col lg:w-[40%] gap-y-5 ">
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <AboutMe />
            </section>
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <CommunityStats />
            </section>

            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <div className="font-bold text-xl">Tutor Only Section</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
            </section>
          </div>

          <div className="flex flex-col lg:w-[60%] mt-5 lg:mt-0 gap-y-5">
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <div className="font-bold text-xl">Most Recent Posts</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
            </section>
            <section className="rounded-md border shadow-md bg-gray-100 px-7 py-5">
              <div className="font-bold text-xl">Reviews</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
