import React from "react";
import MainLayout from "../components/MainLayout";
import Hero from "../home/Hero";
import Tutors from "../home/Tutors";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="h-screen w-screen">
        <Hero />
        <div className="flex flex-row justify-center">
          <h1 className="mt-20 font-roboto text-blue-500 text-3xl text-center font-bold">
            View our top rating tutors below
          </h1>
          <MdOutlineKeyboardDoubleArrowDown className="text-blue-500 text-3xl" />
        </div>
      </div>
      <Tutors />
    </MainLayout>
  );
};

export default HomePage;
