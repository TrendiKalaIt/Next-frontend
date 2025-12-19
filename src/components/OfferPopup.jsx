"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const OfferPopup = () => {
  const [show, setShow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const popupRef = useRef(null);
  const touchMoved = useRef(false);

  //  Popup delay
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  //  Detect mobile + default tooltip open
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setShowTooltip(true);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  //  Outside tap OR scroll → close tooltip (mobile)
  useEffect(() => {
    if (!isMobile || !showTooltip) return;

    const handleOutsideTouch = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowTooltip(false);
      }
    };

    const handleTouchMove = () => {
      //  Scroll detected
      setShowTooltip(false);
    };

    document.addEventListener("touchstart", handleOutsideTouch);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleOutsideTouch);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMobile, showTooltip]);

  if (!show) return null;

  return (
    <div className="fixed inset-16 md:inset-0 z-50 pointer-events-none">
      <div ref={popupRef} className="offer-smooth pointer-events-auto">
        <Link
          href="/anarkali/afsana"
          className="relative cursor-pointer block group"
          onTouchStart={() => (touchMoved.current = false)}
          onTouchMove={() => (touchMoved.current = true)}
          onClick={(e) => {
            if (!isMobile) {
              setShow(false);
              return;
            }

            //  Mobile logic
            if (touchMoved.current) return;

            // Tooltip visible → first tap
            if (showTooltip) {
              e.preventDefault();
              setShowTooltip(false);
              return;
            }

            // Second tap → navigate
            setShow(false);
          }}
        >
          {/*  Rotating Circle */}
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

          {/*  Center Gift Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl sm:text-2xl md:text-3xl">🎁</span>
          </div>

          {/*  TOOLTIP */}
          <div
            className={`absolute bottom-[115%] right-0 w-72 p-5 bg-white/95 backdrop-blur-xl border border-amber-200/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 translate-y-4 pointer-events-none z-[60]
            ${
              showTooltip
                ? "opacity-100 translate-y-0"
                : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
            }`}
          >
            <div className="relative">
              <h4 className="text-amber-900 font-bold text-[12px] mb-2 uppercase tracking-[0.15em] border-b border-amber-100 pb-1.5">
                Offer Guidelines
              </h4>

              <p className="text-gray-600 text-[11.5px] leading-relaxed font-medium">
                To apply this coupon, ensure your{" "}
                <span className="text-amber-800 font-bold underline">
                  cart is empty
                </span>
                . This discount is valid for{" "}
                <span className="text-amber-800 font-bold">
                  AFSANA / <span className="text-gray-600">Anarkali</span>
                </span>{" "}
                only.
              </p>

              {/*  Mobile helper text */}
              {isMobile && (
                <p className="mt-2 text-[11px] text-amber-700 font-semibold">
                  Tap the popup again to view the product
                </p>
              )}

              <div className="absolute -bottom-[29px] right-12 border-[12px] border-transparent border-t-white/98 drop-shadow-sm" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OfferPopup;
