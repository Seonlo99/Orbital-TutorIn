import React from "react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

import MainLayout from "../components/MainLayout";
import Tutors from "./home/Tutors";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("Highest Rating");
  const clickHandler = (e) => {
    setSelected(e.currentTarget.value);
  };
  return (
    <MainLayout>
      <div className="flex flex-col mb-6 justify-center items-center md:flex-row lg:flew-row">
        <div className="flex flex-col gap-y-2.5 w-1/3 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-500" />
            <input
              className="placeholder:font-bold fond font-semibold placeholder:text-blue-500 rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
              type="text"
              placeholder="Search Tutor"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row border mt-10 lg:mt-6 xl:mt-10 h-14 w-fit ml-6 rounded-full">
          <button
            onClick={(e) => clickHandler(e)}
            value="Highest Rating"
            className={`${
              selected === "Highest Rating"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-300"
            }  px-3 py-2 rounded-l-full `}
          >
            Highest Rating
          </button>
          <button
            onClick={(e) => clickHandler(e)}
            value="Most Service"
            className={`${
              selected === "Most Service"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-300"
            }  px-3 py-2 `}
          >
            Most Service
          </button>
          <button
            onClick={(e) => clickHandler(e)}
            value="Verified"
            className={`${
              selected === "Verified"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-300"
            }  px-3 py-2 rounded-r-full `}
          >
            Verified Tutors
          </button>
        </div>
      </div>
      <Tutors
        selected={selected}
        search={search}
      />
    </MainLayout>
  );
};

export default HomePage;
