// Updated Reels Section with Carousel + Follow Button

import React, { useState, useEffect, useRef, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ReelsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const [showReels, setShowReels] = useState(false);
  const reelsRef = useRef(null);

  const reels = [
    { id: 7, url: "/dress7.mp4", thumbnail: "/dress7.webp", views: "2.4M" },
    { id: 8, url: "/dress8.mp4", thumbnail: "/dress8.webp", views: "760.1k" },
    { id: 9, url: "/dress9.mp4", thumbnail: "/dress9.webp", views: "834.9k" },
    { id: 10, url: "/dress10.mp4", thumbnail: "/dress10.webp", views: "563.2k" },
    { id: 1, url: "/dress1.mp4", thumbnail: "/dress1.webp", views: "1.7M" },
    { id: 3, url: "/dress3.mp4", thumbnail: "/dress3.webp", views: "620.8k" },
    { id: 4, url: "/dress4.mp4", thumbnail: "/dress4.webp", views: "534.4k" },
    { id: 5, url: "/dress5.mp4", thumbnail: "/dress5.webp", views: "1.3M" },
    { id: 2, url: "/dress2.mp4", thumbnail: "/dress2.webp", views: "530.1k" },
    { id: 6, url: "/dress6.mp4", thumbnail: "/dress6.webp", views: "720.5k" },
  ];

  const instagramUrl = "https://www.instagram.com/trendikalaofficial?igsh=MXdidTA0YmY2Ymd3YQ%3D%3D&utm_source=qr";
  const youtubeUrl ="https://www.youtube.com/@trendikala";
  const facebookUrl ="https://www.facebook.com/share/14JLn8svZCB/?mibextid=wwXIfr";


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowReels(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (reelsRef.current) observer.observe(reelsRef.current);

    return () => {
      if (reelsRef.current) observer.unobserve(reelsRef.current);
    };
  }, []);

  const openModal = (reel) => {
    setSelectedReel(reel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReel(null);
    setIsModalOpen(false);
  };

  return (
    <section className="py-10 bg-black/10s text-[#9CAF88] overflow-hidden" ref={reelsRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="md:flex justify-between  items-end mb-10">
          <div >
            <h2 className="text-5xl font-semibold font-heading mb-3">Trending Reels</h2>
            <p className="text-gray-400 text-lg">See latest outfit inspirations</p>
          </div>

          <div className=" md:flex ">

            {/* Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex mt-5 md:mt-0 m-1 items-center justify-center whitespace-nowrap px-4 py-3 uppercase text-sm tracking-widest transition-all duration-300 ease-in-out transform text-white rounded-lg shadow-xl hover:ring-4 hover:ring-[#E1306C] hover:ring-opacity-50"
              style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 0 1 12 16h0a4 4 0 0 1-4-4h0a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="font-bold">Follow Us</span>
            </a>

            {/* YouTube */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex  md:mt-0 m-1 items-center justify-center whitespace-nowrap px-4 py-3 uppercase text-sm tracking-widest transition-all duration-300 ease-in-out transform text-white rounded-lg shadow-xl hover:ring-4 hover:ring-[#FF0000] hover:ring-opacity-50"
              style={{
                background: 'linear-gradient(45deg, #FF0000, #CC0000)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-4 w-4">
                <path d="M23.498 6.186a2.998 2.998 0 0 0-2.113-2.12C19.613 3.5 12 3.5 12 3.5s-7.613 0-9.385.566a2.998 2.998 0 0 0-2.113 2.12A31.114 31.114 0 0 0 0 12a31.114 31.114 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.113 2.12C4.387 20.5 12 20.5 12 20.5s7.613 0 9.385-.566a2.998 2.998 0 0 0 2.113-2.12A31.114 31.114 0 0 0 24 12a31.114 31.114 0 0 0-.502-5.814zM9.75 15.02V8.98l6 3.02-6 3.02z" />
              </svg>
              <span className="font-bold">Subscribe</span>
            </a>

            {/* Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex  md:mt-0 m-1 items-center justify-center whitespace-nowrap px-4 py-3 uppercase text-sm tracking-widest transition-all duration-300 ease-in-out transform text-white rounded-lg shadow-xl hover:ring-4 hover:ring-[#1877F2] hover:ring-opacity-50"
              style={{
                background: 'linear-gradient(45deg, #1877F2, #0d47a1)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-4 w-4">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82V14.708h-3.428v-3.622h3.428V8.413c0-3.403 2.078-5.26 5.115-5.26 1.452 0 2.7.108 3.063.157v3.55h-2.104c-1.648 0-1.966.783-1.966 1.932v2.53h3.932l-.512 3.622h-3.42V24h6.702c.73 0 1.323-.593 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
              <span className="font-bold">Like Us</span>
            </a>

          </div>


        </div>

        {/* Carousel */}
        {showReels ? (
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
            loop
            className="pb-6"
          >
            {reels.map((reel) => (
              <SwiperSlide
                key={reel.id}
                className="!w-[290px] md:!w-[180px] h-[240px] overflow-hidden relative cursor-pointer bg-gray-900"
                onClick={() => openModal(reel)}
              >
                <video
                  src={reel.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />

                {/* Gradient + text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs bg-white/50 w-fit px-2 py-0.5 rounded mb-1 text-gray-700">▶ REEL</span>
                  <p className="text-xs text-gray-300">{reel.views} views</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex gap-4 overflow-hidden pb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-[320px] md:w-[180px] h-[260px] rounded-2xl bg-gray-800 animate-pulse" />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedReel && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-md h-[70vh]  overflow-hidden">
            <video
              src={selectedReel.url}
              className="w-full h-full object-contain bg-black"
              autoPlay
              controls
              loop
            />

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bg-white/40 text-white px-3 py-1 rounded-full backdrop-blur"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(ReelsSection);
