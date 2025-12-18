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
          className="relative cursor-pointer block"
          onClick={() => setShow(false)}
        >
          {/* Rotating Circle */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 border border-black border-dashed rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-600 shadow-2xl">
            <svg
              className="w-full h-full p-1"
              viewBox="0 0 100 100"
            >
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
        </Link>
      </div>
    </div>
  );
};

export default OfferPopup;
