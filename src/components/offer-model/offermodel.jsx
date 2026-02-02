"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  X,
  Star,
  Sparkles,
  Bell,
  Volume2,
  VolumeX,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NewYearOfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const alreadyShown = localStorage.getItem("newYearOfferShown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem("newYearOfferShown", "true");
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  const revealOffer = () => {
    setIsRevealed(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 200);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (audioRef.current) audioRef.current.muted = !isMuted;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <audio
        ref={audioRef}
        src="/Audio/new-year-celebration.mp3"
        preload="auto"
        loop
      />

      <div className="relative w-full max-w-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.45)] flex flex-col md:flex-row min-h-[520px]">

        {/* CLOSE */}
        <button
          onClick={() => {
            audioRef.current?.pause();
            setIsOpen(false);
          }}
          className="absolute bottom-6 right-6 z-50 bg-white/90 rounded-full p-2 hover:text-red-600 transition"
        >
          <X />
        </button>

        {!isRevealed ? (
          /* STEP 1 */
          <div
            onClick={revealOffer}
            className="w-full flex flex-col items-center justify-center p-12 text-white cursor-pointer relative overflow-hidden"
          >
            {/* Logo */}
            <div className="absolute top-5 left-5 bg-white/80 rounded-2xl p-2">
              <img
                src="/trendikala_logo_bg.webp"
                alt="logo"
                className="w-32"
              />
            </div>

            {/* Stars */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute opacity-80"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  <Star size={12} fill="gold" />
                </div>
              ))}
            </div>

            <div className="relative mb-10">
              <div className="absolute inset-0 bg-yellow-400 blur-[80px] opacity-40"></div>
              <PartyPopper
                size={130}
                className="text-yellow-400 relative z-10"
              />
            </div>

            <h2 className="text-4xl font-black italic mb-3">
              Welcome 2026 🎉
            </h2>
            <p className="text-yellow-300 font-bold tracking-widest uppercase">
              Tap to Reveal Surprise
            </p>
          </div>
        ) : (
          <>
            {/* MUTE */}
            <button
              onClick={toggleMute}
              className="absolute top-6 left-6 z-50 bg-white/20 rounded-full p-3"
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>

            {/* LEFT */}
            <div className="relative w-full md:w-6/12 text-white flex items-center justify-center p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-black"></div>

              <div className="relative z-10 text-center space-y-5">
                <p className="uppercase tracking-[0.35em] text-yellow-300 font-black">
                  New Year Sale
                </p>
                <h3 className="text-4xl font-black italic">
                  Cheers to 2026 🥂
                </h3>
                <Bell size={56} className="mx-auto text-yellow-400" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative w-full md:w-7/12 bg-white px-8 pt-12 pb-28 md:px-14">

              <div className="flex items-center gap-3 mb-4 text-purple-700 font-black uppercase tracking-widest">
                <Sparkles className="text-yellow-500" />
                New Beginnings
              </div>

              <h2 className="text-5xl font-black mb-4">
                FLAT <span className="text-purple-700">15% OFF</span>
              </h2>

              <p className="text-gray-600 mb-8 font-medium">
                Start 2026 in style ✨  
                Ethnic wear, Kurtis & festive collections.
              </p>

              {/* COUPON */}
              <div className="p-4 border-2 border-dashed border-purple-300 rounded-3xl flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs uppercase text-purple-400 font-black tracking-widest">
                    Use Code
                  </p>
                  <p className="text-3xl font-black text-purple-700">
                    NEWYTK26
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText("NEWYTK26")
                  }
                  className="bg-black text-white px-6 py-3 rounded-2xl font-black hover:bg-purple-700 transition"
                >
                  COPY
                </button>
              </div>

              {/* FIXED BOTTOM BUTTON */}
              <div className="absolute bottom-6 left-6 right-6">
                <Link href="/categories">
                  <button className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-4 rounded-3xl font-black text-xl flex justify-center items-center gap-2 hover:opacity-90 transition">
                    <ShoppingBag />
                    SHOP NEW YEAR SALE
                  </button>
                </Link>

                <p className="text-center text-xs mt-3 text-gray-400 font-bold tracking-widest uppercase">
                  Limited Time Offer
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewYearOfferPopup;
