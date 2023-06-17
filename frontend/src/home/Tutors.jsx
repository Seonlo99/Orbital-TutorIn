import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import TutorCard from "../components/TutorCard";
import { getTopTutors } from "../services/index/users";

const Tutors = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topTutors"],
    queryFn: () => getTopTutors(),
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });
  return (
    <>
      {!isLoading && !isError && (
        <section className="flex flex-col container mx-auto px-5">
          <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
            {data.topTutors.length > 0
              ? data.topTutors.map((tutor) => (
                  <TutorCard
                    tutor={tutor}
                    className="w-full md:w-[calc(33.33%-20px)] lg:w-[calc(25%-21px)]"
                  />
                ))
              : "Currently no tutors available, check back later!"}
          </div>
          <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
            <span>More tutors</span>
            <FaArrowRight className="w-3 h-3" />
          </button>
        </section>
      )}
    </>
  );
};

export default Tutors;
