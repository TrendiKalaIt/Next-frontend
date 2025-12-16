'use client';

import { useEffect, useState, useCallback } from 'react';
import { ShoppingBag, X, Tag, Copy, Gift, Clock, Zap } from 'lucide-react';

const PRIMARY_BG = 'bg-gray-950';
const SECONDARY_BG = 'bg-gray-900';
const ACCENT_COLOR_TEXT = 'text-emerald-400';
const CTA_BUTTON_COLOR = 'bg-pink-600';
const GLOW_SHADOW = 'shadow-emerald-500/40';

const calculateNextMondayEnd = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    let daysUntilMonday = 1 - dayOfWeek;
    if (daysUntilMonday < 0) daysUntilMonday += 7;

    const nextMonday = new Date(now.getTime());
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(23, 59, 59, 999);

    if (nextMonday.getTime() < now.getTime()) {
        nextMonday.setDate(nextMonday.getDate() + 7);
    }

    return nextMonday.getTime();
};

const NEXT_MONDAY_END_TIME = calculateNextMondayEnd();

export default function PremiumMegaMondaySaleModal() {
    const COUPON_CODE = '----------';

    const [showModal, setShowModal] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [canShowCoupon, setCanShowCoupon] = useState(false);
    const [copied, setCopied] = useState(false);

    const updateTime = useCallback(() => {
        const now = Date.now();
        const difference = NEXT_MONDAY_END_TIME - now;
        setTimeRemaining(difference > 0 ? difference : 0);
    }, []);

    useEffect(() => {
        // Check if the modal has already been shown in this session
        const hasShownModal = sessionStorage.getItem('premiumMegaMondayModalShown');

        if (!hasShownModal) {
            setShowModal(true); // show modal first time
            sessionStorage.setItem('premiumMegaMondayModalShown', 'true'); // mark as shown
        }

        updateTime();

        const interval = setInterval(updateTime, 1000);

        const timer = setTimeout(() => {
            setCanShowCoupon(true);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [updateTime]);

    const getFormattedTime = () => {
        const totalSeconds = Math.floor(timeRemaining / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const pad = (num) => String(num).padStart(2, '0');

        return { days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds), totalSeconds };
    };

    const formattedTime = getFormattedTime();

    const handleClose = () => {
        setShowModal(false);
        setCanShowCoupon(false);
        setCopied(false);
    };

    const copyCouponCode = () => {
        const tempInput = document.createElement('textarea');
        tempInput.value = COUPON_CODE;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied('Failed');
            setTimeout(() => setCopied(false), 3000);
        }
        document.body.removeChild(tempInput);
    };

    const handleNavigateToCategories = () => {
        handleClose();
        console.log('Navigating to /categories');
        window.location.href = '/categories';
    };

    if (!showModal) return null;

    if (formattedTime.totalSeconds <= 0) {
        return (
            <div className={`fixed inset-0 ${PRIMARY_BG} bg-opacity-95 flex items-center justify-center z-[100] p-4 animate-fadeIn`}>
                <div className={`relative ${SECONDARY_BG} rounded-xl p-8 text-center text-white max-w-sm w-full border-4 border-pink-600 shadow-2xl ${GLOW_SHADOW}`}>
                    <p className='text-3xl font-black text-pink-500'>SALE CONCLUDED</p>
                    <p className='mt-3 text-lg font-semibold text-gray-400'>The exclusive event has ended. Follow us to catch the next savings opportunity!</p>
                    <button
                        onClick={handleClose}
                        className="mt-6 bg-gray-700 text-gray-300 py-2 px-6 rounded-lg hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={`fixed inset-0 ${PRIMARY_BG} bg-opacity-90 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fadeIn`}>
                <div className={`relative ${SECONDARY_BG} rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,1)] max-w-xl md:max-w-2xl w-full max-h-[98vh] transform transition duration-500 animate-slideInDown border-2 border-emerald-500/50 ${GLOW_SHADOW} flex flex-col`}>

                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white text-xl p-2 rounded-full backdrop-blur-sm transition duration-300 border border-white/30 hover:bg-pink-600 hover:scale-110 shadow-lg z-30"
                        aria-label="Close modal"
                    >
                        <X className='w-6 h-6' />
                    </button>

                    <div className="overflow-y-auto custom-scrollbar-hidden flex-grow rounded-2xl">

                        <div className={`${SECONDARY_BG} bg-gradient-to-br from-gray-950 to-gray-800 text-white p-4 pt-6 text-center border-b border-emerald-600/50 rounded-t-2xl`}>
                            <div className="flex flex-col items-center justify-center">
                                <Zap className={`w-8 h-8 ${ACCENT_COLOR_TEXT} mb-1 drop-shadow-[0_0_10px_rgba(52,211,153,0.7)]`} />
                                <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-none text-white relative">
                                    MEGA  <span className={`${ACCENT_COLOR_TEXT} drop-shadow-xl text-shadow-lg`}> MONDAY </span>  SALE
                                </h2>
                                <p className="text-lg sm:text-xl font-light uppercase text-gray-300">
                                    Mega Monday Exclusive
                                </p>
                            </div>
                        </div>

                        <div className="p-6 pt-4 text-center bg-gray-900 border-b border-gray-700">
                            <div className="py-4 px-6 bg-black/50 rounded-xl border border-emerald-400/50 shadow-inner shadow-black/80 mx-auto max-w-xs sm:max-w-md">
                                <p className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-2">TIME UNTIL EXPIRY</p>
                                <div className="flex justify-center space-x-3 sm:space-x-5 text-white font-mono font-extrabold">
                                    {Object.entries(formattedTime).filter(([key]) => key !== 'totalSeconds').map(([key, value]) => (
                                        <div key={key} className="flex flex-col items-center">
                                            <span className="text-4xl sm:text-5xl leading-none text-white bg-gray-800 px-2 rounded-lg shadow-inner border border-gray-700">
                                                {value}
                                            </span>
                                            <span className="text-xs uppercase text-gray-400 mt-1">{key}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Add this notice */}
                                <p className="mt-3 text-sm text-gray-400 font-semibold">
                                    Mega Monday Sale starts from the upcoming Monday!
                                </p>
                            </div>
                        </div>

                        <div className="p-8 text-center bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">

                            <p className={`${ACCENT_COLOR_TEXT} text-xl font-bold mb-6 relative`}>
                                <span className="relative z-10 bg-gray-900 px-4">--- 💎 EXCLUSIVE TIERED SAVINGS 💎 ---</span>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-medium relative z-10">
                                {[
                                    {
                                        title: 'TIER I (MIN SPEND)',
                                        icon: ShoppingBag,
                                        detail: 'Buy 2 under ₹1000: ₹150 OFF ',
                                        color: 'text-amber-300',
                                        border: 'border-amber-500'
                                    },
                                    {
                                        title: 'TIER II (POPULAR)',
                                        icon: Gift,
                                        detail: '₹1001 – ₹1500: 10% OFF + FREE Shipping',
                                        color: 'text-sky-300',
                                        border: 'border-sky-500'
                                    },
                                    {
                                        title: 'TIER III (BEST VALUE)',
                                        icon: Tag,
                                        detail: '₹1501+: 21% OFF + FREE Shipping',
                                        color: 'text-pink-300',
                                        border: 'border-pink-500'
                                    },
                                ].map((tier, index) => (
                                    <div key={index} className={`p-5 rounded-xl shadow-2xl ${SECONDARY_BG} border ${tier.border}/50 transform hover:scale-[1.05] transition duration-300 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-sm`}>
                                        <tier.icon className={`w-8 h-8 mx-auto mb-2 ${tier.color} drop-shadow-md`} />
                                        <p className='text-xs font-semibold uppercase text-gray-400'>{tier.title}</p>
                                        <p className={`text-center text-white mt-1 ${tier.color}`}>{tier.detail}</p>
                                    </div>
                                ))}
                            </div>

                            <p className='text-sm text-gray-500 mt-6 font-semibold relative z-10'>*Offers stack up to a maximum benefit. Full terms apply.</p>
                        </div>

                        <div className="p-8 bg-gray-950/70 border-t border-gray-700">
                            {!canShowCoupon ? (
                                <div className="w-full py-4 text-center text-white font-black text-xl animate-pulse">
                                    <Clock className='w-6 h-6 inline mr-2 align-text-bottom' /> Unlocking Your Premium Access...
                                </div>
                            ) : (
                                <div className='mt-2'>
                                    <p className='text-gray-300 text-lg font-semibold mb-4 text-center'>
                                        The exclusive coupon code will be updated and available on the upcoming Monday!
                                    </p>

                                    <div
                                        onClick={copyCouponCode}
                                        className='border-4 border-dashed border-emerald-400/70 bg-gray-900 p-6 rounded-xl cursor-pointer transition transform hover:scale-[1.01] group relative shadow-inner shadow-black/90 hover:shadow-emerald-500/30'
                                    >
                                        <div className='absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl'></div>
                                        <Gift className={`${ACCENT_COLOR_TEXT} w-10 h-10 mx-auto mb-3 drop-shadow-xl`} />
                                        <p className='text-xl sm:text-5xl font-black tracking-[0.1em] text-emerald-300 select-all text-center drop-shadow-lg leading-tight'>
                                            {COUPON_CODE}
                                        </p>
                                        <div className='flex items-center justify-center mt-4'>
                                            {copied === true && <span className='text-xl font-extrabold text-green-400 transition-opacity duration-300'>CODE COPIED! 🎉</span>}
                                            {copied === false && <span className='flex items-center text-sm text-emerald-400 font-semibold transition group-hover:text-white'><Copy className='w-4 h-4 mr-2' />Click to Copy</span>}
                                            {copied === 'Failed' && <span className='text-red-500 font-bold'>Copy Failed</span>}
                                        </div>
                                        <div className='absolute top-0 right-0 p-3 text-xs bg-red-700/80 text-white font-black rounded-tr-xl rounded-bl-xl animate-pulse-slow shadow-xl'>
                                            <Tag className='w-3 h-3 inline mr-1' /> LIMITED STOCK
                                        </div>
                                    </div>

                                    <p className='text-sm text-gray-600 mt-6 mb-2 text-center'>Start saving before the clock runs out:</p>

                                    <button
                                        onClick={handleNavigateToCategories}
                                        className={`w-full ${CTA_BUTTON_COLOR} text-white hover:bg-pink-700 font-black py-4 rounded-xl shadow-2xl shadow-pink-800/80 uppercase tracking-widest transition duration-300 text-xl flex items-center justify-center transform hover:scale-[1.01] active:scale-[0.99] border-b-4 border-pink-900`}
                                    >
                                        <ShoppingBag className="w-6 h-6 mr-3" /> SHOP THE PREMIUM SALE
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
                @keyframes slideInDown { from { opacity:0; transform: translateY(-100px) scale(0.9); } to { opacity:1; transform: translateY(0) scale(1); } }
                .animate-slideInDown { animation: slideInDown 0.6s cubic-bezier(0.68,-0.55,0.27,1.55) forwards; }
                @keyframes pulse-slow { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
                .animate-pulse-slow { animation: pulse-slow 2.5s cubic-bezier(0.4,0,0.6,1) infinite; }
                .text-shadow-lg { text-shadow: 0 0 10px rgba(52, 211, 153, 0.4), 0 0 20px rgba(52, 211, 153, 0.2); }
                .custom-scrollbar-hidden::-webkit-scrollbar { display: none; }
                .custom-scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
}
