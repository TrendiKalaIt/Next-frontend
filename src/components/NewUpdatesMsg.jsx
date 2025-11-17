'use client';

import { Gift } from 'lucide-react';

const NewUpdatesMsg = () => {
  return (
    <div className="bg-gray-100 dark:bg-black flex items-center justify-center font-sans 
      text-gray-800 dark:text-white overflow-hidden">
      
      <div className="w-full">
        {/* Normal mode me blinking, dark me bilkul band */}
        <div 
          className="
            relative p-2 flex items-center 
            text-[#8d9f79] 
            dark:text-white 
            blinking-background 
            dark:!animate-none dark:bg-black
          "
        >
          <div className="updates-marquee-container">
            <div className="updates-marquee-content md:text-base tracking-wide flex items-center gap-8">
              
              {Array(4).fill(0).map((_, i) => (
                <span key={i} className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#fcd34d] dark:text-white" />
                  “Exclusive Offer: Complimentary gifts with the first 100 orders.”
                </span>
              ))}

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* NORMAL MODE blink only */
        @keyframes blink-bg {
          0% { background-color: #f3f4f6; }
          50% { background-color: #fcd34d; }
          100% { background-color: #f3f4f6; }
        }

        .blinking-background {
          animation: blink-bg 1s infinite;
        }

        /* Dark mode: koi blink nahi, simple static black */
        .dark .blinking-background {
          animation: none !important;
          background-color: #000 !important;
        }

        .updates-marquee-container {
          display: flex;
          overflow: hidden;
          position: relative;
        }

        .updates-marquee-content {
          display: flex;
          white-space: nowrap;
          animation: marquee-scroll 20s linear infinite;
          will-change: transform;
        }

        .updates-marquee-container:hover .updates-marquee-content {
          animation-play-state: paused;
          cursor: pointer;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default NewUpdatesMsg;
