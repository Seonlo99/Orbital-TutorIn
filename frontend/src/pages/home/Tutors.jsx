import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import TutorCard from "../../components/TutorCard";
import { getTopTutors } from "../../services/index/users";

const Tutors = (selected, search) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topTutors", selected, search],
    queryFn: () => getTopTutors(selected, search),
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });

  return (
    <>
      {!isLoading && !isError && (
        <section className="flex flex-col container mx-auto px-5 mt-10">
          <div className="flex flex-wrap sm:gap-x-5 gap-y-5 pb-10">
            {data.topTutors.length > 0
              ? data.topTutors.map((tutor) => (
                  <TutorCard
                    key={tutor._id}
                    tutor={tutor}
                    className="w-full sm:w-[calc(33.33%-16px)] md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)]"
                  />
                ))
              : "Currently no tutors available, check back later!"}
          </div>
        </section>
      )}
    </>
  );
};

export default Tutors;
