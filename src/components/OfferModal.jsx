'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Gift, Clock, ShoppingBag, PhoneCall, Inbox } from 'lucide-react';

// Theme Colors
const PRIMARY_COLOR = 'bg-gray-700';
const ACCENT_COLOR = 'text-cyan-700';

export default function OfferModal() {
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [canClose, setCanClose] = useState(false);
    const router = useRouter();

    // Show modal on first visit
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const alreadyShown = sessionStorage.getItem('offerShown');

        if (!alreadyShown) {
            const timer = setTimeout(() => {
                setShowModal(true);
                sessionStorage.setItem('offerShown', 'true');
            }, 500);

            return () => clearTimeout(timer);
        }
    }, []);

    // Countdown logic
    useEffect(() => {
        if (!showModal) return;

        setCountdown(5);
        setCanClose(false);

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) {
                    clearInterval(timer);
                    setCanClose(true);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showModal]);

    const handleClose = () => setShowModal(false);

    const handleShopNow = () => {
        handleClose();
        router.push('/categories'); 
    };

    if (!showModal) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full animate-fadeIn overflow-hidden">
                    <div className={`${PRIMARY_COLOR} text-white p-4 pt-3 text-center relative`}>

                        {/* Close button with countdown */}
                        <button
                            onClick={() => canClose && handleClose()}
                            className={`absolute top-3 right-3 text-white opacity-80 hover:opacity-100 transition ${!canClose ? 'cursor-not-allowed' : ''}`}
                            aria-label="Close modal"
                        >
                            {canClose ? '✖' : countdown}
                        </button>

                        <Gift className="md:w-14 md:h-14 w-12 h-12 mx-auto mb-3 text-yellow-300 animate-bounce" strokeWidth={1.5} />

                        <p className="text-sm font-semibold uppercase opacity-90 tracking-widest">EXCLUSIVE OFFER</p>

                        <h2 className="md:text-5xl text-3xl font-extrabold my-2 leading-tight">FREE GIFT BOX</h2>

                        <p className="text-base font-medium mt-1 md:mb-6 mb-3">
                            Complimentary gifts with the first 100 orders!
                        </p>

                        <button
                            onClick={handleShopNow}
                            className={`w-full bg-[#9CAF88] hover:bg-[#95a583] font-bold md:py-3 py-1 rounded-lg shadow-lg uppercase tracking-wider transition duration-300`}
                        >
                            SHOP NOW & GET FREE GIFT
                        </button>
                    </div>

                    <div className="p-6 text-center text-gray-700">
                        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 md:mb-5 border-b pb-2 border-gray-200">
                            <div className="flex items-center justify-center space-x-2">
                                <ShoppingBag className="w-6 h-6 text-[#95a583]" />
                                <span className={`text-sm font-medium ${ACCENT_COLOR}`}>Limited to First 100 Customers</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <Clock className="w-6 h-6 text-[#95a583]" />
                                <span className={`text-sm font-medium ${ACCENT_COLOR}`}>Limited Time Offer</span>
                            </div>
                        </div>

                        <p className="text-sm font-medium mb-3">Have Questions? Contact Us:</p>
                        <div className="flex flex-col space-y-2 text-sm">
                            <a href="tel:+919220440585" className={`${ACCENT_COLOR} font-semibold hover:text-cyan-900 transition flex`}>
                                <span className="mr-2"><PhoneCall className='text-[#95a583]' /></span> Call: +91 9220440585
                            </a>
                            <a href="mailto:trendikalait@gmail.com" className={`${ACCENT_COLOR} font-semibold hover:text-cyan-900 transition flex`}>
                                <span className="mr-2"><Inbox className='text-[#95a583]' /></span> Email: trendikalait@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style global jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
            `}</style>
        </>
    );
}
