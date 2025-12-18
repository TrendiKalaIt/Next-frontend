

"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Flame, Zap } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/categories";

const NewArrivals = () => {
  // FLASH SALE TIMER
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const difference = +targetDate - +now;

    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((unit) => (
    <span
      key={unit}
      className="flex flex-col items-center mx-1 p-2 min-w-[50px] bg-red-800/80"
    >
      <span className="text-2xl font-mono font-bold">
        {String(timeLeft[unit]).padStart(2, "0")}
      </span>
      <span className="text-xs uppercase">{unit[0]}</span>
    </span>
  ));

  // MAIN BANNER
  const bannerImages = [
    {
      desktop: "exclusive-offer-first-100-orders.png",
      mobile: "exclusive-offer-first-100-orders-mobile.png",
      link: "/long-kurti/gulnaaz",
    }
    ,
    {
      desktop: "exclusive-offer-friday-desktop.png",
      mobile: "exclusive-offer-friday-mobile.png",
      link: "/anarkali/afsana",
    },
    {
      desktop: "sewing-machine-used-patterned-material.webp",
      mobile: "sewing-machine-used-patterned-material.webp",
      link: "/dress/aura",
    },
    {
      desktop: "fabrics-rolled-stacked.webp",
      mobile: "fabrics-rolled-stacked.webp",
      link: "/anarkali/afsana",
    },
  ];


  const [currentMainSlide, setCurrentMainSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // CATEGORY AREA
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setCategories(json?.data || []);
      } catch (error) {
        console.error("CATEGORY FETCH ERROR:", error);
      } finally {
        setCategoryLoading(false);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    const interval = setInterval(
      () => setCurrentCategorySlide((prev) => (prev + 1) % categories.length),
      3000
    );
    return () => clearInterval(interval);
  }, [categories]);

  const getImage = (item) => item?.image || item?.icon || "/placeholder.png";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 flex flex-col  font-sans">
      {/* HEADER */}

      <div className="py-6">
        <h2 className="text-5xl font-semibold font-heading mb-2 text-[#9CAF88]"> Featured Collections & Offers</h2>
        <p className="text-gray-400 text-lg">A dynamic space for your latest promotions and exclusive banners.</p>
      </div>

      {/* MAIN GRID */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN BANNER */}
        <div className="lg:col-span-2 h-[400px] md:h-[450px] relative overflow-hidden shadow-xl">
          {bannerImages.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                backgroundImage: `url('${typeof window !== "undefined" && window.innerWidth < 768
                    ? slide.mobile
                    : slide.desktop
                  }')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateX(${(index - currentMainSlide) * 100}%)`,
              }}
            ></div>
          ))}

          <div className="absolute inset-0 bg-black/0 flex flex-col justify-end p-8">
            <Link href={bannerImages[currentMainSlide].link}>
              <button className="mt-4 flex items-center text-white">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {bannerImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentMainSlide(idx)}
                className={`w-3 h-3 border-white border-2 ${currentMainSlide === idx ? "bg-[#9CAF88]" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE BOXES */}
        <div className="flex flex-col space-y-6">
          {/* CATEGORY */}
          <div className="bg-white shadow-lg h-[272px] md:h-[213px] relative overflow-hidden border-l-8 border-[#9CAF88] cursor-pointer">
            <Link href={`/${categories[currentCategorySlide]?.slug}`}>
              {categoryLoading || categories.length === 0 ? (
                <div className="p-6 text-xl text-black">Loading categories...</div>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  {categories.map((cat, index) => (
                    <div
                      key={index}
                      className="absolute inset-0 transition-transform duration-700 ease-in-out"
                      style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url('${getImage(cat)}')`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "#e8ddc9",
                        transform: `translateX(${(index - currentCategorySlide) * 100}%)`,
                      }}
                    >
                      <div className="p-6 h-full flex flex-col justify-between text-white">
                        <h3 className="text-xl font-bold font-heading text-black">Explore Categories</h3>
                        <div className="mt-auto">
                          <p className="text-lg font-bold font-heading ">{cat.name}</p>
                          <p className="text-sm text-gray-200 font-body">Shop the latest in {cat.name}</p>
                          <button className="mt-2 flex items-center font-body text-sm">
                            View Now <ArrowRight className="ml-1 w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Link>

            {!categoryLoading && categories.length > 0 && (
              <div className="absolute bottom-4 right-4 flex  space-x-1">
                {categories.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentCategorySlide(index)}
                    className={`w-2 h-1 cursor-pointer ${currentCategorySlide === index ? "bg-white w-8" : "bg-[#9CAF88]"}`}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* TREND SPOTLIGHT */}
          <div className="bg-white shadow-lg p-6 h-[272px] md:h-[213px] border-l-8 border-[#9CAF88]">
            <Flame className="w-10 h-10 text-[#9CAF88] mb-4" />
            <h3 className="text-2xl font-bold font-body">TREND SPOTLIGHT 2026</h3>
            <p className="mt-2 text-gray-700 font-bold font-home">
              Step Into 2026 with Trendikala — Where Tradition Meets Trendy Style.
            </p>
            <a
              href="/categories"
              className="mt-3 inline-flex items-center text-pink-600 font-semibold font-heading"
            >
              Discover Trend <ArrowRight className="ml-1 w-4 h-4" />
            </a>

          </div>
        </div>
      </div>


      {/* FLASH SALE STRIP */}
      {/* <div className="w-full max-w-7xl mt-8 h-32 bg-red-600 flex items-center justify-between p-8 shadow-xl">
        <div className="flex items-center">
          <Zap className="w-10 h-10 text-yellow-300 mr-6" />
          <div className="text-white">
            <span className="text-sm uppercase text-yellow-300">Limited Time Offer!</span>
            <h3 className="text-3xl font-extrabold">FLASH SALE: FLAT 40% OFF EVERYTHING</h3>
          </div>
        </div>
        <div className="flex items-center text-white">
          {timerComponents}
          <button className="ml-6 py-3 px-6 bg-white text-red-600 font-bold">
            Grab Deal
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default NewArrivals;
