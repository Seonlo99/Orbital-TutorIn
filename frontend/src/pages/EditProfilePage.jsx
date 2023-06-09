import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../components/MainLayout";
import { userActions } from "../store/reducers/userReducers";
import { editProfile } from "../services/index/users";
import { ProfilePictureForUpload } from "../components/Profile/ProfilePictureForUpload";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ _id, fullname, email, password }) => {
      return editProfile({
        _id,
        fullname,
        email,
        password,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("Profile is updated");
      // console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      //navigate user to login if not logged
      navigate("/login");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      _id: userState.userInfo._id,
      fullname: userState.userInfo.name,
      email: userState.userInfo.email,
      password: "",
      cfmPassword: "",
    },
    mode: "onChange",
  });
  const submitHandler = (data) => {
    const { _id, fullname, email, password } = data;
    mutate({ _id, fullname, email, password });
  };

  const password = watch("password");

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-bold text-2xl text-center text-black">
            Update Profile
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col w-full">
              <div className="flex flex-col mt-5 gap-x-20 justify-center">
                <ProfilePictureForUpload avatar={userState.userInfo.avatar} />
              </div>
              <label
                htmlFor="fullname"
                className="text-gray-500 font-semibold block mt-5"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullname"
                {...register("fullname", {
                  minLength: {
                    value: 4,
                    message: "Name must be at least 4 characters",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter Name"
                className={`placeholder:text-gray-400 text-black mt-1 rounded-lg font-semibold block px-3 py-2 outline-none border  ${
                  errors.fullname ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullname?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullname?.message}
                </p>
              )}

              <label
                htmlFor="email"
                className="text-gray-500 font-semibold block mt-5"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter valid Email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter Email"
                className={`placeholder:text-gray-400 text-black mt-1 rounded-lg font-semibold block px-3 py-2 outline-none border  ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}

              <label
                htmlFor="password"
                className="text-gray-500 font-semibold block mt-5"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  required: {
                    value: false,
                  },
                })}
                placeholder="Enter New Password to Change"
                className={`placeholder:text-gray-400 text-black mt-1 rounded-lg font-semibold block px-3 py-2 outline-none border  ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}

              <label
                htmlFor="cfmPassword"
                className="text-gray-500 font-semibold block mt-5"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="cfmPassword"
                {...register("cfmPassword", {
                  validate: (value) => {
                    if (value !== password) {
                      return "Passwords do not match";
                    }
                  },
                  required: {
                    value: password,
                    message: "Confirm Password is required",
                  },
                })}
                placeholder="Enter Password again"
                className={`placeholder:text-gray-400 text-black mt-1 rounded-lg font-semibold block px-3 py-2 outline-none border  ${
                  errors.cfmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cfmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cfmPassword?.message}
                </p>
              )}

              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="bg-blue-500 text-white font-bold text-lg w-full rounded-lg py-2 mt-5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
