import React, { useState } from "react";
import ReviewCard from "../Review/ReviewCard";

const Review = (recentReviews) => {
  const reviewNum = recentReviews?.reviews.length;
  const displayArray = recentReviews?.reviews;
  const [activeItem, setActiveItem] = useState(0);
  const handlePrev = () => {
    setActiveItem((prevItem) =>
      prevItem === 0 ? reviewNum - 1 : prevItem - 1
    );
  };

  const handleNext = () => {
    setActiveItem((prevItem) =>
      prevItem === reviewNum - 1 ? 0 : prevItem + 1
    );
  };
  return (
    <div
      id="controls-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      <div className="relative px-10 py-5 w-full overflow-hidden rounded-lg overflow-y:auto">
        {reviewNum > 0 ? (
          recentReviews?.reviews.map((review) => (
            <ReviewCard key={review._id}
              review={review}
              activeItem={activeItem}
              displayArray={displayArray}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      {reviewNum > 1 ? (
        <>
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none"
            onClick={handlePrev}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none"
            onClick={handleNext}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-6 h-6  text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Review;
