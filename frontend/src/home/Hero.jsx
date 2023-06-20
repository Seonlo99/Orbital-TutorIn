import React from "react";

import images from "../assets/images/picture1.jpg";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-blue-500 text-3xl text-center font-bold md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          TutorIn
        </h1>
        <h2 className="mt-2 selection:font-roboto text-blue-500 text-2xl text-center font-bold md:text-3xl lg:text-2xl xl:text-3xl lg:text-left lg:max-w-[540px]">
          Get your answer here!
        </h2>
        <p className="mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          placerat, urna a posuere lacinia, ante risus blandit ipsum, in
          venenatis est elit cursus orci. Ut in ex eros. Curabitur a laoreet
          lacus. Sed a aliquam felis. Mauris id mi ac felis placerat posuere.
          Suspendisse vitae fringilla tellus. Aenean maximus nisl nec metus
          volutpat laoreet. Proin sed mauris molestie, elementum mi eu, commodo
          lectus.
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative flex justify-around">
            <button className="border rounded-lg w-48 h-14 bg-blue-500 text-white px-2 py-2">
              Register Now
            </button>
            <button className="border rounded-lg w-48 h-14 bg-blue-500 text-white px-2 py-2">
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="hidden mt-5 lg:block lg:1/2">
        <img
          className="w-full"
          src={images}
          alt="Hero image"
        />
      </div>
    </section>
  );
};

export default Hero;
