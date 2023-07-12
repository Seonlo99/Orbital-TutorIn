import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

import { logout } from "../store/actions/user";
import defaultPic from "../assets/images/default.png";
import stables from "../constants/stables";

import { googleLogout } from "@react-oauth/google";

const Header = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    dispatch(logout());
    if (userState.userInfo.isGoogleSignUp) {
      googleLogout();
    }
  };

  const profilePic =
    userState.userInfo && userState.userInfo.avatar !== ""
      ? stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar
      : defaultPic;

  // const profileHandler = ()=>{
  //     console.log("view profile");
  // }

  const [navVisible, setNavVisible] = useState(false);

  const navVisibleHandler = () => {
    setNavVisible((curState) => {
      return !curState;
    });
  };
  const handleNav = (target) => {
    navVisibleHandler();
    navigate(`${target}`);
  };

  return (
    <section>
      <header className="container mx-auto w-full max-w-screen-2xl px-5 flex justify-between py-4 items-center">
        <div>
          <span className="text-blue-800">TutorIn</span>
        </div>
        <div className="z-50 lg:hidden">
          {navVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibleHandler}
            />
          ) : (
            <AiOutlineMenu
              className="w-6 h-6"
              onClick={navVisibleHandler}
            />
          )}
        </div>
        <div
          className={`${
            navVisible ? "right-0" : "-right-full"
          } z-[49] bg-gray-700 lg:bg-transparent mt-[52px] lg:mt-0 flex flex-col lg:flex-row w-full lg:w-auto justify-center lg:justify-end fixed lg:static top-0 bottom-0 gap-x-9 items-center`}
        >
          <ul className="flex flex-col items-center gap-y-5 lg:flex-row text-white lg:text-black gap-x-5 font-semibold ">
            <li className="hover:underline">
              <button onClick={() => handleNav("/")}>Home</button>
            </li>
            <li className="hover:underline">
              <button onClick={() => handleNav("/discuss")}>Forum</button>
            </li>
            {userState.userInfo && (
              <li className="hover:underline">
                <button onClick={() => handleNav("/services")}>Services</button>
              </li>
            )}
            {userState.userInfo && (
              <li className="hover:underline">
                <button onClick={() => handleNav("/chat")}>Chat</button>
              </li>
            )}

            {userState.userInfo ? (
              <li className="relative group flex flex-row items-center hover:cursor-pointer">
                {/* <div>test</div> */}
                <div className="hidden lg:block mr-2 text-xl font-bold">
                  {userState.userInfo.username}
                </div>
                <img
                  id="avatarButton"
                  type="button"
                  className="hidden lg:block w-10 h-10 rounded-full cursor-pointer border"
                  src={profilePic}
                  alt="User dropdown"
                ></img>
                <div className="hidden lg:block">
                  {" "}
                  <MdKeyboardArrowDown />{" "}
                </div>
                <div className=" hidden transition-all duration-500 absolute bottom-0 right-0 transform translate-y-full lg:group-hover:block w-max bg-white">
                  <ul className="flex flex-col shadow-lg rounded-lg divide-y overflow-hidden">
                    <button
                      onClick={() => {
                        navigate(`/profile/${userState.userInfo._id}`);
                      }}
                      className="hover:bg-blue-900 hover:text-white px-3 py-3"
                    >
                      View Profile
                    </button>
                    {userState.userInfo.isAdmin && (
                      <button
                        onClick={() => {
                          navigate(`/admin`);
                        }}
                        className="hover:bg-blue-900 hover:text-white px-3 py-3"
                      >
                        Admin Page
                      </button>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="hover:bg-blue-900 hover:text-white px-3 py-3"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
                <div className="lg:hidden flex flex-col gap-y-3 justify-center items-center">
                  <button
                    onClick={() => {
                      navVisibleHandler();
                      navigate(`/profile/${userState.userInfo._id}`);
                    }}
                  >
                    View Profile
                  </button>
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              </li>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Header;
