// "use client"
// import React, { useState, useEffect, useRef } from 'react';
// import { ShoppingBag, X, Star, Gift, Sparkles, Bell, Volume2, VolumeX } from 'lucide-react';
// import Link from "next/link";
// const App = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isRevealed, setIsRevealed] = useState(false);
//     const [isMuted, setIsMuted] = useState(false);
//     const audioRef = useRef(null);

//     // Auto-show popup after 1.5 seconds
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsOpen(true);
//         }, 1500);
//         return () => clearTimeout(timer);
//     }, []);

//     // Gift open karne par sound play hoga
//     const revealOffer = () => {
//         setIsRevealed(true);
//         setTimeout(() => {
//             if (audioRef.current) {
//                 audioRef.current.play().catch(err => {
//                     console.error("Playback failed. Please ensure the file exists at /Audio/jingle-bells-sound.mp3", err);
//                 });
//             }
//         }, 100);
//     };

//     const toggleMute = (e) => {
//         e.stopPropagation();
//         setIsMuted(!isMuted);
//         if (audioRef.current) {
//             audioRef.current.muted = !isMuted;
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">

//             <audio
//                 ref={audioRef}
//                 src="/Audio/jingle-bells-sound.mp3"
//                 preload="auto"
//                 loop
//             />

//             {/* Main Container */}
//             <div className="relative w-full max-w-3xl bg-red-900 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.3)] flex flex-col md:flex-row min-h-[500px]">

//                 {/* Close Button */}
//                 <button
//                     onClick={() => setIsOpen(false)}
//                     className="absolute top-6 right-6 z-50 p-2 text-gray-400 hover:text-red-600 transition-colors bg-white/90 rounded-full shadow-lg"
//                 >
//                     <X size={24} />
//                 </button>

//                 {!isRevealed ? (
//                     /* STEP 1: MAGIC GIFT BOX */
//                     <div
//                         onClick={revealOffer}
//                         className="w-full  flex flex-col items-center justify-center p-12 bg-gradient-to-b from-red-600 to-red-900 text-white cursor-pointer group relative overflow-hidden"
//                     >
//                         <div className="absolute top-4 left-4 z-40 p-1 rounded-3xl bg-white/60 backdrop-blur-sm">
//                             <img
//                                 src="/trendikala_logo_bg.webp"
//                                 alt="Logo"
//                                 className="w-[150px] md:w-32 h-auto"
//                             />
//                         </div>

//                         {/* Background Jagmag Stars for Gift Screen */}
//                         <div className="absolute inset-0 opacity-80">
//                             {[...Array(30)].map((_, i) => (
//                                 <div key={i} className="absolute animate-pulse" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}>
//                                     <Star size={Math.random() * 15} fill="white" />
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="relative mb-8 transform group-hover:scale-110 transition-transform duration-500">
//                             <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-40 group-hover:opacity-70 animate-pulse"></div>
//                             <Gift size={140} className="relative z-10 text-yellow-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-bounce" />
//                         </div>
//                         <h2 className="text-2xl md:text-4xl font-black font-heading italic mb-4 text-center text-white drop-shadow-md">Open Your Christmas Gift!</h2>
//                         <p className="text-2xl font-body text-yellow-200 animate-pulse text-center font-bold tracking-widest uppercase">
//                             Click to Reveal Magic ✨
//                         </p>
//                     </div>
//                 ) : (
//                     /* STEP 2: ACTUAL OFFER POPUP */
//                     <>
//                         <button
//                             onClick={toggleMute}
//                             className="absolute top-6 left-6 z-50 p-3 text-white bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-all border border-white/30"
//                         >
//                             {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} className="animate-pulse" />}
//                         </button>

//                         {/* Left Design Side */}
//                         <div className="relative w-full md:w-6/12 bg-red-700 overflow-hidden min-h-[250px]">
//                             <div className="absolute top-4 left-4 z-40 p-1 rounded-3xl bg-white/60 backdrop-blur-sm">
//                                 <img
//                                     src="/trendikala_logo_bg.webp"
//                                     alt="Logo"
//                                     className="w-[150px] md:w-32 h-auto"
//                                 />
//                             </div>

//                             <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-700 to-red-950 opacity-100"></div>

//                             {/* Ghane Jagmag Stars */}
//                             <div className="absolute inset-0 pointer-events-none">
//                                 {[...Array(40)].map((_, i) => (
//                                     <div
//                                         key={i}
//                                         className="absolute animate-twinkle"
//                                         style={{
//                                             top: `${Math.random() * 100}%`,
//                                             left: `${Math.random() * 100}%`,
//                                             animationDelay: `${Math.random() * 1}s`,
//                                             transform: `scale(${Math.random() * 1.8})`
//                                         }}
//                                     >
//                                         <Star size={Math.random() * 20 + 4} className="text-yellow-400  drop-shadow-[0_0_8px_rgba(253,224,71,1.8)]" />
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Santa Conical Hat Visual */}
//                             <div className="relative mt-10 md:mt-0 h-full flex flex-col items-center justify-center text-white p-8 text-center animate-in zoom-in duration-1000">
//                                 <div className=" mb-3 md:mb-8 relative scale-125">
//                                     {/* The Conical Bent Hat */}
//                                     <div className="relative">
//                                         {/* Hat Main Body - Conical & Bent */}
//                                         <div className="bg-red-500 w-20 h-20 md:w-24 md:h-28 clip-santa-hat shadow-2xl relative overflow-visible">
//                                             {/* White Fur Band */}
//                                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-8 md:w-28 md:h-8 bg-white rounded-full shadow-lg z-20"></div>
//                                         </div>
//                                         {/* The Pom Pom (Bent part ball) */}
//                                         <div className="absolute -top-4 right-0 w-8 h-8 bg-white rounded-full shadow-xl animate-bounce z-10"></div>
//                                     </div>
//                                 </div>

//                                 <h3 className="text-2xl font-heading md:text-4xl font-black italic drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] tracking-tight">Ho Ho Ho!</h3>
//                                 <div className=" mt-2 md:mt-8 space-y-3 border-t-2 border-white/20  pt-2 md:pt-8 w-full">
//                                     <p className="text-sm font-body uppercase tracking-[0.5em] font-black text-yellow-300">Mega Holiday</p>
//                                     <p className="text-2xl font-heading md:text-4xl font-black tracking-tighter leading-none uppercase">Ladies Special</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Content Side */}
//                         <div className="w-full md:w-7/12 p-5 md:p-14 flex flex-col justify-center bg-white">
//                             <div className="flex items-center gap-3 mb-2 md:mb-6 text-red-600 font-black text-sm uppercase tracking-[0.2em]">
//                                 <Sparkles size={20} className="text-yellow-500 font-body fill-yellow-500 animate-spin-slow" />
//                                 <span>The Christmas Miracle</span>
//                             </div>

//                             <h2 className=" text-3xl lg:text-5xl font-black text-gray-900 mb-2 md:mb-4 tracking-tighter leading-none">
//                                 FLAT <span className="text-red-600 drop-shadow-sm">20% OFF</span>
//                             </h2>

//                             <p className="text-gray-600 font-body mb-3 md:mb-6  font-medium leading-relaxed">
//                                 The biggest sale of the year on Kurtis, Anarkalis, and Ethnic Dresses.
//                                 <span className="text-red-600 font-bold ">Santa’s special pick for you!</span>
//                             </p>

//                             <div className="space-y-4">
//                                 <div className="p-4 bg-red-50 border-2 border-dotted border-red-200 rounded-[2rem] flex justify-between items-center group transition-all hover:border-red-400">
//                                     <div>
//                                         <p className="text-xs font-body text-red-400 font-black uppercase tracking-widest mb-1">CLAIM WITH CODE</p>
//                                         <p className="text-3xl font-mono font-black text-red-700 tracking-tighter">SANTATK20</p>
//                                     </div>
//                                     <button
//                                         onClick={() => {
//                                             const el = document.createElement('textarea'); el.value = "SANTA50";
//                                             document.body.appendChild(el); el.select();
//                                             document.execCommand('copy'); document.body.removeChild(el);
//                                         }}
//                                         className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-95 uppercase tracking-widest"
//                                     >
//                                         COPY
//                                     </button>
//                                 </div>

//                                 <Link href="/categories">
//                                     <button className="w-full font-heading mt-2 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-3xl font-black text-xl flex items-center justify-center gap-2 hover:shadow-[0_15px_30px_rgba(220,38,38,0.4)] transition-all transform hover:-translate-y-1 group">
//                                         <ShoppingBag size={28} className="group-hover:rotate-12 transition-transform" />
//                                         SHOP COLLECTION
//                                     </button>
//                                 </Link>

//                                 <p className="text-center font-body text-gray-400 text-xs font-bold uppercase tracking-widest">
//                                     Free Delivery
//                                     {/* on Orders Above ₹999 */}
//                                 </p>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>

//             <style dangerouslySetInnerHTML={{
//                 __html: `
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(0.8); }
//           50% { opacity: 1; transform: scale(1.2); filter: brightness(1.5); }
//         }
//         .animate-twinkle { animation: twinkle 3s infinite ease-in-out; }
        
//         .animate-spin-slow { animation: spin 8s linear infinite; }
//         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

//         .clip-santa-hat {
//           clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
//           border-radius: 50% 50% 0 0;
//           transform: rotate(15deg);
//         }

//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-bounce { animation: bounce 1.5s infinite ease-in-out; }
//       `}} />
//         </div>
//     );
// };

// export default App;





"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, Star, Gift, Sparkles, Bell, Volume2, VolumeX, PartyPopper } from 'lucide-react';
import Link from "next/link";

const NewYearOfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const revealOffer = () => {
    setIsRevealed(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 100);
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

      <div className="relative w-full max-w-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-[3rem] overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.4)] flex flex-col md:flex-row min-h-[500px]">

        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 z-50 bg-white/90 rounded-full p-2 hover:text-red-600"
        >
          <X />
        </button>

        {!isRevealed ? (
          /* STEP 1 */
          <div
            onClick={revealOffer}
            className="w-full flex flex-col items-center justify-center p-12 text-white cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 bg-white/70 rounded-3xl p-1">
              <img src="/trendikala_logo_bg.webp" className="w-36" />
            </div>

            {/* Sparkles */}
            <div className="absolute inset-0">
              {[...Array(35)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`
                  }}
                >
                  <Star size={Math.random() * 16} fill="gold" />
                </div>
              ))}
            </div>

            <div className="relative mb-8 group-hover:scale-110 transition">
              <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-50 animate-pulse"></div>
              <PartyPopper size={140} className="text-yellow-400 animate-bounce relative z-10" />
            </div>

            <h2 className="text-4xl font-black italic mb-3">Welcome 2026 🎉</h2>
            <p className="text-yellow-300 font-bold tracking-widest uppercase animate-pulse">
              Tap to Reveal Surprise
            </p>
          </div>
        ) : (
          <>
            {/* Mute */}
            <button
              onClick={toggleMute}
              className="absolute top-6 left-6 z-50 bg-white/20 rounded-full p-3"
            >
              {isMuted ? <VolumeX /> : <Volume2 className="animate-pulse" />}
            </button>

            {/* LEFT */}
            <div className="w-full md:w-6/12 relative text-white flex items-center justify-center p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-black"></div>

              <div className="relative z-10 text-center space-y-4">
                <p className="uppercase tracking-[0.4em] text-yellow-300 font-black">
                  New Year Sale
                </p>
                <h3 className="text-4xl font-black italic">Cheers to 2026 🥂</h3>
                <Bell size={60} className="mx-auto text-yellow-400 animate-bounce" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-7/12 bg-white p-8 md:p-14 flex flex-col justify-center">

              <div className="flex items-center gap-3 mb-4 text-purple-700 font-black uppercase tracking-widest">
                <Sparkles className="text-yellow-500 animate-spin-slow" />
                New Beginnings
              </div>

              <h2 className="text-5xl font-black mb-4">
                FLAT <span className="text-purple-700">15% OFF</span>
              </h2>

              <p className="text-gray-600 mb-6 font-medium">
                Start 2026 in style ✨  
                Ethnic wear, Kurtis & festive collections.
              </p>

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
                  onClick={() => {
                    navigator.clipboard.writeText("NEWYTK26");
                  }}
                  className="bg-black text-white px-6 py-3 rounded-2xl font-black hover:bg-purple-700"
                >
                  COPY
                </button>
              </div>

              <Link href="/categories">
                <button className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-4 rounded-3xl font-black text-xl flex justify-center items-center gap-2 hover:-translate-y-1 transition">
                  <ShoppingBag />
                  SHOP NEW YEAR SALE
                </button>
              </Link>

              <p className="text-center text-xs mt-4 text-gray-400 font-bold tracking-widest uppercase">
                Limited Time Offer
              </p>
            </div>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `
      }} />
    </div>
  );
};

export default NewYearOfferPopup;
2