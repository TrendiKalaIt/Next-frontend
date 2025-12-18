"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const OfferPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-16 md:inset-0 z-50 pointer-events-none">
      <div className="offer-smooth pointer-events-auto">
        <Link
          href="/anarkali/afsana"
          className="relative cursor-pointer block group"
          onClick={() => setShow(false)}
        >
          {/* Rotating Circle */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 border border-black border-dashed rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-600 shadow-2xl">
            <svg className="w-full h-full p-1" viewBox="0 0 100 100">
              <path
                id="curve"
                d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0"
                fill="transparent"
              />
              <text>
                <textPath
                  href="#curve"
                  className="text-[8px] uppercase tracking-[0.2em] fill-white"
                >
                  20% OFF Afsana • Use Coupon - AFSANA20 •
                </textPath>
              </text>
            </svg>
          </div>

          {/* Center Gift Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl sm:text-2xl md:text-3xl">🎁</span>
          </div>

          {/* 🔥 TOOLTIP (AS-IS, NO DESIGN CHANGE) */}
          <div className="absolute bottom-[110%] left-1/2 pr-10 -translate-x-1/2 w-64 p-4 bg-white/95 backdrop-blur-md border border-amber-200 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-[60]">
            <div className="relative">
              <h4 className="text-amber-900 font-bold text-[11px] mb-2 uppercase tracking-[0.1em] border-b border-amber-100 pb-1">
                Offer Guidelines
              </h4>
              <p className="text-gray-600 text-[11px] leading-relaxed font-medium">
                To apply this coupon, please ensure your{" "}
                <span className="text-amber-800 font-bold">cart is empty</span>.
                This exclusive discount is valid for this{" "}
                <span className="text-amber-800 font-bold">
                  single product
                </span>{" "}
                purchase only.
              </p>

              {/* Tooltip Arrow */}
              <div className="absolute -bottom-[24px] left-1/2 -translate-x-1/2 border-[10px] border-transparent border-t-white/95"></div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OfferPopup;
