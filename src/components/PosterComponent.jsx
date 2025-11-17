// components/PosterComponent.jsx
import React, { memo } from "react";

const PosterComponent = () => {
  return (
    <div className="relative flex justify-center items-center bg-white dark:bg-black py-4 transition-colors duration-300">
      
      <div className="
        relative w-full mx-4 
        bg-[#A9C19D]          /* Light mode original */
        dark:bg-black         /* Dark mode override */
        rounded-2xl shadow-md overflow-hidden 
        pt-2 px-8 lg:px-2 flex flex-col h-[400px]
        transition-colors duration-300
      ">
        
        {/* Right Side Image */}
        <div className="absolute bottom-0 right-0 w-1/2 max-w-lg md:w-1/2 lg:w-2/5 xl:w-1/3">
          <img
            src="/Poster.webp"
            alt="Woman shopping with bags and phone"
            className="w-full h-[400px] object-cover 
                       opacity-100 dark:opacity-70 
                       transition-opacity duration-300"
            loading="lazy"
          />
        </div>

        {/* Text Area */}
        <div className="
          relative 
          text-gray-800      /* Light mode */
          dark:text-white     /* Dark mode */
          p-2 h-full m-1 z-1
          transition-colors duration-300
        ">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif mt-12 md:m-10">
            KALA{" "}
            <span className="text-xl md:text-2xl font-sans uppercase tracking-wider">
              IN EVERY
            </span>{" "}
            <span className="text-5xl md:text-5xl font-serif">THREAD</span>
          </h1>

          <h2 className="
            text-5xl md:text-7xl lg:text-9xl font-serif mt-6 
            text-white              /* Light Mode original */
            dark:text-white         /* Dark Mode override */
            lg:ms-36 
            transition-colors duration-300
          ">
            TREND{" "}
            <span className="text-xl md:text-2xl font-sans uppercase tracking-wider">
              IN EVERY
            </span>{" "}
            <span className="text-5xl md:text-5xl font-serif leading-tight mt-6">
              LOOK
            </span>
          </h2>
        </div>

      </div>
    </div>
  );
};

export default memo(PosterComponent);
